<template>
  <div>登陆页面</div>
  <el-button type="primary" @click="loginFun">登录</el-button>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
import { reidrect } from '../../router'
export default defineComponent({
  name: 'app',
  setup() {
    const state = reactive({

    })
    const funMethods = {
      loginFun() {
        reidrect('/home')
      }
    }
    const requestMethods = {}
    return {
      ...toRefs(state),
      ...funMethods,
      ...requestMethods
    }
  }
})

</script>
<style lang='scss' scoped></style>