<template>
  <div>
    <TableWapper class="table-class" :colConfigs="colConfigs" :tableData="tableList" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
import TableWapper from '@/components/TableWapper.vue'
export default defineComponent({
  name: 'app',
  components: { TableWapper },
  setup() {
    const state = reactive({
      colConfigs: [],
      tableList: []
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