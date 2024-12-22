<template>
  <div class="add">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品ID" prop="goodsid">
        <el-input v-model.number="ruleForm.goodsid"></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="goodsname">
        <el-input v-model="ruleForm.goodsname"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="image">
        <el-upload
          class="upload-demo"
          action=""
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          :show-file-list="false"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
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
  export default {
    data() {
      return {
        ruleForm: {
          goodsid: '',
          goodsname: '',
          price: '',
          label: '',
          state: false,
          image: ''
        },
        rules: {
          goodsid: [
            { required: true, message: '请输入商品ID', trigger: 'blur' }
          ],
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
          ],
          image: [
            { required: true, message: '请上传商品图片', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleSuccess(response, file, fileList) {
        // Handle the success callback from the upload
        this.ruleForm.image = response.url; // Assuming the server returns the URL of the uploaded file
      },
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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

