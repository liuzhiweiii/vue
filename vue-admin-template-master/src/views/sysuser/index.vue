<template>
    <el-table
    :data="tableData"
    height="250"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="名字"
      width="180">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄">
    </el-table-column>
  </el-table>
</template>

<script>
// 加入user.js的前面一行 api/sys/user
import user from '@/api/sys/user'
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    // 钩子函数
    created(){
        this.getUserList();
    },
    methods:{
        // 向后端发送请求，获取user表中所有数据     .then等待后端返回，执行后面  res
        getUserList(){
            user.getUserList().then(res =>{
                this.tableData = res.data.users
            })
        }
    }
  }
</script>