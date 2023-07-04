<template>
  <div class="page" :style="{ height: pageHeight + 'px' }">
    <van-nav-bar title="所在位置" @click-left="onClickLeft" class="topNavFix">
      <template #left>
        <van-icon name="arrow-left" color="#333752" size="18" />
      </template>
      <template #right>
        <van-button type="info" @click="getInfo">确定</van-button>
      </template>
    </van-nav-bar>
    <div id="search">
      <van-search v-model="queryKey" :show-action="isSearch" shape="round" placeholder="请输入您的地址" @focus="searchFocus"
        @blur="searchBlur">
        <template slot="label">
          <div class="address-search__label" @click="changeCity">
            <span>{{ city || "定位中..." }}</span><i class="address-search__icon van-icon van-icon-arrow-down"
              style="font-size: 16px"><!----></i>
          </div>
        </template>
        <template slot="action" v-if="isSearch">
          <span @click="cancelSearch()">取消</span>
        </template>
      </van-search>
    </div>

    <div id="map"></div>
    <div class="address-map__pois__title">
      <div class="areaStyl">附近位置</div>
      <div class="areaBtn">
        <!-- <van-button type="info" @click="getInfo">信息提交</van-button> -->
      </div>
    </div>
    <div class="address-map__pois van-cell-group" v-if="!isSearch && !isShowSelectCity">
      <div class="address-map__poi van-cell van-cell--borderless" v-for="(item, index) in nearPostion" :key="index"
        @click="selectAddr(item)">
        <i class="van-icon van-icon-location van-cell__left-icon"
          :class="{ active: selectPosition.id == item.id }"><!----></i>
        <div class="van-cell__title">
          <span>{{ item.name }}</span>
          <div class="van-cell__label">{{ item.address }}</div>
        </div>
      </div>
      <div class="loading" v-show="selectPostionLoading">
        <van-loading type="spinner" color="#1989fa" />
      </div>
      <!-- <div class="address-map__poi van-cell van-cell--borderless">
        <i class="van-icon van-icon-location van-cell__left-icon"></i>
        <div class="van-cell__title">
          <span>深圳安迪妈妈公寓</span>
          <div class="van-cell__label">科技园深南花园c栋(地铁口旁)</div>
        </div>
      </div> -->
    </div>

    <div class="searchRes" v-show="isSearch">
      <div class="searchHistory" v-if="!queryKey">
        <div class="title" v-if="searchHistory.length">
          <span>历史搜索</span>
          <van-icon @click="clearSearchHistory()" class="del" name="delete" />
        </div>
        <div class="serchHistory-list" v-if="searchHistory.length">
          <span v-for="(item, index) in searchHistory" :key="index" @click="selechHistory(item)">{{ item }}</span>
        </div>
        <!-- 空搜索历史 -->
        <van-empty v-if="!searchHistory.length" image="search" description="暂无历史搜索" />
      </div>
      <div class="searchRes-list" v-if="queryKey">
        <div class="searchRes-list-box" v-if="searchResList.length">
          <div class="item" v-for="(item, index) in searchResList" :key="index" @click="selectSearchAddr(item)">
            <div class="name">{{ item.name }}</div>
            <div class="addr">{{ item.district }}{{ item.address }}</div>
          </div>
        </div>
        <van-empty v-if="!searchResList.length && noSearchData" image="search" description="暂无搜索结果" />
      </div>
    </div>
    <!-- 选择城市 -->
    <transition name="van-slide-right" v-if="isShowSelectCity">
      <div style="
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          z-index: 1500;
        ">
        <SelectCity @getCity="getCity" @closeCity="closeCity" @showRit="showRit" :faRit="rightArea"></SelectCity>
      </div>
    </transition>
  </div>
</template>
 
