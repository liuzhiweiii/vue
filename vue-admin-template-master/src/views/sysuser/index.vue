<template>
  <div class="user-container">
    <div class="search-container">
      <el-row>
        <el-col>
          <div class="clearfix" style="margin-bottom: 10px">
            <i class="el-icon-search" style="font-size: 20px">筛选搜索</i>
            <el-button
              type="primary"
              size="small"
              style="float: right"
              @click="searchUser"
            >查询搜索</el-button
            >
            <el-button
              type="primary"
              size="small"
              style="float: right; margin-right: 15px"
              @click="resetForm"
            >重置</el-button
            >
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="input">
            <label
              class="input-label"
              style="width: 140px; display: inline-block; text-align: right"
            >搜索名字：</label
            >
            <el-input
              v-model="input"
              placeholder="姓名"
              clearable
              style="width: 150px"
            />
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="list-container clearfix">
      <i class="el-icon-tickets" style="font-size: 20px">数据列表</i>
      <el-button
        type="primary"
        size="small"
        style="float: right"
        @click="openAddUserDialog"
      >添加</el-button
      >
    </div>
    <el-dialog
      title="添加用户"
      :visible.sync="addUserDialogVisible"
      width="50%"
    >
      <el-form
        ref="addUserFormRef"
        :model="addUserForm"
        :rules="addUserRules"
        label-width="100px"
      >
        <el-form-item label="姓名：" prop="username">
          <el-input v-model="addUserForm.username" />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="addUserForm.password" type="password" />
        </el-form-item>
        <el-form-item label="头像：" prop="avatar">
          <el-input v-model="addUserForm.avatar" />
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="addUserForm.email" />
        </el-form-item>
        <el-form-item label="城市：" prop="city">
          <el-input v-model="addUserForm.city" />
        </el-form-item>
        <el-form-item label="是否启用：" prop="status">
          <el-radio-group v-model="addUserForm.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="resetAddUserForm">取消</el-button> -->
        <el-button type="primary" @click="submitAddUserForm">确定</el-button>
      </span>
    </el-dialog>

    <div class="data-container">
      <el-table :data="pagedTableData" border style="width: 100%; height: 100%">
        <el-table-column prop="id" label="编号" width="100" />
        <el-table-column prop="username" label="姓名" width="150" />
        <el-table-column prop="password" label="密码" width="150" />
        <el-table-column label="头像" width="150">
          <template #default="scope">
            <img
              :src="scope.row.avatar"
              alt="Avatar"
              style="max-width: 100%; max-height: 100%"
            />
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="150" />
        <el-table-column prop="city" label="城市" width="150" />
        <el-table-column prop="created" label="添加时间" width="158" />
        <el-table-column prop="updated" label="更新时间" width="158" />
        <el-table-column prop="lastLogin" label="最后登录" width="160" />
        <el-table-column prop="status" label="是否启用" width="140">
          <template #default="scope">
            <el-tooltip
              :content="'Switch value: ' + scope.row.status"
              placement="top"
            >
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
              />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="156">
          <template v-slot="scope">
            <el-button type="text" size="small">分配角色</el-button>
            <el-button type="text" size="small" @click="openEditUserDialog(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteUser(scope.row)"
            >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="分配角色" width="30%" :visible.sync="roleModalVisible">
      <el-select v-model="selectedRole" multiple placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.value1"
          :label="item.label1"
          :value="item.value1"
        />
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑用户"
      :visible.sync="editUserDialogVisible"
      width="50%"
    >
      <el-form
        ref="editUserFormRef"
        :model="currentUser"
        :rules="addUserRules"
        label-width="100px"
      >
        <el-form-item label="编号：" prop="id">
          <el-input v-model="currentUser.id" disabled />
        </el-form-item>
        <el-form-item label="姓名：" prop="username">
          <el-input v-model="currentUser.username" />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="currentUser.password" type="password" />
        </el-form-item>
        <el-form-item label="头像：" prop="avatar">
          <el-input v-model="currentUser.avatar" />
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="currentUser.email" />
        </el-form-item>
        <el-form-item label="城市：" prop="city">
          <el-input v-model="currentUser.city" />
        </el-form-item>
        <el-form-item label="是否启用：" prop="status">
          <el-radio-group v-model="currentUser.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="submitEditUserForm">确定</el-button>
      </span>
    </el-dialog>

    <div class="right">
      <div class="right-inner">
        <div class="total">共 {{ total }} 条</div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          @current-change="handlePageChange"
        />
        <el-select
          v-model="pageSize"
          placeholder="10条/页"
          @change="handlePageSizeChange"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="parseInt(item.value)"
          />
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
import user from "@/api/sys/user";

