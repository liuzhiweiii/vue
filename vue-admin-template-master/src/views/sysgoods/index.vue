<template>
  <div>
    <h3>筛选搜索</h3>
    <input type="text" placeholder="商品名称" v - model="productName">
    <input type="text" placeholder="商品货号" v - model="productCode">
    <select v - model="productCategory">
      <option value="">请选择</option>
      <!-- 这里可以动态添加商品分类选项 -->
    </select>
    <select v - model="productBrand">
      <option value="">请选择品牌</option>
      <!-- 这里可以动态添加商品品牌选项 -->
    </select>
    <select v - model="onShelfStatus">
      <option value="">全部</option>
      <option value="onShelf">已上架</option>
      <option value="offShelf">已下架</option>
    </select>
    <select v - model="auditStatus">
      <option value="">全部</option>
      <option value="audited">已审核</option>
      <option value="unAudited">未审核</option>
    </select>
    <button @click="resetFilters">重置</button>
    <button @click="searchResults">查询结果</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productName: '',
      productCode: '',
      productCategory: '',
      productBrand: '',
      onShelfStatus: '',
      auditStatus: ''
    }
  },
  methods: {
    resetFilters() {
      // 重置所有筛选条件
      this.productName = ''
      this.productCode = ''
      this.productCategory = ''
      this.productBrand = ''
      this.onShelfStatus = ''
      this.auditStatus = ''
    },
    searchResults() {
      // 这里可以添加查询结果的逻辑，目前只是方法定义
      console.log('查询结果', this.productName, this.productCode, this.productCategory, this.productBrand, this.onShelfStatus, this.auditStatus);
    }
  }
}
</script>

<style scoped>
div {
  border: 1px solid #ccc;
  padding: 10px;
}
input, select {
  margin: 5px;
}
button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 5px;
}
</style>
