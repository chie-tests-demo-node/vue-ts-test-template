<template>
  <!-- :style="{ height: pageHeight + 'px' }" -->
  <div class="page" style="height: 100%">
    <div id="search">
      <van-search v-model="queryKey" show-action shape="round" placeholder="请输入城市名或者拼音" @focus="searchFocus"
        @blur="searchBlur">
        <template slot="action">
          <span @click="cancelSearch()">取消</span>
        </template>
      </van-search>
    </div>

    <div class="position" v-if="!isSearch">
      <div class="title">当前定位</div>
      <div class="result">
        <span class="left" @click="selectCity(cityData, 'position')">
          <van-icon name="location" />
          <span class="cityName">
            <span v-if="cityLoading" style="color: #666; font-size: 13px">定位中...</span>
            <span v-else>{{ city || "定位失败" }}</span>
          </span>
        </span>

        <span class="right" @click="getLoction()">重新定位</span>
      </div>
    </div>

    <div class="bar" style="height: 5px; background: gainsboro" v-if="!isSearch"></div>

    <div class="index-list" v-if="!isSearch" :class="faRit == '1' ? 'topShow' : ''">
      <van-index-bar :index-list="indexListName">
        <div v-for="(value, key, index) in indexList" :key="index">
          <van-index-anchor :index="key == '#' ? '热门城市' : key" />
          <van-cell v-for="(el, i) in value" :key="i" :title="el.name" @click="selectCity(el, 'index')" />
        </div>
      </van-index-bar>
    </div>

    <div class="search-list" v-if="isSearch">
      <div class="searchRes-list-box" v-if="searchResList.length">
        <div class="item" v-for="(item, index) in searchResList" :key="index" @click="selectCity(item, 'index')">
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
      <van-empty v-if="!searchResList.length && noSearchData" image="search" description="暂无搜索结果" />
    </div>
  </div>
</template>
 
