<template>
  <div class="container">
    <!-- 筛选搜索 -->
    <div class="filter-search">
      <div class="header">
        <h3>筛选搜索</h3>
        <div class="button-group">
          <button type="button" @click="resetFilters">重置</button>
          <button type="button" @click="searchResults">查询结果</button>
        </div>
      </div>
      <!-- 表单 -->
      <form class="form-grid">
        <!-- 输入搜索 -->
        <div class="input-group">
          <label for="product-name">商品名称:</label>
          <input id="product-name" v-model="goodsname" placeholder="商品名称">
        </div>
        <!-- 商品货号 -->
        <div class="input-group">
          <label for="product-code">商品货号:</label>
          <input id="product-code" v-model="goodsid" placeholder="商品货号">
        </div>
        <!-- 商品分类 -->
        <div class="input-group">
          <label for="product-category">商品分类:</label>
          <select id="product-category" v-model="productCategory">
            <option value="">请选择</option>
            <!-- 这里可以添加具体的分类选项 -->
          </select>
        </div>
        <!-- 商品品牌 -->
        <div class="input-group">
          <label for="product-brand">商品品牌:</label>
          <select id="product-brand" v-model="productBrand">
            <option value="">请选择品牌</option>
            <!-- 这里可以添加具体的品牌选项 -->
          </select>
        </div>
        <!-- 上架状态 -->
        <div class="input-group">
          <label for="on-shelf-status">上架状态:</label>
          <select id="on-shelf-status" v-model="onShelfStatus">
            <option value="">全部</option>
            <option value="onShelf">已上架</option>
            <option value="offShelf">已下架</option>
          </select>
        </div>
        <!-- 审核状态 -->
        <div class="input-group">
          <label for="audit-status">审核状态:</label>
          <select id="audit-status" v-model="auditStatus">
            <option value="">全部</option>
            <option value="audited">已审核</option>
            <option value="unAudited">未审核</option>
          </select>
        </div>
      </form>
    </div>
    <!-- 数据添加框 -->
    <div class="add-goods-box">
      <header class="add-goods-header">
        <h2>数据列表</h2>
        <button type="button" @click="handleAdd">添加</button>
      </header>
    </div>
    <!-- 商品列表 -->
    <div class="goods-container">
      <div class="goods-list">
        <table>
          <thead>
          <tr>
            <th>编号</th>
            <th>商品图片</th>
            <th>商品名称</th>
            <th>价格</th>
            <th>标签</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in currentGoodsList" :key="item.goodsid">
            <td>{{ item.goodsid }}</td>
            <td><img :src="item.goodsphoto" alt="商品图片" class="goods-list-img"></td>
            <td>{{ item.goodsname }}</td>
            <td>{{ item.price }}</td>
            <td class="status-column">
              <div class="tag-switches">
                <!-- 上架 -->
                <div class="switch-item">
                  <span class="custom-label on-shelf">上架</span>
                  <el-switch
                    v-model="item.isOnShelf"
                    :active-value="true"
                    :inactive-value="false"
                    @change="updateTag(item, 'isOnShelf')"
                  />
                </div>
                <!-- 新品 -->
                <div class="switch-item">
                  <span class="custom-label">新品</span>
                  <el-switch
                    v-model="item.isNew"
                    :active-value="true"
                    :inactive-value="false"
                    @change="updateTag(item, 'isNew')"
                  />
                </div>
                <!-- 推荐 -->
                <div class="switch-item">
                  <span class="custom-label">推荐</span>
                  <el-switch
                    v-model="item.isRecommended"
                    :active-value="true"
                    :inactive-value="false"
                    @change="updateTag(item, 'isRecommended')"
                  />
                </div>
              </div>
            </td>
            <td>{{ item.state ? '已审核' : '未审核' }}</td>
            <td>
              <button @click="editGoods(item.goodsid)">编辑</button>
              <button @click="deleteGoods(item.goodsid)">删除</button>
            </td>
          </tr>
          </tbody>
        </table>
        <!-- 分页组件 -->
        <div class="pagination-container">
          <span>共 {{ totalItems }} 条</span>
          <el-select v-model="pageSize" @change="handlePageSizeChange">
            <el-option label="5条/页" value="5" />
            <el-option label="10条/页" value="10" />
            <el-option label="20条/页" value="20" />
          </el-select>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="totalItems"
            :current-page.sync="currentPage"
            :page-size="parseInt(pageSize)"
            @current-change="handlePageChange"
          />
          <el-input
            v-model="jumpPage"
            placeholder="前往"
            style="width: 60px; margin-left: 10px;"
          >
            <template #append>
              <el-button icon="el-icon-arrow-right" @click="jumpToPage" />
            </template>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import goodsApi from '@/api/sys/goods'
