<template>
  <div class="edit-goods-container">
    <el-form ref="editForm" :model="editFormData" status-icon :rules="editRules" label-width="100px" class="demo-editForm">
      <el-form-item label="商品名称" prop="goodsname">
        <el-input v-model="editFormData.goodsname" />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model.number="editFormData.price" />
      </el-form-item>
      <el-form-item label="标签" prop="label">
        <el-input v-model="editFormData.label" />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-switch v-model="editFormData.state" />
      </el-form-item>
      <!-- 添加上架状态复选框 -->
      <el-form-item label="上架" prop="isOnShelf">
        <el-checkbox v-model="editFormData.isOnShelf" />
      </el-form-item>
      <!-- 添加新品状态复选框 -->
      <el-form-item label="新品" prop="isNew">
        <el-checkbox v-model="editFormData.isNew" />
      </el-form-item>
      <!-- 添加推荐状态复选框 -->
      <el-form-item label="推荐" prop="isRecommended">
        <el-checkbox v-model="editFormData.isRecommended" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitEditForm('editForm')">保存</el-button>
        <el-button @click="cancelEdit">取消</button>
        </el-button></el-form-item>
    </el-form>
  </div>
</template>

<script>
import goodsApi from '@/api/sys/goods'
import router from '@/router' // 引入路由实例，用于返回上一页等操作

export default {
  data() {
    return {
      editFormData: {
        goodsname: '',
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
  created() {
    // 从路由参数中获取传递过来的商品数据，并赋值给编辑表单数据对象
    const goodsData = this.$route.params.goodsData
    if (goodsData) {
      this.editFormData = {
        ...goodsData
      }
    }
  },
  methods: {
    submitEditForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          const formData = {
            ...this.editFormData,
            state: this.editFormData.state ? 1 : 0
          }
          try {
            const response = await goodsApi.updateGoods(formData)
            if (response.success) {
              router.back() // 编辑成功后返回上一页（商品列表页）
            } else {
              console.error('保存商品数据失败')
            }
          } catch (error) {
            console.error('保存商品数据失败:', error)
          }
        }
      })
    },
    cancelEdit() {
      router.back() // 取消编辑时返回上一页（商品列表页）
    }
  }
}
</script>

<style scoped>
.edit-goods-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 100px;
}

.demo-editForm {
  width: 100%;
}

.el-form-item {
  margin-bottom: 35px;
}
</style>
