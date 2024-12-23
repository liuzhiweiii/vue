<template>
  <div class="edit">
    <el-form ref="editForm" :model="editForm" status-icon :rules="editRules" label-width="100px" class="demo-editForm">
      <el-form-item label="商品名称" prop="goodsname">
        <el-input v-model="editForm.goodsname" />
      </el-form-item>
      <el-form-item label="商品图片" prop="goodsphoto">
        <el-input v-model="editForm.goodsphoto" />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model.number="editForm.price" />
      </el-form-item>
      <el-form-item label="标签" prop="label">
        <el-input v-model="editForm.label" />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-switch v-model="editForm.state" />
      </el-form-item>
      <!-- 添加上架状态复选框 -->
      <el-form-item label="上架" prop="isOnShelf">
        <el-checkbox v-model="editForm.isOnShelf" />
      </el-form-item>
      <!-- 添加新品状态复选框 -->
      <el-form-item label="新品" prop="isNew">
        <el-checkbox v-model="editForm.isNew" />
      </el-form-item>
      <!-- 添加推荐状态复选框 -->
      <el-form-item label="推荐" prop="isRecommended">
        <el-checkbox v-model="editForm.isRecommended" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitEditForm('editForm')">保存</el-button>
        <el-button @click="resetEditForm('editForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import goods from '@/api/sys/Updategoods' // 引入包含 updateGoods 函数的模块，假设你有对应的更新商品接口模块，这里按添加商品的引入方式类比修改了模块名，你可按实际情况调整
export default {
  data() {
    return {
      editForm: {
        goodsname: '',
        goodsphoto: '',
        price: null,
        label: '',
        state: false,
        isOnShelf: false,
        isNew: false,
        isRecommended: false
      },
      editRules: {
        goodsname: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goodsphoto: [
          { required: true, message: '请输入图片链接', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { pattern: /^\d+(\.\d{1,2})?$/, message: '请输入正确的价格格式（最多两位小数）', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value < 0) {
                callback(new Error('价格不能为负数'))
              } else {
                callback()
              }
            }, trigger: 'blur'
          }
        ],
        label: [
          { required: true, message: '请输入标签', trigger: 'blur' },
          { max: 50, message: '标签长度不能超过50个字符', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitEditForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          const formData = {
            ...this.editForm,
            state: this.editForm.state ? 1 : 0 // 将布尔值转换为整数
          }

          console.log('准备提交的更新数据:', formData)

          // 检查商品名称长度
          if (formData.goodsname.length > 50) {
            alert('商品名称长度不能超过50个字符')
            return
          }

          // 确保价格为数字并且符合格式（示例）
          const pricePattern = /^\d+(\.\d{1,2})?$/
          if (formData.price !== null && !pricePattern.test(formData.price.toString())) {
            alert('请输入正确的价格格式（最多两位小数）')
            return
          }

          try {
            const response = await goods.updateGoods(formData)
            console.log('更新成功', response.data)
            this.$message({
              message: '商品编辑成功',
              type: 'success'
            })
            // 假设这里有触发父组件刷新列表等相关逻辑，你可按实际需求添加，比如 this.$emit('refreshList')
            // 假设返回上一页等跳转逻辑，比如 this.$router.back()，按实际需求调整
          } catch (error) {
            console.error('更新失败:', error)
            if (error.response) {
              console.error('状态码:', error.response.status)
              console.error('错误信息:', error.response.data)
            } else if (error.request) {
              console.error('请求发送失败')
            } else {
              console.error('其他错误:', error.message)
            }
            alert('编辑失败，请检查控制台以获得更多错误信息')
          }
        } else {
          console.log('表单验证失败')
          return false
        }
      })
    },
    resetEditForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.demo-editForm {
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

.edit {
  margin-top: 100px;
}

.el-form-item {
  margin-bottom: 35px;
}
</style>
