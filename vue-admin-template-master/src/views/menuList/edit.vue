<template>
  <div class="app-menuForm">
    <el-form :model="menu" :rules="rules" ref="form" label-width="120px">
      <div class="header">
        <h2>编辑菜单</h2>
      </div>
      <el-form-item label="菜单ID" prop="id" required>
        <el-input v-model="menu.id" placeholder="请输入菜单ID"></el-input> <!-- ID可以修改 -->
      </el-form-item>
      <el-form-item label="菜单名称" prop="menuName" required>
        <el-input v-model="menu.menuName" placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="菜单级数" prop="menuLevel" required>
        <el-select v-model="menu.menuLevel" placeholder="请选择菜单等级" required>
          <el-option label="一级" value="一级"/>
          <el-option label="二级" value="二级"/>
        </el-select>
      </el-form-item>
      <el-form-item label="前端名称" prop="frontendName" required>
        <el-input v-model="menu.frontendName" placeholder="请输入前端名称"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="displayOrder" required>
        <el-input-number v-model="menu.displayOrder" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="是否显示" prop="isVisible" required>
        <el-switch v-model="menu.isVisible" :active-value="1" :inactive-value="0"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateMenu">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="default" @click="goToMenuList" class="return-list-button">返回数据列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      menu: {
        id: null,
        menuName: '',
        menuLevel: '二级',
        frontendName: '',
        displayOrder: 0,
        isVisible: 0
      },
      rules: {
        id: [{ required: true, message: '请输入菜单ID', trigger: 'blur' }],
        menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        frontendName: [{ required: true, message: '请输入前端名称', trigger: 'blur' }],
        displayOrder: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        isVisible: [{ required: true, message: '请选择是否显示', trigger: 'change' }]
      }
    };
  },
  created() {
    this.fetchMenuData();
  },
  methods: {
    async fetchMenuData() {
      const id = this.$route.query.id; // 获取要编辑的菜单ID
      try {
        const response = await axios.get(`http://localhost:8080/findById/${id}`);

        if (response.data && response.data.menuItem) {
          this.menu = { ...response.data.menuItem }; // 将数据填充到表单
        } else {
        }
      } catch (error) {
        console.error('Error fetching menu data:', error);
        this.$message.error('请求失败，请稍后重试');
      }
    },
    async updateMenu() {
      try {
        await this.$refs.form.validate();
        
        const response = await axios.put("http://localhost:8080/updateMenu", this.menu);
        
        if (response.data.success) {
          this.$message.success('菜单更新成功');
          this.resetForm();
          this.goToMenuList();
        } else {
          this.$message.error('更新菜单失败');
        }
      } catch (error) {
        console.error('Error updating menu:', error);
        this.$message.error('表单验证失败，或请求失败');
      }
    },
    resetForm() {
      this.fetchMenuData(); // 重新获取菜单数据以重置表单
      this.$refs.form.resetFields();
    },
    goToMenuList() {
      this.$router.push({ path: '/menuList' });
    }
  }
};
</script>

<style scoped>
.app-menuForm {
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa; /* 整体背景色 */
}

.el-form {
  width: 80%;
  max-width: 600px; /* 控制表单容器宽度 */
  background: #ffffff; /* 背景色 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 阴影 */
  padding: 30px; /* 内边距 */
}
.return-list-button {
  position: absolute;
  right: -18px; /* 根据需要调整距离 */
  bottom: -40px; /* 根据需要调整距离 */
}
</style>
