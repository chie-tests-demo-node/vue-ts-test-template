

<template>
  <div id="container"> </div>
  <!-- <el-input v-model="searchWord"></el-input>
  <el-button @click="searchArea">去搜搜</el-button>
  <div> 选择时候的地址++++{{ searchedAddress }} </div>
  <div> 选择时候的经纬++++{{ searchedArr }} </div>
  <div v-for="(item, index) in areaList" :key="'areaList' + index.toString()" @click="listClick(item)">{{ item.name }}
  </div> -->
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'app',
  setup() {
    const state = reactive({
      searchWord: '',
      areaList: <any[]>([]),
      localCity: '',
      searchedAddress: '',
      searchedArr: <any>([]),
    })
    let mapObj = ref<any>(null)
    // 创建一个类收纳Amap
    let myAMaP: any
    // 创建一个数组接受点击的标记点
    const markers = ref<any>([])
    // 创建一个用于搜索
    let placeSearch: any

    const funMethods = {
      async testAmp() {
        const mapAxios = await AMapLoader.load({
          key: 'b87ba9590d7fa88e6d7fd6d3aeb2470f', //设置高德地图key
          version: '2.0',
          plugins: ['AMap.ToolBar', 'AMap.Scale', 'AMap.Geolocation', 'AMap.PlaceSearch', 'AMap.AutoComplete', 'AMap.Geocoder', 'AMap.CitySearch'],
          AMapUI: {
            version: '1.1',
            plugins: []
          },
          Loca: {
            version: '2.0.0'
          }
        })
        funMethods.initGdMap(mapAxios)
        myAMaP = mapAxios
      },
      // onComplete(AMap: any, data: any) {
      //   console.log(data);

      //   console.log('定位结果：' + data.position) //经纬度信息
      //   let lnglat = data.position
      //   let marker = new AMap.Marker({
      //     //创建标记
      //     position: new AMap.LngLat(lnglat[0], lnglat[1])
      //   })
      //   console.log(marker)
      // },
      // 初始化地图
      initGdMap(AMap: any) {
        mapObj = new AMap.Map('container', {
          zoom: 15,
          viewMode: '3D',
          center: [116.397428, 39.90923],
        })
        // 先获取本地位置
        let geolocation = new AMap.Geolocation({
          timeout: 1000, //超过3秒后停止定位，默认：5s
          enableHighAccuracy: true,
          zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
          position: 'RT',
          showButton: true,
          offset: [10, 20], //定位按钮距离对应角落的距离
          showMarker: true //是否显示定位点
        })
        console.log('本地位置', geolocation);
        var citysearch = new AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        console.log('获取城市信息', citysearch);

        citysearch.getLocalCity((status, result) => {
          debugger
          console.log(status, result);
          if (status === 'complete' && result.info === 'OK') {
            if (result && result.city && result.bounds) {
              var cityinfo = result.city;
              var citybounds = result.bounds;
              document.getElementById('info').innerHTML = '您当前所在城市：' + cityinfo;
              //地图显示当前城市
              console.log('当前城市', citybounds);
              // map.setBounds(citybounds);
            }
          } else {
            document.getElementById('info').innerHTML = result.info;
          }
        });
        // mapObj.addControl(geolocation)
        // geolocation.getCurrentPosition((status: any, result: any) => {
        //   console.log(status);

        //   if (status == 'complete') {
        //     funMethods.onComplete(AMap, result)
        //   } else {
        //     ElMessage({
        //       type: 'error',
        //       message: '获取定位失败'
        //     })
        //     let defaultPointer = new AMap.Marker({
        //       map: mapObj,
        //       position: [120.227461, 30.268771] //定位地址获取不到就给一个默认的, 是一个经纬度的数组
        //     })
        //     mapObj.add(defaultPointer)
        //     markers.value.push(defaultPointer)
        //     mapObj.setCenter()// 定位地址获取不到就给一个默认的
        //     mapObj.setZoom(20)
        //     // 获取本地的大致范围地址
        //     geolocation.getCityInfo(function (status: any, result: any) {
        //       state.localCity = result.city
        //     })
        //     let geocoder = new AMap.Geocoder({
        //       radius: 1000 //范围，默认：500
        //     })
        //     geocoder.getAddress([120.227461, 30.268771], function (status: any, result: any) {
        //       if (status === 'complete' && result.regeocode) {
        //         state.searchedAddress = result.regeocode.formattedAddress
        //       }
        //     })
        //     state.searchedArr = [120.227461, 30.268771]
        //   }
        // })
        // mapObj.on('click', function (e: any) {
        //   let geocoder = new AMap.Geocoder({
        //     radius: 1000 //范围，默认：500
        //   })
        //   geocoder.getAddress([e.lnglat.lng, e.lnglat.lat], function (status: any, result: any) {
        //     if (status === 'complete' && result.regeocode) {
        //       state.searchedAddress = result.regeocode.formattedAddress
        //       state.searchedArr = [e.lnglat.lng, e.lnglat.lat]
        //     }
        //   })
        //   mapObj.remove(markers.value)
        //   let clickPointer = new AMap.Marker({
        //     map: mapObj,
        //     position: [e.lnglat.lng, e.lnglat.lat]
        //   })
        //   mapObj.setCenter([e.lnglat.lng, e.lnglat.lat])
        //   mapObj.add(clickPointer)
        //   markers.value.push(clickPointer)
        // })
        // placeSearch = new AMap.PlaceSearch({
        //   // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
        //   city: state.localCity,
        //   pageSize: 30
        // })
      },

      //   showCityInfo() {
      //     //实例化城市查询类
      //     var citysearch = new AMap.CitySearch();
      //     //自动获取用户IP，返回当前城市
      //     citysearch.getLocalCity(function(status, result) {
      //         if (status === 'complete' && result.info === 'OK') {
      //             if (result && result.city && result.bounds) {
      //                 var cityinfo = result.city;
      //                 var citybounds = result.bounds;
      //                 document.getElementById('info').innerHTML = '您当前所在城市：'+cityinfo;
      //                 //地图显示当前城市
      //                 map.setBounds(citybounds);
      //             }
      //         } else {
      //             document.getElementById('info').innerHTML = result.info;
      //         }
      //     });
      // },

      // listClick(item: any) {
      //   let geocoder = new myAMaP.Geocoder({
      //     radius: 1000 //范围，默认：500
      //   })
      //   geocoder.getAddress(item.location, function (status: any, result: any) {
      //     if (status === 'complete' && result.regeocode) {
      //       state.searchedAddress = result.regeocode.formattedAddress
      //       state.searchedArr = item.location
      //       state.areaList = []
      //     }
      //   })
      //   mapObj.remove(markers.value)
      //   let clickPointer = new myAMaP.Marker({
      //     map: mapObj,
      //     position: item.location
      //   })
      //   mapObj.setCenter(item.location)
      //   mapObj.add(clickPointer)
      //   markers.value.push(clickPointer)
      // },
      // searchArea() {
      //   console.log(state.searchWord, markers.value);
      //   mapObj.remove(markers.value)
      //   placeSearch.search(state.searchWord, (status: any, result: any) => {
      //     // 查询成功时，result即对应匹配的POI信息
      //     if (result.poiList && result.poiList.pois.length > 0) {
      //       state.areaList = result.poiList.pois
      //       let pois = result.poiList.pois
      //       for (let i = 0; i < pois.length; i++) {
      //         let poi = pois[i]
      //         let marker = []
      //         marker[i] = new myAMaP.Marker({
      //           position: poi.location, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      //           title: poi.name
      //         })
      //         marker[i].on('click', (e: any) => {
      //           state.areaList = []
      //           let geocoder = new myAMaP.Geocoder({
      //             radius: 1000 //范围，默认：500
      //           })
      //           geocoder.getAddress([e.lnglat.lng, e.lnglat.lat], function (status: any, result: any) {
      //             if (status === 'complete' && result.regeocode) {
      //               state.searchedAddress = result.regeocode.formattedAddress
      //               state.searchedArr = [e.lnglat.lng, e.lnglat.lat]
      //             }
      //           })
      //           mapObj.remove(markers.value)
      //           let clickPointer = new myAMaP.Marker({
      //             map: mapObj,
      //             position: [e.lnglat.lng, e.lnglat.lat]
      //           })
      //           mapObj.setCenter([e.lnglat.lng, e.lnglat.lat])
      //           mapObj.add(clickPointer)
      //           markers.value.push(clickPointer)
      //         })
      //         // 将创建的点标记添加到已有的地图实例：
      //         mapObj.add(marker[i])
      //         markers.value.push(marker[i])
      //       }
      //       // 自动适配到合适视野范围
      //       // 无参数，默认包括所有覆盖物的情况
      //       mapObj.setFitView()
      //     }
      //   })
      // }
    }
    const requestMethods = {}
    onMounted(() => {
      funMethods.testAmp()
    })
    return {
      ...toRefs(state),
      ...funMethods,
      ...requestMethods
    }
  }
})

</script>
<style scoped>
#container {
  padding: 0px;
  margin: 10px;
  /* width: 100%; */
  height: 500px;
}
</style>