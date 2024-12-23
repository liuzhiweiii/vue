<template>
  <div class="register-page">
    <div class="register-container">
      <h2>欢迎注册</h2>
      <el-form :model="registerForm" @submit.native.prevent="handleRegister">
        <el-form-item label="用户名" required>
          <el-input v-model="registerForm.loginName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input type="password" v-model="registerForm.loginPsw" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-button type="primary" native-type="submit">注册</el-button>
        <el-button type="primary" @click="goToLogin" class="login-link">已有账号？去登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import {register} from '@/api/sys/login'; // 引入注册 API

export default {
  data() {
    return {
      registerForm: {
        loginName: '',
        loginPsw: '',
      },
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await register(this.registerForm);
        alert(response.data.message || '注册成功'); // 假设响应中有 message 字段
        this.$router.push({
          path:'/login'
        }); // 注册成功后跳转
      } catch (error) {
        alert(error.response ? error.response.data : '注册失败');
      }
    },
    goToLogin() {
      this.$router.push({
        path:'/login/login'
      }); // 确保跳转到登录页面
    },
  },
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 视口高度的100% */
  background-color: #f5f5f5; /* 浅灰色背景 */
}

.register-container {
  width: 400px; /* 表单宽度 */
  padding: 20px; /* 内边距 */
  background-color: #fff; /* 白色背景 */
  box-shadow: 0 2px 8px 15px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  border-radius: 8px; /* 圆角边框 */
}

.register-container h2 {
  text-align: center; /* 文本居中 */
  margin-bottom: 20px; /* 下边距 */
}

.el-form-item {
  margin-bottom: 20px; /* 表单项下边距 */
}

.login-link {
  margin-top: 10px; /* 上边距 */
  float: right; /* 右浮动 */
}
</style>