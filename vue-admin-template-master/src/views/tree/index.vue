<!--<script src="../../api/sys/Addgoods.js"></script>-->
<template>
  <div class="add">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品名称" prop="goodsname">
        <el-input v-model="ruleForm.goodsname"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model.number="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="label">
        <el-input v-model="ruleForm.label"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-switch v-model="ruleForm.state"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import goods from '@/api/sys/Addgoods'; // 引入包含 addGoods 函数的模块
  export default {
    data() {
      return {
        ruleForm: {
          goodsname: '',
          price: null,
          label: '',
          state: false, // 默认不勾选
        },
        rules: {
          goodsname: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入价格', trigger: 'blur' }
          ],
          label: [
            { required: true, message: '请输入标签', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '请选择状态', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      async submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let formData = {
              ...this.ruleForm,
              state: this.ruleForm.state ? 1 : 0 // 将布尔值转换为整数
            };

            console.log("获取的数据", formData);

            try {
              const response = await goods.addGoods(formData); // 使用 goods 模块中的 addGoods 函数
              console.log("响应数据:", response); // 打印响应数据
              alert('商品添加成功');
            } catch (error) {
              console.error('提交失败:', error);
              if (error.response) {
                console.error('服务器响应错误:', error.response.data);
              } else if (error.request) {
                console.error('请求发送失败:', error.request);
              } else {
                console.error('其他错误:', error.message);
              }
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>


<style scoped>
  .demo-ruleForm {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    margin-left: 200px;
  }

  body {
    display: flex;
    align-items: center;
    height: 100vh;
  }

  .add {
    margin-top: 100px;
  }

  .el-form-item {
    margin-bottom: 35px;
  }
</style>
