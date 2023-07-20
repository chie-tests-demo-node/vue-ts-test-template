<template>
  <div class="main">
    <div class="form">
      <!--搜索框-->
      <input type="text" class="input" v-model="address" id="tipinput" @keyup.enter="select">
    </div>
    <!--查询列表,高德地图api绑定id-->
    <div class="list" id="list">
    </div>
    <!--地图,需要设置宽高-->
    <div class="map" id="gd_map_d"></div>
  </div>
</template>
 
<script setup>
import AMapLoader from '@amap/amap-jsapi-loader';
import { ref, getCurrentInstance } from 'vue'
//data
const { proxy } = getCurrentInstance();
const address = ref("");
let geocoder = null;
let MyMap = null;
let map = null;
//methods
const select = () => {
  //构造地点查询类
  var placeSearch = new MyMap.PlaceSearch({
    pageSize: 3, // 单页显示结果条数
    pageIndex: 1, // 页码
    city: "010", // 兴趣点城市
    citylimit: false,  //是否强制限制在设置的城市内搜索
    map: map, // 展现结果的地图实例
    panel: "list", // 结果列表将在此容器中进行展示。
    autoFitView: false // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
  });
  //关键字查询
  placeSearch.search(proxy.address);
}
const getAddress = () => {
  let cc = map.getCenter();
  return new Promise((resolve, reject) => {
    geocoder.getAddress([cc.lng, cc.lat], (status, result) => {
      if (result.regeocode.formattedAddress) {
        resolve(result.regeocode.formattedAddress)
      } else {
        resolve("");
      }
    })
  })
}
//mapinit
window._AMapSecurityConfig = {
  securityJsCode: '填写高德地图Web端(JS API)申请的密钥',
}
AMapLoader.load({
  "key": "填写高德地图Web端(JS API)申请的key", // 申请好的Web端开发者Key
  "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  "plugins": ['AMap.AutoComplete', 'AMap.PlaceSearch', 'AMap.Geocoder'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
}).then((AMap) => {
  MyMap = AMap;//保存AMap

  init();
}).catch(e => {
  console.log(e);
})
const init = () => {
  //绘制MyMap实例地图
  map = new MyMap.Map('gd_map_d', {
    zoom: 14, //初始地图级别
    center: [121.473432, 31.22919],
    resizeEnable: true
  })
  geocoder = new MyMap.Geocoder({
    city: "010", //城市设为北京，默认：“全国”
  });
  var auto = new MyMap.AutoComplete({
    input: "tipinput"
  });
}
defineExpose({
  getAddress  //将事件暴露出去
})
</script>
<style scoped lang="scss">
.main {
  width: 100%;
  height: 350px;
  position: relative;

  .map {
    width: 100%;
    height: 100%;
  }

  .form {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 999;

    .input {
      width: 180px;
      line-height: 30px;
      padding-left: 5px;
      box-shadow: 0 2px 6px 0 rgb(114 124 245 / 50%);
      outline: none;
      border-radius: 5px;
      border: none;
    }
  }

  .list {
    position: absolute;
    top: 10px;
    right: 10px;
    height: 300px;
    width: 240px;
    z-index: 999;

    .li {
      line-height: 25px;

    }
  }
}
</style>