<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="exit" @click="exitFun">退出</div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-active="'/testmap'">
            <el-menu-item v-for="item in getMenus" :key="item.path" :index="item.path" @click="toMenu(item.path)">
              {{ item.name }}
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang='ts'>
import { reidrect } from '@/router';
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from "vue-router";
export default defineComponent({
  name: 'app',
  setup() {
    const router = useRouter();
    const state = reactive({
      getMenus: [
        { path: '/testmap', name: '测试地址' },
        { path: '/appMan', name: '应用管理' },
      ]
    })
    const funMethods = {
      toMenu: (path: string) => {
        router.push(path).catch(() => {
          reidrect(path);
        });
      },
      exitFun() {
        reidrect('/login')
      }
    }
    const requestMethods = {}
    // onMounted(() => {
    //   reidrect('/testmap')
    // })
    return {
      ...toRefs(state),
      ...funMethods,
      ...requestMethods
    }
  }
})

</script>
<style lang='scss' scoped>
.el-header {
  background-color: #252b48;
  height: 50px;
  width: 100%;
  color: #fff;

  .exit {
    text-align: right;
    line-height: 50px;

    &:hover {
      cursor: pointer;
    }
  }
}

.el-menu {
  border-right: none;
}

.el-aside {
  background-color: #fff;
  border-right: 1px solid #f0f1f2;
  height: calc(100vh - 50px);
  padding-top: 20px;
  box-shadow: 0 2px 6px 0 rgba(230, 216, 255, 0.5);

  .el-menu-item {
    height: 40px;
    margin-top: 4px;
  }

  .el-menu-item.is-active,
  .el-menu-item.is-active:hover {
    color: #1677ff;
    background-color: #e6f4ff;
    border-radius: 12px;
  }

  .el-menu-item:hover {
    background-color: #f0f0f0;
    color: #1d1d1d;
    border-radius: 12px;
  }
}
</style>