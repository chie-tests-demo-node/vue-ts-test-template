<template>
  <div class="manage">
    <div class="top-search">
      <el-form :inline="true" style="display: flex" :model="form">
        <div class="form-item">
          <div class="flex-content">
            <el-form-item label="名称">
              <el-input v-model="form.name" style="width: 273px" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
          <div class="btns">
            <el-button type="primary">查询</el-button>
            <el-button type="default">重置</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <TableWapper class="table-class" :showSearch="true" :colConfigs="colConfigs" :tableData="tableList" />
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
      form: {
        name: null,
      },
      colConfigs: [
        { label: "印章名称", prop: "name" },
        { label: "操作", prop: "option" }
      ],
      tableList: [
        { name: 123 }
      ]
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
.manage {
  .top-search {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;

    .form-item {
      width: 100%;
    }

    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>