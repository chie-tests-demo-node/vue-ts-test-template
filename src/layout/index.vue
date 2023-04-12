<template>
  <el-container style="height: 100vh">
    <el-aside width="200px"><Menus /></el-aside>
    <el-container>
      <el-header>
        <span class="title">云电子签章</span>
        <el-icon class="exit" @click="exitSys" size="26" title="退出"><SwitchButton /></el-icon>
      </el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
  <!-- <el-header>
    <el-card>
      fytuygh
    </el-card>
  </el-header>
  <div class="content">
    <el-aside width="200px">
      <el-main>
        
      </el-main>
    </el-aside>
  </div> -->
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import Menus from "./component/Menus.vue";
export default {
  name: "LayoutView",
  components: { Menus },
  setup() {
    const router = useRouter();
    function exitSys() {
      router.push("/login");
    }
    return { exitSys };
  },
};
</script>

<style scoped>
.el-header {
  display: flex;
  border-bottom: 1px solid #e8e8e8;
  align-items: baseline;
  justify-content: space-between;
}
.el-aside {
  border-right: 1px solid #e8e8e8;
  padding-top:80px;
}
/* .el-main{
  background-color: gray;
} */
.exit:hover {
  color: #0f72ef;
  cursor: pointer;
}
.title {
  color: #0f72ef;
  font-size: 24px;
  font-weight: bold;
  margin-top:20px;
}

</style>