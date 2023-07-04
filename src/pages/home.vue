<template>
  home
  <!-- <van-nav-bar title="标题" /> -->
  <!-- <span>总时间：{{ current.total }}</span>
  <span>剩余天数：{{ current.days }}</span>
  <span>剩余小时：{{ current.hours }}</span>
  <span>剩余分钟：{{ current.minutes }}</span>
  <span>剩余秒数：{{ current.seconds }}</span>
  <span>剩余毫秒：{{ current.milliseconds }}</span> -->
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
// import { useCountDown } from '@vant/use'

export default defineComponent({
  name: 'app',
  setup() {
    // const countDown = useCountDown({
    //   // 倒计时 24 小时
    //   time: 24 * 60 * 60 * 1000,
    // });

    // // 开始倒计时
    // countDown.start();

    // return {
    //   current: countDown.current,
    // };
    // const state = reactive({
    //   rateValue: 2,
    // })
    // const funMethods = {
    //   changeRateValue(e: number) {
    //     console.log(e);
    //   }
    // }
    // const requestMethods = {}
    // return {
    //   ...toRefs(state),
    //   ...funMethods,
    //   ...requestMethods
    // }
  }
})

</script>
<style scoped></style>