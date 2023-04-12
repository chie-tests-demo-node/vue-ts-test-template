<template>
  <div class="baseLayout">
    <div v-if="isShowHeader()" class="baseHeader">

    </div>
    <div class="baseContent">
      <div class="leftMenu">
        <el-menu :default-active="currentPath()">
          <el-menu-item v-for="item in getMenus()" :key="item.path" :index="item.path" @click="toMenu(item.path)">
            {{ item.name }}
          </el-menu-item>
        </el-menu>
      </div>
      <div class="rightContent" :style="contentStyle()">
        <el-card>
          <RouterView />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" >
import { isNull } from "@/utils";
import { showHeader } from "@/utils/env";
import { ElMessage } from "element-plus";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { reidrect } from "@/router";

export default defineComponent({
  components: {},
  setup() {
    const router = useRouter();

    const state = reactive({
      outTime: "",
      quota: "",
      pwdEditorRef: null,
    });

    const funMethods = {
      currentPath: () => {
        return router.currentRoute.value.fullPath;
      },
      getMenus: () => {
        return [{
          name: "首页",
          path: "/home",
        }, {
          name: "设备管理",
          path: "/manage",
        }];
      },
      toMenu: (path: string) => {
        router.push(path).catch(() => {
          reidrect(path);
        });
      },
      isNull,
      isShowHeader: () => {
        return showHeader();
      },
      contentStyle: () => {
        if (funMethods.isShowHeader()) {
          return "";
        } else {
          return "height:calc(100vh - 36px);min-height:calc(100vh - 36px);max-height:calc(100vh - 36px);";
        }
      },
    };

    const request = {
      outLogin: async () => {

        ElMessage.success("退出成功!");

        setTimeout(() => {
          reidrect("/login");
        }, 200);
      },
    };

    onMounted(async () => {
      // const userInfo = await queryCurrentUser(() => {
      //   ElMessage.error("获取当前用户详情失败");
      // });
      // debugger;
    });

    return {
      ...toRefs(state),
      ...funMethods,
      ...request,
    };
  },
});
</script>


<style scoped lang="scss">
$header-height: 80px;

$content-padding: 18px;

.baseLayout {
  .baseHeader {
    background-color: #c6e2ff;
    height: $header-height;
    display: flex;
  }

  .baseContent {
    display: flex;
    height: 100%;

    .leftMenu {
      width: 220px;
      min-width: 220px;
      max-width: 220px;

      .el-menu {
        height: 100%;
        background-color: #d9ecff;
        padding-top: 18px;
      }

      .el-menu-item {
        height: 60px;
        font-size: 14px;
        font-weight: 900;
        padding-left: 38px;
        margin-bottom: 5px;
        color: #303133;
      }

      .el-menu-item.is-active {
        background-color: #d9ecff;
        color: #409eff;
      }

      .el-menu-item:hover {
        background-color: #d9ecff;
        color: #409eff;
      }
    }

    .el-card.is-always-shadow {
      height: 99%;
    }

    .rightContent {
      width: 100%;
      height: calc(100vh - $header-height - $content-padding - $content-padding);
      min-height: calc(100vh - $header-height - $content-padding - $content-padding);
      max-height: calc(100vh - $header-height - $content-padding - $content-padding);
      padding: $content-padding;
      text-align: left;
      overflow: auto;
      background-color: #e9f0fa;
    }
  }
}
</style>