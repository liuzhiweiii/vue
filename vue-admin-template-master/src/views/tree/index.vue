<template>
  <div class="add">
    <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品名称" prop="goodsname">
        <el-input v-model="ruleForm.goodsname" />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model.number="ruleForm.price" />
      </el-form-item>
      <el-form-item label="标签" prop="label">
        <el-input v-model="ruleForm.label" />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-switch v-model="ruleForm.state" />
      </el-form-item>
      <!-- 添加上架状态复选框 -->
      <el-form-item label="上架" prop="isOnShelf">
        <el-checkbox v-model="ruleForm.isOnShelf" />
      </el-form-item>
      <!-- 添加新品状态复选框 -->
      <el-form-item label="新品" prop="isNew">
        <el-checkbox v-model="ruleForm.isNew" />
      </el-form-item>
      <!-- 添加推荐状态复选框 -->
      <el-form-item label="推荐" prop="isRecommended">
        <el-checkbox v-model="ruleForm.isRecommended" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import goods from '@/api/sys/Addgoods' // 引入包含 addGoods 函数的模块
export default {
  data() {
    return {
      ruleForm: {
        goodsname: '',
        price: null,
        label: '',
        state: false,
        isOnShelf: false,
        isNew: false,
        isRecommended: false // 默认不勾选
      },
      rules: {
        goodsname: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { pattern: /^\d+(\.\d{1,2})?$/, message: '请输入正确的价格格式（最多两位小数）', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value < 0) {
              callback(new Error('价格不能为负数'))
            } else {
              callback()
            }
          }, trigger: 'blur' }
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
    async submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          const formData = {
            ...this.ruleForm,
            state: this.ruleForm.state ? 1 : 0 // 将布尔值转换为整数
          }

          console.log('准备提交的数据:', formData) // 输出待提交数据

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
          goods.addGoods(formData).then((res) => {
            console.log('添加成功', res.dat)
          }).catch((error) => {
            if (error.response) {
              console.error('状态码:', error.response.status)
              console.error('错误信息:', error.response.data)
            }
          })

          // try {
          //   const response = await goods.addGoods(formData)
          //   console.log('商品名称:', formData.goodsname)
          //   console.log('价格:', formData.price)
          //   console.log('标签:', formData.label)
          //   console.log('状态:', formData.state)
          //   console.log('上架:', formData.isOnShelf)
          //   console.log('新品:', formData.isNew)
          //   console.log('推荐:', formData.isRecommended)
          //   console.log('响应数据:', response)
          //   alert('商品添加成功')
          // } catch (error) {
          //   console.error('提交失败:', error)
          //   if (error.response) {
          //     console.error('服务器响应错误:', error.response.data)
          //   } else if (error.request) {
          //     console.error('请求发送失败:', error.request)
          //   } else {
          //     console.error('其他错误:', error.message)
          //   }
          //   alert('提交失败，请检查控制台以获得更多错误信息')
          // }
        } else {
          console.log('表单验证失败')
          return false
        }
      })
    }
  },
  resetForm(formName) {
    this.$refs[formName].resetFields()
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
