<template>
  <div class="app-menuForm">
    <div class="table-container">
      <div class="table-title">
        <h2>{{ showSecondLevel ? '菜单列表' : '数据列表' }}</h2>
        <el-button type="primary" v-if="!showSecondLevel" @click="goToAddMenu">添加</el-button>
        <el-button type="default" v-if="showSecondLevel" @click="backToFirstLevel">返回一级菜单</el-button>
      </div>

      <!-- 一级菜单表格 -->
      <el-table v-if="!showSecondLevel" :data="firstLevelItems" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="id" label="编号" width="120">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleEdit(scope.row)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="menuName" label="菜单名称" width="120" />
        <el-table-column prop="menuLevel" label="菜单级数" width="120" />
        <el-table-column prop="frontendName" label="前端名称" width="120" />
        <el-table-column prop="icon" label="前端图标" width="120">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i> 
          </template>
        </el-table-column> 
        <el-table-column prop="isVisible" label="是否显示" width="120">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isVisible" :active-value="true" :inactive-value="false"/>
          </template>
        </el-table-column>
        <el-table-column label="设置" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="handleSubItems(scope.row)">查看下级</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 二级菜单表格 -->
      <el-table v-if="showSecondLevel" :data="secondLevelItems" style="width: 100%">
        <el-table-column prop="id" label="编号" width="120">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleEdit(scope.row)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="menuName" label="菜单名称" width="120" />
        <el-table-column prop="menuLevel" label="菜单级数" width="120" />
        <el-table-column prop="frontendName" label="前端名称" width="120" />
        <el-table-column prop="icon" label="前端图标" width="120">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i> 
          </template>
        </el-table-column> 
        <el-table-column prop="isVisible" label="是否显示" width="120">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isVisible" :active-value="true" :inactive-value="false"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="showDeleteDialog(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>

      <el-dialog
        title="提示"
        :visible.sync="deleteDialogVisible"
        width="30%"
        :before-close="handleDeleteDialogClose">
        <span>确定要删除这项菜单吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmDelete">确 定</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import user from '@/api/sys/menu';
import axios from 'axios';

export default {
  data() {
    return {
      firstLevelItems: [],
      secondLevelItems: [],
      showSecondLevel: false,
      currentLevel: null,
      total: 5,
      pageSize: 10,
      currentPage: 1,
      deleteDialogVisible: false,
      currentDeleteId: null,
    };
  },
  created() {
    this.getMenuByOne(); // 获取一级菜单
  },
  methods: {
    goToAddMenu() {
      this.$router.push({ path: '/addMenu' });
    },
    handleEdit(row) {
      this.$router.push({
        path: '/edit',
        query: { id: row.id }
      });
    },
    handleDelete(id) {
      this.currentDeleteId = id;
      this.deleteDialogVisible = true;
    },
    confirmDelete() {
      user.delete(this.currentDeleteId)
        .then(response => {
          if (response.status === 200 && response.data && response.data.success) {
            this.fetchData();
            this.$message.success('删除成功'); // 弹出提示
          } else {
            this.$message.success('删除成功')
          }
        })
        .catch(error => {
          console.error('删除操作失败:', error);
          this.$message.error('删除操作失败');
        })
        .finally(() => {
          this.deleteDialogVisible = false; // 关闭弹窗
        });
    },
    handleDeleteDialogClose() {
      this.deleteDialogVisible = false;
      this.currentDeleteId = null;
    },
    handleSubItems(row) {
      this.currentLevel = row.level; // 使用 ID 获取所有二级菜单
      this.fetchSubMenu(); // 请求二级菜单
    },
    backToFirstLevel() {
      this.showSecondLevel = false; // 隐藏二级菜单
      this.secondLevelItems = []; // 清空二级菜单数据
    },
    fetchData() {
      axios.get(`/api/menu/page?pageNum=${this.currentPage}&pageSize=${this.pageSize}`)
        .then(response => {
          this.firstLevelItems = response.data.list;
          this.total = response.data.total;
        });
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.currentPage = 1; // Reset to first page when page size changes
      this.fetchData();
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.fetchData();
    },
    fetchSubMenu() {
      axios.get(`http://localhost:8080/getMenuBySecond/${this.currentLevel}`)
        .then(res => {
          this.secondLevelItems = res.data.data.list; // 更新二级菜单数据
          this.total = res.data.data.total; // 更新总数
          this.showSecondLevel = true; // 显示二级菜单
        })
        .catch(err => {
          console.error('获取二级菜单失败', err);
          this.$message.error('获取二级菜单失败，请稍后重试');
        });
    },
    getMenuByOne() {
      user.getMenuByOne().then(res => {
        this.firstLevelItems = res.data.list.filter(item => item.menuLevel === '一级'); // 设置一级菜单
        this.firstLevelItems.forEach(item => {
          this.$set(item, 'isVisible', true); // 确保 isVisible 属性存在
        });
      });
    },
    tableRowClassName({ rowIndex }) {
      return rowIndex % 2 === 0 ? 'warning-row' : 'success-row';
    }
  }
}
</script>

<style scoped>
.app-menuForm {
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa; /* 整体背景色 */
}

.table-container {
  width: 70%;
  max-width: 1200px;
  background: #ffffff; /* 背景色 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 阴影 */
  padding: 30px; /* 内边距 */
}

.table-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px; /* 增加标题和表格之间的间距 */
}

.warning-row { background-color: #fff8e1; } /* 警告行背景色 */
.success-row { background-color: #e8f5e9; } /* 成功行背景色 */

.el-table {
  border: 1px solid #e0e0e0;
  border-radius: 10px; /* 表格圆角 */
  overflow: hidden; /* 防止圆角被内容影响 */
}

.el-table th, .el-table td {
  text-align: center;
  padding: 12px; /* 增加单元格的内边距 */
}

.el-link {
  text-decoration: none; /* 去掉链接下划线 */
}

.el-button {
  border-radius: 5px; /* 按钮圆角 */
  transition: background-color 0.3s ease; /* 动效 */
}

.el-button:hover {
  background-color: #f0f0f0; /* 悬浮背景色 */
}
.el-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
