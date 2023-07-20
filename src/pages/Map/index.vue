<template>
  <div class="amap-wrapper">
    <div id="Amap">
      <MyMap ref="mymap"></MyMap>
    </div>
  </div>
  <!-- <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="getAddress">保存</el-button>
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
      </span>
    </template> -->
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue'
import MyMap from '@/components/GoMap/index.vue'
import { onMounted } from 'vue';

export default defineComponent({
  name: 'app',
  components: { MyMap },
  setup() {
    const state = reactive({
      mymap: <any>(null)
    })
    // const { proxy } = getCurrentInstance();
    const funMethods = {
      getMap() {
        state.mymap.getAddress().then(res => {
          console.log(res);
        })
      }
    }
    const requestMethods = {}
    onMounted(() => {
      funMethods.getMap()
    })
    return {
      ...toRefs(state),
      ...funMethods,
      ...requestMethods
    }
  }
})

</script>
<style lang='scss' scoped></style>