<template>
  <div class="bigScreenCls">
    <dv-full-screen-container class="big-screen">
      <dv-border-box-1 class="left-top">
        <dv-loading>数据加载中...</dv-loading>
      </dv-border-box-1>
      <dv-flyline-chart :config="config" :dev="true" class="left-bottom" />
      <dv-scroll-board :config="config1" style="width:500px;height:220px" />
      <dv-scroll-ranking-board :config="config2" style="width:500px;height:300px" />
    </dv-full-screen-container>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'app',
  setup() {
    const state = reactive({
      config: {
        centerPoint: [0.48, 0.35],
        points: [
          {
            position: [0.52, 0.235],
            text: '新乡'
          },
          {
            position: [0.43, 0.29],
            text: '焦作'
          },
          {
            position: [0.59, 0.35],
            text: '开封'
          },
          {
            position: [0.53, 0.47],
            text: '许昌'
          },
          {
            position: [0.45, 0.54],
            text: '平顶山'
          },
          {
            position: [0.36, 0.38],
            text: '洛阳'
          },
          {
            position: [0.62, 0.55],
            text: '周口'
          },
          {
            position: [0.56, 0.56],
            text: '漯河'
          },
          {
            position: [0.37, 0.66],
            text: '南阳'
          },
          {
            position: [0.55, 0.81],
            text: '信阳'
          },
          {
            position: [0.55, 0.67],
            text: '驻马店'
          },
          {
            position: [0.37, 0.29],
            text: '济源'
          },
          {
            position: [0.20, 0.36],
            text: '三门峡'
          },
          {
            position: [0.76, 0.41],
            text: '商丘'
          },
          {
            position: [0.59, 0.18],
            text: '鹤壁'
          },
          {
            position: [0.68, 0.17],
            text: '濮阳'
          },
          {
            position: [0.59, 0.10],
            text: '安阳'
          }
        ],
        bgImgUrl: '/img/flylineChart/map.jpg',
        centerPointImg: {
          url: '/img/flylineChart/mapCenterPoint.png'
        },
        pointsImg: {
          url: '/img/flylineChart/mapPoint.png'
        }
      },
      config1: {
        header: ['列1', '列2', '列3'],
        data: [
          ['行1列1', '行1列2', '行1列3'],
          ['行2列1', '行2列2', '行2列3'],
          ['行3列1', '行3列2', '行3列3'],
          ['行4列1', '行4列2', '行4列3'],
          ['行5列1', '行5列2', '行5列3'],
          ['行6列1', '行6列2', '行6列3'],
          ['行7列1', '行7列2', '行7列3'],
          ['行8列1', '行8列2', '行8列3'],
          ['行9列1', '行9列2', '行9列3'],
          ['行10列1', '行10列2', '行10列3']
        ],
        index: true,
        columnWidth: [50],
        align: ['center']
      },
      config2: {
        data: [
          {
            name: '周口',
            value: 55
          },
          {
            name: '南阳',
            value: 120
          },
          {
            name: '西峡',
            value: 78
          },
          {
            name: '驻马店',
            value: 66
          },
          {
            name: '新乡',
            value: 80
          },
          {
            name: '信阳',
            value: 45
          },
          {
            name: '漯河',
            value: 29
          }
        ]
      }
    })
    const funMethods = {}
    const requestMethods = {

    }
    return {
      ...toRefs(state),
      ...funMethods,
      ...requestMethods
    }
  }
})

</script>
<style lang='scss' scoped>
.bigScreenCls {
  height: 100vh;
  width: 100%;
  color: #fff;
  min-width: 1800px;
  background-image: url('@/assets/pageBg.png');
  background-size: 100% 100%;

  .big-screen {
    display: flex;
    flex-wrap: wrap;
    height: 100vh !important;
    width: 100% !important;
    margin: 0;
    padding: 0;

    .left-top {
      height: 300px;
      width: 500px;
    }

    .left-bottom {
      margin-top: 20px;
      height: 300px;
      width: 500px;
    }
  }
}
</style>