export default {
  data() {
    return {
      goodsname: '',
      goodsid: '',
      goodsphoto: '',
      state: '', // 商品状态 (true: 已审核, false: 未审核)
      productCategory: '',
      productBrand: '',
      onShelfStatus: '',
      auditStatus: '',
      currentPage: 1, // 当前页码
      pageSize: 5, // 每页固定显示的条目数，设置为5
      totalItems: 0, // 总条目数
      goodsList: [], // 所有商品的数据
      currentGoodsList: [], // 当前页面的商品数据
      jumpPage: '', // 前往页码
      isLoading: true
    }
  },
  created() {
    this.searchResults() // 组件创建后立即获取商品列表
  },
  methods: {
    handleAdd() {
      this.$router.push({ name: 'Tree' })
    },
    resetFilters() {
      this.goodsname = ''
      this.goodsid = ''
      this.state = ''
      this.goodsphoto = ''
    },
    searchResults() {
      // 构建查询参数
      const queryParams = {
        goodsid: this.goodsid ? parseInt(this.goodsid, 10) : undefined,
        goodsname: this.goodsname || undefined,
        productCategory: this.productCategory || undefined,
        productBrand: this.productBrand || undefined,
        onShelfStatus: this.onShelfStatus === '' ? undefined : this.onShelfStatus,
        auditStatus: this.auditStatus === '' ? undefined : this.auditStatus,
        currentPage: 1,
        pageSize: this.pageSize
      }

      // 清除旧的状态
      this.currentGoodsList = []

      // 发送查询请求
      goodsApi.getGoodsList(queryParams).then(response => {
        if (response.success && response.data) {
          // 根据查询条件过滤数据
          let filteredGoods = response.data.goods
          if (queryParams.goodsid) {
            filteredGoods = filteredGoods.filter(good => good.goodsid === queryParams.goodsid)
          }
          if (queryParams.goodsname) {
            filteredGoods = filteredGoods.filter(good => good.goodsname.includes(queryParams.goodsname))
          }
          // 此处可继续添加对其他查询条件的过滤逻辑
          // 确保商品数据中的标签属性存在且有默认值
          filteredGoods.forEach(good => {
            good.isNew = good.is_new === undefined ? true : good.isNew
            good.isRecommended = good.is_recommended === undefined ? true : good.isRecommended
            good.isOnShelf = good.is_on_shelf === undefined ? true : good.isOnShelf
            // 确保商品图片数据存在
            good.goodsphoto = good.goodsphoto || ''
          })

          this.goodsList = filteredGoods
          this.totalItems = response.data.total || this.goodsList.length
          this.handlePageChange(1)
        } else {
          console.error('无效的响应数据')
        }
      }).catch(error => {
        console.error('查询商品列表失败:', error)
        alert('查询失败，请稍后再试')
      })
    },
    handlePageChange(page) {
      this.currentPage = page
      const start = (page - 1) * this.pageSize
      const end = start + this.pageSize
      this.currentGoodsList = this.goodsList.slice(start, end)
    },
    handlePageSizeChange(size) {
      this.pageSize = size
      this.currentPage = 1
      this.handlePageChange(1)
    },
    jumpToPage() {
      const page = parseInt(this.jumpPage, 10)
      if (!isNaN(page) && page > 0 && page <= Math.ceil(this.totalItems / this.pageSize)) {
        this.currentPage = page
        this.handlePageChange(page)
      } else {
        alert('请输入有效的页码')
      }
    },
    editGoods(goodsId) {
      // 编辑商品的逻辑
    },
    deleteGoods(goodsId) {
      if (confirm('确定要删除该商品吗？')) {
        request({
          url: `/goods/${goodsId}`,
          method: 'delete'
        }).then(response => {
          if (response.success) {
            alert('删除成功')
            this.searchResults() // 删除成功后重新加载商品列表
          } else {
            alert('删除失败，请稍后再试')
          }
        }).catch(error => {
          console.error('删除商品失败:', error)
          alert('删除失败，请检查网络连接或稍后再试')
        })
      }
    },
    updateTag(item, tag) {
      // 更新商品标签状态的逻辑
      const payload = { [tag]: item[tag] }

      console.log('Updating tag:', item.goodsid, payload) // 打印请求参数

      if (!item || !item.goodsid) {
        console.error('商品ID不存在')
        return
      }
      const url = `/goods/${item.goodsid}/status` // 显式构造请求URL
      console.log('Request URL:', url) // 打印请求URL

      // 调用 API 更新商品状态
      goodsApi.updateGoodsStatus(item.goodsid, payload).then(response => {
        if (response.success) {
          console.log('更新成功', response)
        } else {
          alert('更新失败，请稍后再试')
          // 如果更新失败，恢复原始状态
          this.$set(item, tag, !item[tag])
        }
      }).catch(error => {
        console.error('更新商品标签失败:', error)
        alert('更新失败，请检查网络连接或稍后再试')
        // 如果更新失败，恢复原始状态
        this.$set(item, tag, !item[tag])
      })
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column; /* 使子元素垂直排列 */
  justify-content: center; /* 整个表单居中 */
  align-items: flex-start; /* 对齐顶部 */
  min-height: 100px; /* 确保垂直居中时占满视口高度 */
}

.filter-search {
  border: 1px solid #ccc;
  padding: 20px; /* 增加外边距 */
  width: 100%;
  max-width: 1500px; /* 设置最大宽度以适应不同屏幕 */
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between; /* 标题居左，按钮组居右 */
  align-items: center; /* 垂直对齐 */
  margin-bottom: 20px; /* 标题和表单之间的间距 */
}

.header h3 {
  margin: 0; /* 移除默认的上下边距 */
  font-size: 18px;
}

.form-grid {
  display: grid;
  gap: 20px 15px; /* 行间距和列间距 */
  width: 100%;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 100%; /* 允许输入框根据网格自动调整宽度 */
  text-align: left; /* 标签文本左对齐 */
}

.input-group label {
  margin-bottom: 5px;
  font-size: 14px;
  color: #666;
}

.input-group input,
.input-group select {
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
  color: #333;
  width: 100%; /* 输入框宽度与父级一致 */
}

.button-group {
  display: flex;
  gap: 10px; /* 按钮之间的间距 */
}

.button-group button {
  padding: 10px 20px;
  background-color: #1e90ff; /* 蓝色背景 */
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.button-group button:first-child {
  background-color: #f44336; /* 红色背景 */
}

.button-group button:hover {
  opacity: 0.9;
}

@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: repeat(3, 1fr); /* 全屏时三列 */
  }
}

@media (max-width: 767px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr); /* 小屏幕时两列 */
  }
}

