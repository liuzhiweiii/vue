<template>
  <div class="add-brand">
    <div class="add-inner">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="商户id：">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="商户名称：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商户首字母：">
          <el-input v-model="form.intital"></el-input>
        </el-form-item>
        <el-form-item label="商户LOGO：">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                     :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="商户专区大图：">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                     :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="商户故事：">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
          </el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="是否显示：">
          <el-radio-group v-model="form.resource1">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商家制造商：">
          <el-radio-group v-model="form.resource2">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from '@/api/sys/merchant';
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource1: '是',
        resource2: '否',
        desc: '',
        fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
        textarea: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const response = await request({
              url: '/addMerchant',
              method: 'post',
              data: this.form
            });
            // 处理响应
            console.log(response.data);
            // 重置表单
            this.resetForm();
          } catch (error) {
            console.error('提交失败:', error);
          }
        } else {
          console.log('表单验证失败');
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
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
