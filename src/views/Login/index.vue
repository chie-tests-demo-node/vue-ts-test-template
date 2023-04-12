<template>
  <div :class="$style.login">
    <div :class="$style.loginSmall">
      <h1 :class="$style.title">密码服务平台CCSP (租户管理端) </h1>
      <img :class="$style.imgStyle" src="../../assets/background/swxa-logo-m.png" />
      <div :class="$style.formLogin">
        <h2 :class="$style.titleSize">口令登录</h2>
        <el-form :model="form" label-width="120px">
          <el-form-item>
            <el-input v-model="form.identi" placeholder="租户标识" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.account" placeholder="账号" />
          </el-form-item>
          <el-form-item>
            <el-input show-password type="password" v-model="form.password" placeholder="密码" />
          </el-form-item>
          <el-form-item>
            <el-input show-password type="password" v-model="form.verCode" placeholder="验证码" />
          </el-form-item>
        </el-form>
        <el-button :class="$style.loginButton" type="primary" @click="Login">登录</el-button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  setup() {
    const router = useRouter();
    const form = reactive({
      identi: '',
      account: '',
      password: '',
      verCode: '',
    })
    function Login() {
      if (!form.account) {
        return ElMessage.error("密码不能为空");
      }
      router.push("/home");
      console.log("登录啦", form);
      return ElMessage.success("登录成功");
    }
    return { Login, form };
  }
};
</script>

<style module>
.login {
  display: flex;
  /* min-width: 100%; */
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-size: 100% 100%;
  background-image: url("../../assets/login/login-bg.png");
}

.titleSize {
  font-size: 20px;
}

.loginSmall {
  height: 80vh;
  width: 60vw;
  background-size: 100% 100%;
  background-image: url("../../assets/login/login-bg-s.png");
  position: relative;
}

.title {
  color: #fff;
  margin-left: 40%;
  margin-top: 60px;
}

.imgStyle {
  margin-left: 22%;
  margin-top: 48px;
}

.formLogin {
  position: absolute;
  right: 20%;
  top: 160px;
  text-align: center;
}

.loginButton {
  height: 45px;
  width: 275px;
  margin-top: 42px;
  margin-left: 44px;
  background-color: #0f72ef;
  border-radius: 6px;
  opacity: 1;
}
</style>