@media (max-width: 576px) {
  .form-grid {
    grid-template-columns: 1fr; /* 更小屏幕时一列 */
  }
}

.goods-container {
  /* 新增的容器样式，可以根据需要添加 */
  padding: 20px; /* 为商品列表容器添加内边距 */
  border-top: 1px solid #ccc; /* 为商品列表容器添加顶部边框，与筛选搜索区分 */
}

.goods-list table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; /* 固定表格布局，确保列宽一致 */
}

.goods-list th, .goods-list td {
  border: 1px solid #ddd;
  padding: 10px; /* 增加内边距 */
  text-align: center; /* 文本居中 */
  font-size: 14px; /* 字体大小 */
  color: #333; /* 字体颜色 */
}

.goods-list th {
  background-color: #f9f9f9; /* 表头背景颜色 */
  font-weight: bold; /* 表头字体加粗 */
}

/* 基础样式，适用于所有屏幕宽度 */
.goods-list th, .goods-list td {
  display: table-cell;
}

/* 当屏幕宽度大于等于 1200px 时，显示所有列 */
@media (min-width: 1200px) {
  .goods-list th, .goods-list td {
    display: table-cell;
  }
}

/* 当屏幕宽度在 992px 到 1199px 之间时，隐藏一些列 */
@media (min-width: 992px) and (max-width: 1199px) {
  .goods-list th:nth-child(5), .goods-list td:nth-child(5) {
    display: none;
  }
}

/* 当屏幕宽度在 768px 到 991px 之间时，隐藏更多列 */
@media (min-width: 768px) and (max-width: 991px) {
  .goods-list th:nth-child(4), .goods-list td:nth-child(4),
  .goods-list th:nth-child(5), .goods-list td:nth-child(5) {
    display: none;
  }
}

/* 当屏幕宽度小于 767px 时，只显示编号和商品名称 */
@media (max-width: 767px) {
  .goods-list th:nth-child(n+3), .goods-list td:nth-child(n+3) {
    display: none;
  }
}

