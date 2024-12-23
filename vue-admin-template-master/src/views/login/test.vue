<template>
  <div class="login-page">
    <div class="login-container">
      <div class="title">
        <p>欢迎来到电商一体化管理平台</p>
      </div>
      <div class="title-container">
        <h2 class="title" style="text-align: center;">欢迎登录</h2>
      </div>
      <el-form :model="loginForm" ref="loginForm" @submit.native.prevent="handleLogin">
        <el-form-item label="用户名" required>
          <el-input v-model="loginForm.loginName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input type="password" v-model="loginForm.loginPsw" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="验证码" required>
          <div class="captcha-container">
            <el-input v-model="captcha" placeholder="请输入验证码"></el-input>
            <img :src="captchaImageUrl" alt="验证码" @click="refreshCaptcha" class="captcha-image" />
          </div>
        </el-form-item>
        <el-button type="primary" native-type="submit">登录</el-button>
        <el-button type="primary" @click="goToRegister">暂无账号？去注册</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loginForm: {
        loginName: '',
        loginPsw: '',
      },
      captcha: '',
      captchaImageUrl: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post("http://localhost:8080/api/login", {
         loginName: this.loginForm.loginName,
         loginPsw: this.loginForm.loginPsw,
         captcha: this.captcha,
       });

       if (response.status === 200) {
          alert(response.data.message || '登录成功'); // 显示成功消息
          this.$router.push('/dashboard'); // 登录成功后跳转
        } else {
          alert(response.data.message || '登录失败');
        }
     } catch (error) {
        const message = error.response ? error.response.data.message : '请求失败';
        alert(message);
      }
    },
    refreshCaptcha() {
      this.captchaImageUrl = `/api/captcha?loginName=${this.loginForm.loginName}&_=${Date.now()}`;
    },
    goToRegister() {
      this.$router.push({ path: '/register' });
    },
  },
  mounted() {
    this.refreshCaptcha(); // 初始化验证码
  },
};
</script>

<style scoped>
.login-page {
  background-image: url('login.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.captcha-container {
  display: flex;
  align-items: center;
}

.captcha-image {
  margin-left: 10px;
  cursor: pointer;
  width: 100px;
  height: auto;
}
</style>
