<template>
  <div class="container">
    <div class="app-container">
      <div class="role-operate">
        <el-button size="mini" type="primary" @click="openDialog">添加角色</el-button>
      </div>

      <el-table
        :data="roleList"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="序号"
          width="180"
          align="center"
        />
        <el-table-column
          prop="name"
          label="角色"
          width="200"
          align="center"
        />
        <el-table-column
          prop="state"
          label="启用"
          width="200"
          align="center"
        >
          <!-- 插槽实现自定义列结构
           想使用作用域插槽取数据，需要使用v-slot指令，v-slot需要做用在template模版上，（这里面解构出来了数据row）-->
          <template v-slot="{row}">
            <span>{{ row.state === 1 ? '已启用': row.state === 0 ? '未启用':'无' }}</span>
          </template>

        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          align="center"
        />
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <!-- // 加入type="text"，按钮变成链接的形态 -->
            <el-button type="text" size="mini" @click="handleClick(scope.row)">分配权限</el-button>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini" @click="delRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" style="height: 60px" align="middle" justify="end">
        <el-pagination
          :page-size="param.pagesize"
          layout="prev, pager, next"
          :total="param.total"
          :current-page="param.page"
          @current-change="handleCurrentChange"
          @prev-click="handlePrevClick"
          @next-click="handleNextClick"
        />
      </el-row>

    </div>
    <add-role :show-dialog.sync="showDialog" @updateRole="getRoleList" />
  </div>
</template>
<script>
import { getRoleList, delRole } from '@/api/role'
import AddRole from '@/views/role/components/add-role.vue'
export default {
  name: 'Role',
  components: {
    AddRole

  },

  data() {
    return {
      showDialog: false,
      roleList: [],
      param: {
        pagesize: 5,
        page: 1,
        total: 0
      }

    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    openDialog() {
      this.showDialog = true
    },

    delRole(row) {
      this.$confirm('这是一段内容确定删除吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRole(row.id)
        if (this.roleList.rows.length <= 1 && this.param.page !== 1) {
          this.param.page--
        }
        this.getRoleList()

        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleClick(row) {
      console.log(row)
    },
    // 用户点击上一页按钮改变当前页后触发
    handlePrevClick() {
      this.param.page--
      this.getRoleList()
    },
    // 用户点击下一页按钮改变当前页后触发
    handleNextClick() {
      this.param.page++
      this.getRoleList()
    },
    // currentPage 改变时会触发
    handleCurrentChange(val) {
      this.param.page = val
      console.log(`当前页: ${val}`)
      this.getRoleList()
    },
    async getRoleList() {
      const { rows, total } = await getRoleList(this.param)
      this.roleList = rows
      this.param.total = total
    }
  }
}
</script>
<style scoped>
.role-operate{
  padding: 10px;
}
</style>