export default {
  data() {
    return {
      options: [
        {
          value: 5,
          label: "5条/页",
        },
        {
          value: 10,
          label: "10条/页",
        },
        {
          value: 15,
          label: "15条/页",
        },
      ],
      value: "10条/页",
      input: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [], // 从 API 获取的用户列表
      filteredData: [], // 筛选后的数据
      addUserDialogVisible: false,
      editUserDialogVisible: false, // 编辑对话框的控制
      currentUser: {}, // 当前正在编辑的用户信息
      loadingButtons: {}, // 用于存储每个按钮的加载状态
      addUserForm: {
        username: "",
        password: "",
        avatar: "",
        email: "",
        city: "",
        status: 1,
      },
      addUserRules: {
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      roleModalVisible: false, // 添加这个属性，并初始设置为 false
      selectedRole: null,
      options1: [
        {
          value1: "选项1",
          label1: "超级管理员",
        },
        {
          value1: "选项2",
          label1: "订单管理员",
        },
        {
          value1: "选项3",
          label1: "商品管理员",
        },
      ],
      value1: [],
    };
  },
  computed: {
    pagedTableData() {
      console.log(
        "Computed pagedTableData triggered with currentPage:",
        this.currentPage,
        "pageSize:",
        this.pageSize,
        "filteredData length:",
        this.filteredData.length
      );
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      console.log(
        "Start:",
        start,
        "End:",
        end,
        "Filtered Data Length:",
        this.filteredData.length
      );
      console.log(
        "Computed pagedTableData:",
        this.filteredData.slice(start, end)
      );
      return this.filteredData.slice(start, end);
    },
  },
  created() {
    this.getUserList(); // 获取用户数据
  },
  deleteUser(id) {
    const url = `/deleteUsers/${id}`;
    console.log("Deleting user with URL:", url); // 打印 URL 以供调试

    return axios.delete(url);
  },
  methods: {
    // 获取用户
    getUserList() {
      user.getUserList().then((res) => {
        this.tableData = res.data.user; // 假设 API 返回用户数组
        this.filteredData = this.tableData; // 初始化时显示所有数据
        console.log("Table data:", this.tableData); // 输出原始数据
        this.total = this.tableData.length;
        console.log(this.total);
      });
    },
    // 分页
    handlePageChange(page) {
      this.currentPage = page;
    },
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1; // 改变每页数量时回到第一页
    },
    // 重置
    resetForm() {
      console.log("Reset form button clicked");
      this.input = ""; // 清除输入框
      this.filteredData = this.tableData.slice(); // 恢复全部数据
      console.log("Input field should be cleared now.");
      this.currentPage = 1; // 重置时回到第一页
    },
    // 搜索用户
    searchUser() {
      console.log("Search button clicked"); // 确认按钮点击事件触发
      const searchTerm = this.input.toLowerCase().trim(); // 将输入转换为小写并去除空格
      console.log("Search term:", searchTerm); // 输出搜索词

      if (!searchTerm) {
        console.log("No search term provided, resetting to all data.");
        this.filteredData = this.tableData.slice(); // 如果没有搜索词，则显示所有数据
      } else {
        this.filteredData = this.tableData.filter(
          (user) =>
            (user.username &&
              user.username.toLowerCase().includes(searchTerm)) || // 按姓名搜索
            (user.email && user.email.toLowerCase().includes(searchTerm)) // 按邮箱搜索
        );
        console.log("Filtered data:", this.filteredData); // 输出过滤后的数据
      }

      this.currentPage = 1; // 搜索后重置当前页码
    },

    // 打开添加用户对话框
    openAddUserDialog() {
      this.addUserDialogVisible = true;
    },

    // 提交添加用户表单
    submitAddUserForm() {
      this.$refs.addUserFormRef.validate((valid) => {
        if (valid) {
          const newUser = {
            username: this.addUserForm.username,
            password: this.addUserForm.password || "defaultPassword",
            avatar: this.addUserForm.avatar,
            email: this.addUserForm.email,
            city: this.addUserForm.city,
            status: this.addUserForm.status,
          };
          console.log("Request data:", newUser); // 输出请求数据
          user
            .addUser(newUser)
            .then((res) => {
              console.log("---->" + res);
              if (res.success) {
                this.$message({
                  message: "用户添加成功",
                  type: "success",
                });
                this.getUserList();
                this.addUserDialogVisible = false;
                // this.resetAddUserForm();
              } else {
                this.$message.error(res.message || "用户添加失败");
              }
            })
            .catch((error) => {
              console.error("添加用户时发生错误:", error);
              if (error.response) {
                console.error("服务器返回的错误信息:", error.response.data);
                this.$message.error(
                  `添加用户时发生错误: ${
                    error.response.data.message || error.response.data.error
                  }`
                );
              } else {
                this.$message.error(
                  "添加用户时发生错误，请检查网络连接或稍后再试。"
                );
              }
            });
        } else {
          this.$message.error("表单验证未通过，请检查输入的数据。");
        }
      });
    },

    // 打开编辑用户对话框，保留旧数据
    openEditUserDialog(user) {
      // 将传入的用户数据赋值给 currentUser
      this.currentUser = Object.assign({}, user); // 使用浅拷贝保留原始数据
      this.editUserDialogVisible = true; // 显示编辑对话框
    },

    // 提交编辑用户表单
    submitEditUserForm() {
      this.$refs.editUserFormRef.validate((valid) => {
        if (valid) {
          // 只取用户手动修改过的字段
          const updatedUser = {
            id: this.currentUser.id,
            username: this.currentUser.username,
            password: this.currentUser.password || "defaultPassword", // 如果密码为空则使用默认值
            avatar: this.currentUser.avatar,
            email: this.currentUser.email,
            city: this.currentUser.city,
            status: this.currentUser.status,
          };

          console.log("Request data for update:", updatedUser); // 输出请求数据

          user
            .updateUser(updatedUser) // 调用更新用户的 API
            .then((res) => {
              if (res.success) {
                this.$message({
                  message: "用户编辑成功",
                  type: "success",
                });
                this.getUserList(); // 重新获取用户列表以更新显示
                this.editUserDialogVisible = false; // 关闭对话框
              } else {
                this.$message.error(res.message || "用户编辑失败");
              }
            })
            .catch((error) => {
              console.error("编辑用户时发生错误:", error);
              if (error.response) {
                this.$message.error(
                  `编辑用户时发生错误: ${
                    error.response.data.message || error.response.data.error
                  }`
                );
              } else {
                this.$message.error(
                  "编辑用户时发生错误，请检查网络连接或稍后再试。"
                );
              }
            });
        } else {
          this.$message.error("表单验证未通过，请检查输入的数据。");
        }
      });
    },

    // 分配角色

    // 删除用户
    deleteUser(row) {
      const id = row.id;
      if (confirm("确定要删除该用户吗？")) {
        this.handleDeleteUser(id);
      }
    },
    async handleDeleteUser(id) {
      try {
        // 设置当前按钮的加载状态
        this.$set(this.loadingButtons, id, true);

        await user.deleteUser(id);

        this.$message({
          type: "success",
          message: "删除成功!",
        });

        // 重新加载用户列表以更新页面
        await this.getUserList();
      } catch (error) {
        console.error(
          "删除用户失败:",
          error.response ? error.response.data : error.message
        );
        this.$message.error("删除用户时发生错误，请检查网络连接或稍后再试");
      } finally {
        // 恢复当前按钮的加载状态
        this.$set(this.loadingButtons, id, false);
      }
    },
  },
};
</script>

<style>
.el-table .cell {
  text-align: center;
}

.user-container {
  padding: 20px;
}
.search-container {
  width: 100%;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
}

.input-label {
  width: 140px;
  font-family: "Arial", "Helvetica", sans-serif;
  margin-right: 8px;
  display: inline-block;
  text-align: right;
}

.list-container {
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
}
.data-container {
  margin-top: 20px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
}

.page-container {
  margin-top: 20px;
  margin-bottom: 10px;
  float: right;
}
/* .right span {
  margin-right: 8px;
  float: right;
} */
.right {
  margin-top: 20px;
  margin-bottom: 10px;
  float: right;
}
.right-inner {
  display: flex;
  align-items: center;
}
img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
/* 在全局样式文件中添加 */
.el-dialog .el-radio__original,
.el-dialog .el-input__inner[aria-hidden="true"] {
  display: none !important;
}
</style>
