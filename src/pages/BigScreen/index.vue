<template>
  <div>354435</div>
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
<style lang='scss' scoped></style>