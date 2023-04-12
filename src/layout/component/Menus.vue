<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu default-active="/home" class="el-menu-vertical-demo" @select="selectMenu">
        <el-menu-item index="/home">
          <el-icon>
            <location />
          </el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/manage">
          <el-icon>
            <document />
          </el-icon>
          <span>电子签章</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Menus",
  setup() {
    const router = useRouter();
    function selectMenu(index) {
      router.push(index);
    }

    return { selectMenu };
  }
};
</script>

<style scoped>
ul.el-menu.el-menu--vertical.el-menu-vertical-demo {
  width: 199px;
}
li.el-menu-item.is-active {
  background-color: #409eff;
  color: #fff;
}
</style>