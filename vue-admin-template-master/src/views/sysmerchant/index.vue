<template>
  <div>
    <el-button type="primary">主要按钮</el-button>
    <el-table :data="tableData" height="270" border style="width: 100%">
      <el-table-column prop="merchantId" label="商户ID" width="180">
      </el-table-column>
      <el-table-column prop="merchantName" label="商户姓名" width="180">
      </el-table-column>
      <el-table-column prop="merchantIntital" label="商户首字母">
      </el-table-column>
      <el-table-column prop="merchantShow" label="是否显示">
      </el-table-column>
      <el-table-column prop="merchantCorrelation" label="相关">
      </el-table-column>
      <el-table-column prop="merchantCorrelation" label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 加入user.js的前面一行 api/sys/user
import user from '@/api/sys/merchant'
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        password: '上海市普陀区金沙江路 1518 弄',
        age: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        password: '上海市普陀区金沙江路 1518 弄',
        age: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        password: '上海市普陀区金沙江路 1518 弄',
        age: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        password: '上海市普陀区金沙江路 1518 弄',
        age: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        password: '上海市普陀区金沙江路 1518 弄',
        age: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        password: '上海市普陀区金沙江路 1518 弄',
        age: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        password: '上海市普陀区金沙江路 1518 弄',
        age: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  // 钩子函数
  created() {
    this.getMerchantList()
  },
  methods: {
    // 向后端发送请求，获取user表中所有数据     .then等待后端返回，执行后面  res
    getMerchantList() {
      user.getMerchantList().then(res => {
        this.tableData = res.data.merchants
      })
    }
  }
}
</script>

<style>
.el-table {
  padding: 20px;
}
</style>
