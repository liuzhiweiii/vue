<template>
  <div class="app-menuForm">
    <el-form :model="menu" :rules="rules" ref="form" label-width="120px">
      <div class="header">
        <h2>添加菜单</h2>
      </div>
      <el-form-item label="菜单ID" prop="id" required>
        <el-input v-model="menu.id" placeholder="请输入菜单ID"></el-input>
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
        <el-button type="primary" @click="addMenu">提交</el-button>
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
        frontendName: 'vun',
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
  methods: {
    async addMenu() {
      try {
        await this.$refs.form.validate();
        const formData = new FormData();
        formData.append('id', this.menu.id);
        formData.append('menuName', this.menu.menuName);
        formData.append('menuLevel', this.menu.menuLevel);
        formData.append('frontendName', this.menu.frontendName);
        formData.append('displayOrder', this.menu.displayOrder);
        formData.append('isVisible', this.menu.isVisible);

        const response = await axios.post("http://localhost:8080/insert", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data && response.data.success) {
          this.$message.success('菜单添加成功');
          this.resetForm(); // 重置表单
          this.goToMenuList(); // 跳转到菜单列表
        } else {
          this.$message.error('添加菜单失败');
        }
      } catch (error) {
        this.$message.error('表单验证失败，或请求失败');
        console.error('Error adding menu:', error);
      }
    },
    resetForm() {
      this.menu = {
        id: null,
        menuName: '',
        menuLevel: '二级',
        frontendName: 'vun',
        displayOrder: 0,
        isVisible: 0
      };
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