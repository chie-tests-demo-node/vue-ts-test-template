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
  <el-upload v-model:file-list="fileList" class="upload-demo"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple :on-preview="handlePreview"
    :on-remove="handleRemove" :before-remove="beforeRemove" :limit="3" :on-exceed="handleExceed">
    <el-button type="primary">点击上传文件</el-button>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png 限制为500kb以内.
      </div>
    </template>
  </el-upload>
</template>

<script lang='ts'>
import { defineComponent, toRefs, reactive, onMounted, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'

export default defineComponent({
  name: 'app',
  setup() {
    interface DomainItem {
      key: number
      value: string
    }

    const fileList = ref<UploadUserFile[]>([
      {
        name: 'element-plus-logo.svg',
        url: 'https://element-plus.org/images/element-plus-logo.svg',
      },
      {
        name: 'element-plus-logo2.svg',
        url: 'https://element-plus.org/images/element-plus-logo.svg',
      },
    ])

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
      },
    }

    // 上传文件
    const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
      console.log(file, uploadFiles)
    }

    const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
      console.log(uploadFile)
    }

    const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
      ElMessage.warning(
        `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
        } totally`
      )
    }

    const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
      return ElMessageBox.confirm(
        `Cancel the transfer of ${uploadFile.name} ?`
      ).then(
        () => true,
        () => false
      )
    }
    const requestMethods = {}

    onMounted(() => {
      // for (var i = 0; i < 10; i++) {
      //   setTimeout(() => {
      //     console.log('这是输出=====>', i);
      //   }, 1000)
      // }  // var 10个10，let 0-9
      const a = [1]
      // console.log(typeof a);
    })
    return {
      ...toRefs(state),
      ...funMethods,
      ...requestMethods,
      fileList,
      handleRemove,
      handlePreview,
      handleExceed,
      beforeRemove,
    }
  }
})

</script>
<style lang='scss' scoped>
.content {
  display: flex;
}
</style>