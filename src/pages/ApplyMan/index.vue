<template>
  <el-form ref="formRef" :model="form" label-width="120px" class="demo-dynamic">
    <el-form-item prop="email" label="邮箱" :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur', },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'], },
    ]">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item v-for="(domain, index) in form.domains" :key="domain.key" :label="'应用' + (index + 1)"
      :prop="'domains.' + index + '.value'" :rules="{ required: true, message: '应用不能为空', trigger: 'blur' }">
      <div class="content">
        <el-input v-model="domain.value" />
        <el-button class="mt-2" @click.prevent="removeDomain(domain)">删除</el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button @click="addDomain">新增应用</el-button>
      <el-button type="primary" @click="submitForm(formRef)">提交</el-button>
      <el-button @click="resetForm(formRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang='ts'>
import { defineComponent, toRefs, reactive, ref, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'

// const formRef = ref<FormInstance>()
export default defineComponent({
  name: 'app',
  setup() {
    interface DomainItem {
      key: number
      value: string
    }

    const state = reactive<{
      form: {
        domains: DomainItem[]
        email: string
      },
      formRef: any
    }>({
      form: {
        domains: [
          { key: 1, value: '', },
        ],
        email: ''
      },
      formRef: null,
    })

    const funMethods = {
      removeDomain(item: DomainItem) {
        const index = state.form.domains.indexOf(item)
        if (index !== -1) {
          state.form.domains.splice(index, 1)
        }
      },
      addDomain() {
        state.form.domains.push({
          key: Date.now(),
          value: '',
        })
      },
      submitForm(formEl?: FormInstance | undefined) {
        if (!formEl) return
        formEl.validate((valid) => {
          if (valid) {
            console.log('提交!')
          } else {
            console.log('错误提交!')
            return false
          }
        })
      },
      resetForm(formEl?: FormInstance | undefined) {
        if (!formEl) return
        formEl?.resetFields()
      }
    }
    const requestMethods = {}

    onMounted(() => {
      // for (var i = 0; i < 10; i++) {
      //   setTimeout(() => {
      //     console.log('这是输出=====>', i);
      //   }, 1000)
      // }  // var 10个10，let 0-9
    })
    return {
      ...toRefs(state),
      ...funMethods,
      ...requestMethods
    }
  }
})

</script>
<style lang='scss' scoped>
.content {
  display: flex;
}
</style>