.goods-list button {
  padding: 5px 10px; /* 按钮内边距 */
  margin: 0 5px; /* 按钮间距 */
  background-color: #ff4d4f; /* 按钮背景颜色 */
  color: white; /* 按钮字体颜色 */
  border: none; /* 无边框 */
  border-radius: 3px; /* 圆角 */
  cursor: pointer; /* 鼠标悬停时显示手型 */
  transition: background-color 0.3s; /* 背景颜色过渡效果 */
}

.goods-list button:hover {
  background-color: #e04242; /* 按钮悬停背景颜色 */
}

.goods-list .status-switch {
  display: inline-block; /* 状态开关块级显示 */
  width: 40px; /* 开关宽度 */
  height: 20px; /* 开关高度 */
  background-color: #e0e0e0; /* 开关背景颜色 */
  border-radius: 10px; /* 开关圆角 */
  position: relative; /* 相对定位 */
  cursor: pointer; /* 鼠标悬停时显示手型 */
}

.goods-list .status-switch::before {
  content: '开'; /* 开关显示文字 */
  position: absolute;
  top: 2px;
  right: 8px;
  color: white;
  font-size: 12px;
}

.goods-list .status-switch::after {
  content: '关';
  position: absolute;
  top: 2px;
  left: 8px;
  color: #333;
  font-size: 12px;
}

.goods-list .status-switch.on {
  background-color: #4caf50; /* 开关开启时背景颜色 */
}

.goods-list .status-switch.on::before {
  color: #4caf50; /* 开关开启时文字颜色 */
}

.goods-list .status-switch.on::after {
  color: white; /* 开关开启时文字颜色 */
}

/* 新增分页器样式 */
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* 将内容靠右对齐 */
  margin-top: 20px;
  gap: 10px; /* 给子元素之间添加间距 */
}

.pagination-container > * {
  margin-left: 0; /* 移除默认的左边距 */
}

.el-pagination {
  margin-left: 0; /* 确保分页组件也靠右对齐 */
}

.el-input {
  width: 60px;
}

.upload-button {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.upload-button .el-select {
  margin-right: 10px;
}
/* 确保每个开关与文本在单独的一行内 */
.tag-switches {
  display: flex;
  flex-direction: column;
  align-items: center; /* 内容居中对齐 */
  gap: 8px; /* 设置每个开关之间的间距 */
}

/* 每个开关项 */
.switch-item {
  display: flex;
  justify-content: center; /* 文本与开关之间保持一定距离 */
  width: 100%; /* 占据整个容器宽度 */
  align-items: center; /* 垂直居中 */
}

/* 自定义添加的文字标签 */
.custom-label {
  margin-right: 15px; /* 与开关之间保持一定的距离 */
  font-size: 14px;
  line-height: 20px;
}

/* 开关轨道的颜色 */
.switch-item .el-switch__core {
  height: 24px; /* 调整轨道高度 */
  border-radius: 16px; /* 圆角 */
}

/* 开关按钮背景颜色 */
.switch-item .el-switch.is-checked .el-switch__core {
  border-color: #13ce66; /* 开启状态下的边框颜色 */
  background-color: #13ce66; /* 开启状态下的背景颜色 */
}

/* 开关按钮圆点 */
.switch-item .el-switch__core::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  height: 20px;
  width: 20px;
  background-color: white;
  transition: all .3s;
  border-radius: 50%;
}

/* 当开关被点击时，按钮移动到另一端 */
.switch-item .el-switch.is-checked .el-switch__core::after {
  left: calc(100% - 22px);
}

/* 设置标签列的宽度 */
.status-column {
  width: 50px; /* 可以根据需要调整这个值 */
}

.add-goods-box {
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 20px auto; /* 上下间距20px，左右自动居中 */
  width: 100%; /* 占据父容器80%的宽度 */
  max-width: 100%; /* 确保在小屏幕上不会溢出 */
}

.add-goods-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-goods-header h2 {
  margin: 0;
  font-size: 1.2em;
}

.add-goods-header button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.add-goods-header button:hover {
  background-color: #0056b3;
}
/* 商品列表中图片的样式，设置图片大小 */
.goods-list-img {
  max-width: 80px; /* 设置图片最大宽度，可根据需求调整数值，比如改为 50px 等 */
  max-height: 80px; /* 设置图片最大高度，同样可按需调整 */
  object-fit: contain; /* 保持图片宽高比进行缩放，使其完整显示在设定尺寸内 */
}
</style>
