<template>
  <div class="app-container">
    <div class="search">
      <div class="search-inner">
        <div class="search-title">
          <i class="el-icon-search"></i>
          <span class="icon-name">筛选搜索</span>
          <el-row class="reset">
            <el-button type="primary" @click="handleReset">重置</el-button>
          </el-row>
          <el-row class="seek">
            <el-button type="primary" @click="handleSearch">查询结果</el-button>
          </el-row>
        </div>
        <div class="search-input">
          <span class="input">输入搜索</span>
          <el-input v-model="input" placeholder="商户名称或者关键字" class="fixed-width"></el-input>
        </div>
      </div>
    </div>

    <div class="data-name">
      <div class="name-inner">
        <i class="el-icon-truck"></i>
        <span class="name">数据列表</span>
        <el-row class="add">
          <el-button @click="handleAddClick">添加</el-button>
        </el-row>
      </div>
    </div>
    <div class="data-list">
      <el-table :data="pagedTableData" border style="width: 100%;height:100%">
        <!-- 多选框列 -->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="merchantId" label="商户ID" width="180">
        </el-table-column>
        <el-table-column prop="merchantName" label="商户姓名" width="180">
        </el-table-column>
        <el-table-column prop="merchantIntital" label="商户首字母">
        </el-table-column>
        <el-table-column prop="merchantRanking" label="排序">
        </el-table-column>
        <el-table-column prop="merchantShow" label="是否显示">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.merchantShow" active-color="#13ce66" inactive-color="#ccc"
                       @change="(newValue) => handleChange(scope.row, newValue)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="merchantCorrelation" label="相关">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEditClick(scope.row)" type="primary" size="small">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteMerchant(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pageturn">
      <div class="left">
        <div class="left-inner">
          <div class="select">
            <el-select v-model="selectedOption1" placeholder="批量操作">
              <el-option v-for="item in options1" :key="item.value" :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <el-row class="confirm">
            <el-button type="primary" @click="handleBatchOperation">确定</el-button>
          </el-row>
          <el-row class="reset-select">
            <el-button type="primary" @click="handleReset">重置</el-button>
          </el-row>
        </div>
      </div>
      <div class="right">
        <div class="right-inner">
          <div class="total">共 {{ total }} 条
          </div>
          <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
                         @current-change="handlePageChange">
          </el-pagination>
          <el-select v-model="pageSize" placeholder="10条/页" @change="handlePageSizeChange">
            <el-option v-for="item in options2" :key="item.value" :label="item.label"
                       :value="parseInt(item.value)">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 加入merchant.js的前面一行 api/sys/user
import user from '@/api/sys/merchant'
import axios from 'axios'; // 确保在文件顶部导入 axios
import * as MerchantApi from '@/api/sys/merchant';
console.log(MerchantApi); // 查看此模块的所有导出

export default {
  data() {
    return {
      input: "",
      tableData: [{
        merchantId: '12345',
        merchantName: '王小虎',
        merchantIntital: 'W',
        merchantShow: 1,
        merchantCorrelation: '相关信息',
        merchantRanking: 1
      },
        {
          merchantId: '89012',
          merchantName: '王小虎',
          merchantIntital: 'W',
          merchantShow: 0,
          merchantCorrelation: '相关信息',
          merchantRanking: 4
        },
        {
          merchantId: '12345',
          merchantName: '王小虎',
          merchantIntital: 'W',
          merchantShow: 1,
          merchantCorrelation: '相关信息',
          merchantRanking: 5
        },
        {
          merchantId: '89012',
          merchantName: '王小虎',
          merchantIntital: 'W',
          merchantShow: 0,
          merchantCorrelation: '相关信息',
          merchantRanking: 8
        }],
      options1: [{
        value: '选项1',
        label: '显示商户'
      }, {
        value: '选项2',
        label: '隐藏商户'
      }],
      selectedOption1: null,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      options2: [{
        value: 5,
        label: '5页/条'
      }, {
        value: 10,
        label: '10页/条'
      }, {
        value: 15,
        label: '15页/条'
      }],
      selectedOption2: '10页/条',
      multipleSelection: [], // 用于保存多选框的选择状态
      loadingButtons: {}, // 用于存储每个按钮的加载状态
    }

  },
  // 钩子函数
  created() {
    this.getMerchantList();
  },
  handleDeleteClick(merchantId) {
    const url = `/deleteMerchant/${merchantId}`;
    console.log("Deleting user with URL:", url); // 打印 URL 以供调试
    return axios.delete(url);
  },
  computed: {
    pagedTableData() {
      console.log(this.pageSize);
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tableData.slice(start, end);
    }
  },
  methods: {
    getMerchantList() {
      user.getMerchantList().then(res => {
        this.tableData = res.data.merchants.map(merchant => ({
          ...merchant,
          merchantShow: Boolean(merchant.merchantShow) // 将 1/0 转换为 true/false
        }));
        this.total = this.tableData.length;
      });
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1; // 改变每页数量时回到第一页
    },
    handleSearch() {
      user.searchMerchantList(this.input).then(res => {
        this.tableData = res.data.merchants.map(merchant => ({
          ...merchant,
          merchantShow: Boolean(merchant.merchantShow) // 将 1/0 转换为 true/false
        }));
        this.total = this.tableData.length;
      });
    },
    handleReset() {
      this.input = ""; // 清空输入框
      this.selectedOption1 = null;
      this.getMerchantList(); // 重新获取所有数据
    },
    handleAddClick() {
      this.$router.push('/addMerchant');
    },
    handleEditClick(row) {
      this.$router.push('/editMerchant');
    },
    // 删除操作
    deleteMerchant(row) {
      const merchantId = row.merchantId;
      console.log("Merchant ID:", merchantId); // 调试：打印 Merchant ID
      if (confirm("确定要删除该商户吗？")) {
        this.handleDeleteClick(merchantId);
      }
    },
    async handleDeleteClick(merchantId) {
      try {
        // 设置当前按钮的加载状态
        this.$set(this.loadingButtons, merchantId, true);

        // 构建正确的 URL 并发起请求
        const url = `/deleteMerchant/${merchantId}`;
        console.log("Deleting merchant with URL:", url); // 打印 URL 以供调试

        await axios.delete(url);

        this.$message({
          type: "success",
          message: "删除成功!",
        });

        // 重新加载用户列表以更新页面
        await this.getMerchantList();
      } catch (error) {
        console.error(
          "删除商户失败:",
          error.response ? error.response.data : error.message
        );
        this.$message.error("删除商户时发生错误，请检查网络连接或稍后再试");
      } finally {
        // 恢复当前按钮的加载状态
        this.$set(this.loadingButtons, merchantId, false);
      }
    },
    handleSearch() {
      user.searchMerchantList(this.input).then(res => {
        this.tableData = res.data.merchants.map(merchant => ({
          ...merchant,
          merchantShow: Boolean(merchant.merchantShow) // 将 1/0 转换为 true/false
        }));
        this.total = this.tableData.length;
      });
    },
    // 处理批量操作选择
    handleBatchOperation() {
      const selected = this.selectedOption1;
      if (selected) {
        this.performBatchOperation(selected);
      } else {
        this.$message({
          type: 'warning',
          message: '请选择一个操作!'
        });
      }
    },

    performBatchOperation(selected) {
      const merchantShow = selected === '选项1' ? 1 : 0;

      this.searchMerchantsByShow(merchantShow);
    },

    // 以根据显示状态搜索商户
    async searchMerchantsByShow(merchantShow) {
      console.log('merchantShow:', merchantShow); // 输出传入的值
      try {
        if (merchantShow === undefined || merchantShow === null) {
          const res = await user.getAllMerchants();
          this.tableData = res.data.merchants;
          this.total = this.tableData.length;
        } else {
          const res = await user.searchMerchantsByShow(merchantShow);
          this.tableData = res.data.merchants.map(merchant => ({
            ...merchant,
            merchantShow: Boolean(merchant.merchantShow)
          }));
          this.total = this.tableData.length;
        }
      } catch (error) {
        console.error('搜索失败:', error);
        this.$message({
          type: 'error',
          message: '获取商户列表失败!'
        });
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: auto;
  /* 如果有设置过 height 或 max-height，这里确保它们不会生效 */
}

.search {
  margin-bottom: 20px;
}

.search-inner {
  padding: 0 20px;
}

.search-title {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 5px;
}

.search-title i.el-icon-search {
  font-size: 18px;
  margin-right: 5px;
}

.icon-name {
  font-size: 24px;
  font-weight: bold;
  padding: 8px 0;
}

.seek {
  margin-left: auto;
}

.reset {
  margin-left: 900px;
}

.search-input {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.input {
  display: inline-block;
  margin-right: 10px;
}

.fixed-width {
  width: 300px;
}


/* 数据列表部分 */
.data-name {
  margin-top: 8px;
  /* 上方距离 */
  margin-bottom: 8px;
  /* 下方距离 */
  border: 1px solid #ebeef5;
  padding: 10px 20px;
  /* 内边距 */
}

.name-inner {
  display: flex;
  align-items: center;
}

.name-inner .el-icon-truck {
  font-size: 24px;
  margin-right: 5px;
}

.name-inner .name {
  font-size: 24px;
  /* 设置字体大小 */
  font-weight: bold;
}

.add {
  margin-left: auto;
}

/* 新增：使多选框居中 */
.el-checkbox__inner {
  margin-left: 15px;
}

/* 分页部分 */
.pageturn {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 10px 20px;
}

.left-inner,
.right-inner {
  display: flex;
  align-items: center;
}

.select {
  margin-right: 10px;
}

.confirm {
  margin-left: 10px;
}

.right span {
  margin-right: 8px;
  /* 设置 "共2条" 与 <el-select> 之间的间隔 */
}

.select-spacing {
  margin-left: 8px;
  /* 确保选择器与 "共2条" 之间有8px的间隔 */
}

.reset-select {
  margin-left: 10px;
}
</style>