<script>
import { loadJs } from "@/utils/mapfn.ts";
import storejs from "store";
import $ from "jquery";
export default {
  data() {
    return {
      pageHeight: window.innerHeight,
      indexListOr: {}, //原始数据
      indexListName: [],
      indexList: {},
      city: "",
      cityData: {},
      cityLoading: true,
      isSearch: false,
      searchResList: [], //搜索结果
      queryKey: "",
      timer: "",

      map: "",
      loaction: [], //lng,lat

      nearPostion: [],
      selectPosition: {},
      selectPostionLoading: false,
      searchHistory: [], //搜索历史记录
      noSearchData: false,
      AMap: ""
    };
  },
  props: ['faRit'],
  watch: {
    queryKey: function (val) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (val) {
          this.isSearch = true;
          let queryKey = val.toUpperCase();
          this.searchResList = [];
          this.indexListOr.forEach((el) => {
            if (
              el.name.indexOf(queryKey) != -1 ||
              el.spell.toUpperCase().indexOf(queryKey) != -1
            ) {
              this.searchResList.push(el);
            }
          });
        } else {
          this.isSearch = false;
          this.searchResList = [];
        }
      }, 300);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.getCityList();
      await this.getLoction();
    },
    searchFocus() {
      this.$emit('showRit', '1')
      //   this.isSearch = true;
    },
    searchBlur() {
      this.$emit('showRit', '2')
    },
    //获取定位
    getLoction() {
      loadJs(
        "https://webapi.amap.com/maps?v=2.0&key=d12ec89124d64572372e34434e3dba23b3&plugin=AMap.CitySearch",
        //用你们自己申请的key，这个key我里面加了随机数字
        () => {
          //实例化城市查询类
          this.AMap = window.AMap;
          this.cityLoading = true;
          let citysearch = new this.AMap.CitySearch();
          //自动获取用户IP，返回当前城市
          citysearch.getLocalCity((status, result) => {
            console.log("城市定位", result);
            if (status === "complete" && result.info === "OK") {
              if (result && result.city && result.bounds) {
                let obj = {
                  name: result.city,
                  lat: result.bounds.northEast.lat - 0.2,
                  lng: result.bounds.northEast.lng - 0.2
                };
                this.cityData = obj;
                this.city = result.city;
              }
            } else {
              this.$toast("定位失败");
            }
            this.cityLoading = false;
          });
        }
      );
    },
    async getCityList() {
      let res = await $.getJSON("/city.json", {});
      console.log("res", Object.values(res));
      let data = Object.values(res);
      let letter_reg = /^[A-Z]$/;
      let list = new Array();

      this.indexListOr = data; //保存一份原始数据，用来搜索使用

      for (let i = 0; i < data.length; i++) {
        // 添加 # 分组，用来 存放 首字母不能 转为 大写英文的 数据
        list["#"] = new Array();
        // 首字母 转 大写英文
        let letter = data[i]["spell"].substr(0, 1).toUpperCase();
        // 是否 大写 英文 字母
        if (!letter_reg.test(letter)) {
          letter = "#";
        }
        // 创建 字母 分组
        if (!(letter in list)) {
          list[letter] = new Array();
        }
        // 字母 分组 添加 数据
        list[letter].push(data[i]);
      }
      // 转换 格式 进行 排序；
      let resault = new Array();
      for (let key in list) {
        resault.push({
          letter: key,
          list: list[key],
        });
      }
      resault.sort(function (x, y) {
        return x.letter.charCodeAt(0) - y.letter.charCodeAt(0);
      });
      // # 号分组 放最后
      // let last_arr = resault[0];
      // resault.splice(0, 1);
      // resault.push(last_arr);

      // 转换 数据 格式
      let json_sort = {};
      for (var i = 0; i < resault.length; i++) {
        json_sort[resault[i].letter] = resault[i].list;
      }

      json_sort["#"].push({
        adcode: "110000",
        name: "北京市",
        spell: "Beijing",
        lng: 116.405285,
        lat: 39.904989,
        areaCode: "010",
      }); //添加热门城市北京
      json_sort["#"].push({
        adcode: "440300",
        name: "深圳市",
        spell: "Shenzhen",
        lng: 114.085947,
        lat: 22.547,
        areaCode: "0755",
      }); //添加热门城市深圳
      json_sort["#"].push({
        adcode: "310000",
        name: "上海市",
        spell: "Shanghai",
        lng: 121.472644,
        lat: 31.231706,
        areaCode: "021",
      }); //添加热门城市上海

      this.indexListName = Object.keys(json_sort);
      this.indexList = json_sort;

      console.log(json_sort);
    },
    // 选择城市
    selectCity(row, type) {
      if (type == "index") {
        this.$emit("getCity", row);
      }
      if (type == "position") {
        this.$emit("getCity", row);
      }
    },

    //创建地图
    createMap() {
      this.selectPostionLoading = true;
      this.map = new this.AMap.Map("map", {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 16,
        viewMode: "3D",
        features: ["bg", "road", "building", "point"],
        center: this.loaction,
      });
    },

    //拖拽选址
    positionPicker(PositionPicker, PoiPicker) {
      console.log(PoiPicker);
      let imgurl = require("@/assets/imgs/dingwei.png")
      var positionPicker = new PositionPicker({
        mode: "dragMap",
        map: this.map,
        iconStyle: {
          //自定义外观
          url: imgurl, //图片地址
          size: [35, 42], //要显示的点大小，将缩放图片
          ancher: [11, 40], //锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
        },
      });
      positionPicker.on("success", (positionResult) => {
        this.nearPostion = [];
        this.selectPostionLoading = true;
        this.city = positionResult.regeocode.addressComponent.city; //city
        setTimeout(() => {
          //延时在加载出来有更好的体验效果
          console.log("positionres", positionResult);
          this.nearPostion = positionResult.regeocode.pois;
          this.selectPosition = positionResult.regeocode.pois[0];
          this.selectPostionLoading = false;
        }, 300);
      });
      positionPicker.on("fail", (positionResult) => {
        console.log(positionResult);
        this.$toast("定位失败");
      });
      // var onModeChange = function(e) {
      //   console.log("e", e);
      //   positionPicker.setMode(e.target.value);
      // };
      positionPicker.start();
    },
    //选择地址
    selectAddr(addr) {
      this.selectPosition = JSON.parse(JSON.stringify(addr));
      this.$toast(`我选择了${addr.name}`);
    },
    cancelSearch() {
      this.isSearch = false;
      this.queryKey = "";
      this.searchResList = [];
      this.$emit('closeCity', '')
    },
    //删除历史记录
    clearSearchHistory() {
      this.$dialog
        .confirm({
          title: "确认删除历史记录？",
          message: "删除后不可恢复",
        })
        .then(() => {
          storejs.set("searchHistoryList", []);
          this.searchHistory = [];
        })
        .catch(() => {
          // on cancel
        });
    },
    selechHistory(item) {
      this.queryKey = item;
    },
    selectSearchAddr(item) {
      if (storejs.get("searchHistoryList")) {
        let searchHistory = storejs.get("searchHistoryList");
        searchHistory.push(item.name);
        searchHistory = [...new Set(searchHistory)];
        storejs.set("searchHistoryList", searchHistory);

        //去重
      } else {
        let searchHistory = [];
        searchHistory.push(item.name);
        storejs.set("searchHistoryList", searchHistory);
      }

      this.$toast(`我选择了${item.name}`);

      this.isSearch = false;
      this.queryKey = "";
      this.searchResList = [];
    },
    changeCity() {
      this.$toast("选择城市待开发");
    },
    //实例化search
    // autoInput() {
    //   AMap.plugin("AMap.Autocomplete", () => {
    //     // 实例化Autocomplete
    //     var autoOptions = {
    //       city: this.city,
    //     };
    //     let autoComplete = new AMap.Autocomplete(autoOptions);
    //     autoComplete.search(this.queryKey, (status, result) => {
    //       // 搜索成功时，result即是对应的匹配数据
    //       console, log("resulte", result);
    //     });
    //   });
    // },
  },
};
</script>
 