<script>
import { loadJs } from "@/utils/mapfn.ts";
import SelectCity from "@/components/SelectCity";
import { Toast } from 'vant';
//便捷存取本地存储工具
import storejs from "store";
export default {
  components: { SelectCity },
  data() {
    return {
      rightArea: '',
      pageHeight: window.innerHeight,
      map: "",
      loaction: [], //lng,lat
      city: "",
      isShowSelectCity: false,
      nearPostion: [],
      selectPosition: {},
      selectPostionLoading: false,
      isSearch: false,
      queryKey: "",
      searchHistory: [], //搜索历史记录
      searchResList: [], //搜索记录
      noSearchData: false,
      timer: "",
      isToast: '',
      positionInfo: {},
      mapShow: false
    };
  },
  watch: {
    queryKey: function (val) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (window.AMap) {
          //判断地图是否初始化
          window.AMap.plugin("AMap.AutoComplete", () => {
            let autoOptions = {
              city: this.city || "全国", //city 限定城市，默认全国
              pageSize: 20, // 单页显示结果条数
              children: 0, //不展示子节点数据
              pageIndex: 1, //页码
              extensions: "base", //返回基本地址信息
            };
            // 实例化AutoComplete
            let autoComplete = new window.AMap.AutoComplete(autoOptions);
            // 根据关键字进行搜索
            autoComplete.search(val, (status, result) => {
              // 搜索成功时，result即是对应的匹配数据
              this.noSearchData = false;
              console.log(result);
              if (result.info == "OK") {
                console.log(result);
                this.searchResList = result.tips;
                if (result.tips && !result.tips.length) {
                  this.searchResList = [];
                  this.noSearchData = true;
                }
              } else {
                this.searchResList = [];
                this.noSearchData = true;
              }
            });
          });
        }
      }, 300);
    }
  },
  async mounted() {
    // await this.init();
  },
  methods: {
    showRit(val) {
      this.rightArea = val
    },
    onClickLeft() {
      this.$emit("showChange", this.mapShow);
    },
    getInfo() {
      this.$emit("getAreaInfo", this.positionInfo);
    },
    async init() {
      // Toast.loading({
      //   message: '初始化中...',
      //   forbidClick: true,
      // });
      await loadJs(
        "https://webapi.amap.com/maps?v=2.0&key=d12ec89124d64af8ee33273e3dba23b3",
        //用你们自己申请的key，这个key我里面加了随机数字
        async () => {
          // this.selectPostionLoading = true;
          await loadJs("https://webapi.amap.com/ui/1.1/main.js", () => {
            window.AMapUI.loadUI(
              ["misc/PositionPicker", "misc/PoiPicker"],
              (PositionPicker, PoiPicker) => {
                //获取定位
                this.getLoction(async () => {
                  //拖拽选址
                  this.positionPicker(PositionPicker, PoiPicker);
                });

                //实力化搜索
                // await this.autoInput();
              }
            );
          });
        }
      );
    },
    //创建地图
    createMap() {
      this.selectPostionLoading = true;
      this.map = new window.AMap.Map("map", {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 16,
        viewMode: "3D",
        features: ["bg", "road", "building", "point"],
        center: this.loaction,
      });
      Toast.clear()
    },
    //获取定位
    getLoction(callback) {
      window.AMap.plugin("AMap.Geolocation", () => {
        let geolocation = new window.AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          buttonPosition: "RB", //定位按钮的停靠位置
          buttonOffset: new window.AMap.Pixel(0, 0), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          extensions: "all",
        });
        geolocation.getCurrentPosition((status, result) => {
          //定位成功
          if (status == "complete") {
            //获取定位坐标
            this.loaction = [result.position.lng, result.position.lat];
            //创建地图
            this.createMap();
            this.map.addControl(geolocation);
          } else {
            //定位失败
            this.loaction = [0, 0];
            this.createMap();
            this.map.addControl(geolocation);
            console.log('888', result)
            this.$toast("定位失败,原因：" + result.message);
          }
          if (typeof callback === "function") {
            callback();
          }
        });
      });
    },
    //拖拽选址
    positionPicker(PositionPicker, PoiPicker) {
      console.log("PoiPicker", PoiPicker);
      let imgurl = require("@/assets/imgs/dingwei.png")
      var positionPicker = new PositionPicker({
        mode: "dragMap",
        map: this.map,
        iconStyle: {
          //自定义外观
          // https://img.yzcdn.cn/public_files/2020/03/04/32a548551986a2c3c22ef3018eb7a9af.png
          url: imgurl,
          size: [35, 42], //要显示的点大小，将缩放图片
          ancher: [11, 40], //锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
        },
      });
      positionPicker.on("success", (positionResult) => {
        this.nearPostion = [];
        this.selectPostionLoading = true;
        this.city =
          positionResult.regeocode.addressComponent.city ||
          positionResult.regeocode.addressComponent.province; //city
        setTimeout(() => {
          //延时在加载出来有更好的体验效果
          console.log("positionres", positionResult);
          this.nearPostion = positionResult.regeocode.pois;
          this.selectPosition = positionResult.regeocode.pois[0];
          this.selectPostionLoading = false;
          this.positionInfo = positionResult
        }, 300);
      });
      positionPicker.on("fail", (positionResult) => {
        console.log("positionResult", positionResult);
        this.$toast("定位失败");
      });
      // var onModeChange = function (e) {
      //   console.log("e", e);
      //   positionPicker.setMode(e.target.value);
      // };
      positionPicker.start();
    },
    //选择地址
    selectAddr(addr) {
      this.selectPosition = JSON.parse(JSON.stringify(addr));
      this.$toast(`我选择了${addr.name}`);
      this.map.setZoomAndCenter(16, this.selectPosition.location); //同时设置地图中心点和层级
    },
    searchFocus() {
      if (storejs.get("searchHistoryList")) {
        this.searchHistory = storejs.get("searchHistoryList");
      }
      this.isSearch = true;
      this.rightArea = ''
    },
    searchBlur() {
      this.rightArea = ''
    },
    cancelSearch() {
      this.isSearch = false;
      this.queryKey = "";
      this.searchResList = [];
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
      } else {
        let searchHistory = [];
        searchHistory.push(item.name);
        storejs.set("searchHistoryList", searchHistory);
      }
      this.$toast(`我选择了${item.name}`);
      this.isSearch = false;
      this.queryKey = "";
      this.searchResList = [];
      this.loaction = [item.location.lng, item.location.lat];
      this.map.setZoomAndCenter(16, this.loaction); //同时设置地图中心点和层级
    },
    changeCity() {
      this.isShowSelectCity = true;
      this.rightArea = '3'
    },
    async getCity(cityObj) {
      this.city = cityObj.name;
      this.loaction = [cityObj.lng, cityObj.lat];
      this.isShowSelectCity = false;
      this.map.setZoomAndCenter(16, this.loaction); //同时设置地图中心点和层级
    },
    closeCity() {
      this.isShowSelectCity = false;
    }
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
<style scoped>  .topNavFix {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: #fff;
    z-index: 8888;

    ::v-deep .van-nav-bar__title {
      color: #333;
      font-weight: 700;
    }

    ::v-deep .van-button--info {
      background-color: #fff;
      border: 1px solid #fff;
      color: #005dff;
      font-size: 14px;
      padding: 0;
    }
  }

  .page {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-top: 46px;
    box-sizing: border-box;

    #search {
      width: 100%;
      position: absolute;
      z-index: 1001;
      width: 100%;
      top: 40px;
      right: 0;

      .address-search__label {
        font-size: 12px;
        color: #323233;
        display: flex;
        align-items: center;

        .address-search__icon {
          margin-left: 5px;
          color: #c8c9cc;
        }

        span {
          max-width: 70px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    #map {
      height: 275px;
      width: 100%;
    }

    .address-map__pois__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      background-color: #fff;
      padding: 0 12px;
      text-align: left;

      .areaStyl {
        font-size: 12px;
        color: #969799;
      }

      .areaBtn {
        .van-button--info {
          height: 32px;
          width: 80px;
          font-size: 12px;
          background-color: #005dff;
          border: 1px solid #005dff;
          border-radius: 4px;
        }
      }
    }

    .address-map__pois {
      flex: 1;
      overflow-y: auto;
      padding: 0 12px;
      position: relative;
      -webkit-overflow-scrolling: touch;

      .loading {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f7f8fa;
      }

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

      .van-cell {
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        box-sizing: border-box;
        width: 100%;
        padding: 10px 16px;
        overflow: hidden;
        color: #323233;
        font-size: 14px;
        line-height: 24px;
        background-color: #fff;

        &.address-map__poi {
          background: #f7f8fa;
          border-radius: 8px;
          padding: 16px 8px;
          line-height: 20px;

          .van-icon-location {
            color: #dddee0;
            line-height: 1.3;

            &.active {
              color: #ee0a24;
            }
          }

          .van-cell__label {
            color: #969799;
          }
        }

        &.address-map__poi:not(:last-child) {
          margin-bottom: 8px;
        }
      }
    }

    .searchRes {
      position: absolute;
      width: 100%;
      height: 100%;
      background: #fff;
      z-index: 1000;
      padding-top: 54px;
      box-sizing: border-box;
      top: 0;
      left: 0;
      right: 0;

      .searchHistory {
        height: 100%;
        padding: 0px 12px;
        box-sizing: border-box;

        .title {
          margin-top: 36px;
          height: 25px;
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;

          span {
            font-size: 12px;
            color: #000;
            font-weight: 600;
          }

          .del {
            color: #666;
            font-size: 14px;
          }
        }

        .serchHistory-list {
          width: 100%;
          padding-top: 15px;
          box-sizing: border-box;
          display: flex;
          flex-wrap: wrap;

          span {
            padding: 5px 8px;
            background: #eee;
            color: #333;
            font-size: 12px;
            max-width: 90px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-right: 8px;
            line-height: 1;
            border-radius: 3px;
            margin-bottom: 10px;
          }
        }
      }

      .searchRes-list {
        height: 100%;
        padding: 30px 12px 0;
        box-sizing: border-box;

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
  }
</style>