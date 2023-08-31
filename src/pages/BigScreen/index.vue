<template>
  <div class="bigScreenCls">1435341</div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'app',
  setup() {
    const state = reactive({
    })
    const funMethods = {}
    const requestMethods = {}
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
  min-width: 1800px;
  background-image: url('@/assets/pageBg.png');
  background-size: 100% 100%;
}
</style>