<style scoped>
.page {
  display: flex;
  flex-direction: column;
  position: relative;

  #search {
    width: 100%;
    flex-shrink: 0;

    .address-search__label {
      font-size: 12px;
      color: #323233;
      display: flex;
      align-items: center;

      .address-search__icon {
        margin-left: 5px;
        color: #c8c9cc;
      }
    }
  }

  .position {
    height: 55px;
    flex-shrink: 0;
    width: 100%;
    padding: 0px 12px;
    box-sizing: border-box;
    padding-bottom: 10px;
    background: #fff;

    .title {
      line-height: 24px;
      color: #666;
      font-size: 12px;
    }

    .result {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;

        i {
          font-size: 12px;
          margin-right: 6px;
        }

        .cityName {
          font-size: 14px;
          color: #000;
          font-weight: 600;
        }
      }

      .right {
        font-size: 14px;
        color: cornflowerblue;
      }
    }
  }

  .topShow {
    ::v-deep .van-index-bar__sidebar {
      top: 77%;
    }
  }

  .index-list {
    flex: 1;
    overflow-y: auto;
    background: #fff;
    width: 100%;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      width: 2px;
      height: 5px;
    }

    &::-webkit-scrollbar-track,
    ::-webkit-scrollbar-thumb {
      border-radius: 999px;
      border: 0px solid transparent;
    }

    &::-webkit-scrollbar-track {
      box-shadow: 1px 1px 5px rgba(100, 100, 100, 0.2) inset;
    }

    &::-webkit-scrollbar-thumb {
      min-height: 20px;
      background-clip: content-box;
      box-shadow: 0 0 0 5px rgba(100, 100, 100, 0.5) inset;
    }

    &::-webkit-scrollbar-corner {
      background: transparent;
    }
  }

  .search-list {
    flex: 1;
    overflow-y: auto;
    background: #fff;
    width: 100%;
    padding: 30px 12px 0;

    .searchRes-list-box {
      height: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;

      .item {
        padding: 5px 0;
        border-bottom: 1px solid #f1f1f1;

        .name {
          font-size: 14px;
          color: #000;
          font-weight: 600;
          line-height: 30px;
        }

        .addr {
          color: #666;
          font-size: 13px;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        &:last-child {
          border-bottom: 0px;
        }
      }

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>