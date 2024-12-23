<template>
  <div class="add-brand">
    <div class="add-inner">
      <el-form ref="form" :model="form" :rules="addMerchantRules" label-width="150px">
        <el-form-item label="商户id：" prop="merchantId">
          <el-input v-model="form.merchantId"></el-input>
        </el-form-item>
        <el-form-item label="商户名称：" prop="merchantName">
          <el-input v-model="form.merchantName"></el-input>
        </el-form-item>
        <el-form-item label="商户首字母：">
          <el-input v-model="form.merchantIntital"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="form.merchantRanking"></el-input>
        </el-form-item>
        <el-form-item label="是否显示：">
          <el-radio-group v-model="form.merchantShow">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitUpdateMerchatForm">更新商户</el-button>
          <el-button @click="handleMechant">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import merchant from '@/api/sys/merchant';
export default {
  data() {
    return {
      form: {
        merchantId: '',
        merchantName: '',
        merchantIntital: '',
        merchantCorrelation: '',
        merchantRanking: '',
        merchantShow: 0, // 默认显示
        // merchantLogo: '', // 上传的logo
        // merchantPicture: '' // 上传的专区大图
      },
      addMerchantRules: {
        merchantId: [
          { required: true, message: '请输入商户ID', trigger: 'blur' }
        ],
        merchantName: [
          { required: true, message: '请输入商户名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const merchantId = this.$route.query.id; // 获取商户ID
    console.log(merchantId)
    if (merchantId) {
      this.getMerchantDetails(merchantId);
    }
  },
  methods: {
    async getMerchantDetails(merchantId) {
      try {
        const res = await merchant.getMerchantById(merchantId);
        const data = res.data;
        console.log(data)
        // 逐个字段填充表单数据
        this.form.merchantId = data.merchants.merchantId;
        this.form.merchantName = data.merchants.merchantName;
        this.form.merchantIntital = data.merchants.merchantIntital;
        this.form.merchantRanking = data.merchants.merchantRanking;
        this.form.merchantShow = data.merchants.merchantShow === 0 ? '0' : '1';
      } catch (error) {
        console.error('获取商户详情失败:', error);
      }
    },
    submitUpdateMerchatForm() {
      this.$refs.form.validate((valid) => {
        this.form.merchantShow = this.form.merchantShow === true ? 1 : 0;

        if (valid) {
          const updatedMerchant = {
            merchantId: this.form.merchantId,
            merchantName: this.form.merchantName,
            merchantIntital: this.form.merchantIntital,
            merchantCorrelation: this.form.merchantCorrelation,
            merchantRanking: this.form.merchantRanking,
            merchantShow: this.form.merchantShow,
          };

          console.log("Request data:", updatedMerchant);
          merchant.updateMerchant(updatedMerchant)
            .then((res) => {
              if (res.success) {
                this.$message({ message: "商户更新成功", type: "success" });
                this.handleMechant(); // 处理返回商户列表
              } else {
                this.$message.error(res.message || "商户更新失败");
              }
            })
            .catch((error) => {
              console.error("更新商户时发生错误:", error);
              this.$message.error("更新商户时发生错误，请检查网络连接或稍后再试。");
            });
        } else {
          this.$message.error("表单验证未通过，请检查输入的数据。");
        }
      });
    },
    handleMechant() {
      this.$router.push({ path: '/merchant/index' });
    }
  }
}
</script>

<style scoped>
.add-brand {
  margin-top: 50px;
  margin-right: 200px;
  margin-left: 200px;
  margin-bottom: 50px;
  padding: 50px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.add-inner {
  padding: 10px;
  margin-right: 30px;
}

/* 设置表单项标签的宽度 */
.el-form-item__label {
  width: 150px !important;
}

/* 输入框样式 */
.el-input,
.el-textarea {
  width: 100%;
}

/* 按钮样式 */
.el-button {
  margin-top: 10px;
}

.el-button--primary {
  background-color: #409eff;
  border-color: #409eff;
}

.el-button--primary:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

/* 上传图片按钮样式 */
.upload-demo {
  margin-bottom: 10px;
}

/* 提交与重置按钮布局 */
.el-form-item:last-child {
  text-align: right;
}

/* 商户故事文本区域 */
.el-textarea__inner {
  height: 100px;
}

/* 当输入框获得焦点时的样式 */
.el-input__inner:focus,
.el-textarea__inner:focus {
  border-color: #409eff;
}

/* 放大查看图片预览的样式 */
.image-preview {
  max-width: 100%;
  cursor: zoom-in;
}

/* 图片列表项之间的间距 */
.el-upload-list__item {
  margin-bottom: 10px;
}
</style>
