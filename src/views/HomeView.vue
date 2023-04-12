<template>
  <div class="home">
    <HelloWorld :rangeColumns="rangeColumns" :tableList="tableList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
  },
  setup() {
    let rangeColumns = [
      { title: "标题", key: "title" },
      { title: "来源", key: "laiyuan" },
      { title: "标注人", key: "ceshi" },
      { title: "标注时间", key: "date" },
      {
        title: "操作",
        key: "label",
        template: true,
        btns: [
          {
            name: "编辑",
            func: (index:any, row:any) => {
              console.log(index,row)
              // methods.handleEdit(index, row);
            },
          },
          {
            name: "删除",
            btnStyle: "color:red",
            func: (index:any, row:any) => {
              console.log(index,row)
              // methods.handleDelet(index, row);
            },
          },
        ],
      },
    ];

    // 表格数据
    const tableList = reactive([
      {
        date: "2016-05-03",
        ceshi: "Tom",
        laiyuan: "新闻网",
        title: "腾讯进军",
      },
      {
        date: "2016-05-03",
        ceshi: "Tom",
        laiyuan: "新闻网",
        title: "腾讯进军",
      },
    ]);

    return { rangeColumns, tableList };
  },
});
</script>
