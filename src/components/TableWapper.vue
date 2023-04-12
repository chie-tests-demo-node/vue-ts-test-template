<template>
  <div class="table-wapper">
    <el-table :data="tableData" :max-height="maxHeight" :height="height" border v-loading="props.loading"
      :row-key="props.rowKey" default-expand-all ref="table" :stripe="true"
      :header-cell-style="{ background: '#fafafa', padding: '14px 0' }" :cell-style="{ padding: '14px 0' }">
      <template v-for="(item, index) in colConfigs" :key="index">
        <el-table-column v-if="item.slot && item.slot === 'selection'" type="selection" :width="item.width"
          :selectable="props.selectable" :reserve-selection="true" />
        <slot v-else-if="item.slot" :name="item.slot"></slot>
        <!-- 如果不是选择框 -->
        <el-table-column v-else-if="item.type !== 'selection'" :prop="item.prop" :show-overflow-tooltip="true"
          :label="item.label" :width="item.width" :fixed="item.fixed" />
        <!-- 选择框 -->
      </template>
      <template #empty>
        <div style="height: 48px"></div>
        <img alt="" class="table-empty" src="@/assets/imgs/empty.png" />
        <h3>暂无数据</h3>
      </template>
    </el-table>
    <div class="footer-pagination">
      <el-pagination lang="zh" background style="float: right; margin: 20px 0" v-model:current-page="page"
        v-model:page-size="size" :page-sizes="pageSizes" :total="total" @current-change="queryList"
        @size-change="queryList" layout="total,prev,pager,next,sizes" />
    </div>
  </div>
</template>

<script lang="ts">
import { dfPageSize, pageSizes } from "@/config";
import { isNullArray } from "@/utils";
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  name: "app",
  props: [
    "colConfigs",
    "tableData",
    "maxHeight",
    "height",
    "loading",
    "rowKey",
    "selectable",
    "searchColumns",
    "showSearch",
  ],
  emits: [],
  setup(props, { emit }) {
    const state = reactive({
      table: null,
      propsReserveKeys: [],
      page: 1,
      total: 1,
      size: dfPageSize,
      pageSizes: pageSizes,
      form: {
        name: null,
      },
    });
    const funMethods = {
      clearSelection: () => {
        state.table?.clearSelection();
      },
      getSelectionRows: () => {
        return state.table?.getSelectionRows();
      },
      getSelectionKeys: () => {
        return funMethods.getSelectionRows()?.map((m) => m[props.rowKey]);
      },
      setReserveKeys: (keys) => {
        state.propsReserveKeys = keys;
      },
      queryList() { },
      toggleRowSelection: () => {
        if (isNullArray(state.propsReserveKeys)) {
          return;
        }
        var nowHasRows = props.tableData?.filter(
          (m) => state.propsReserveKeys.indexOf(m[props.rowKey]) != -1
        );
        for (let index = 0; index < nowHasRows.length; index++) {
          const element = nowHasRows[index];
          state.table.toggleRowSelection(element, true);
          state.propsReserveKeys = state.propsReserveKeys.filter(
            (m) => m != element[props.rowKey]
          );
        }
      },
    };
    return {
      ...toRefs(state),
      ...funMethods,
      ...state,
      props,
    };
  },
});
</script>
<style lang="scss" scoped>
.table-wapper {

  .footer-pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
