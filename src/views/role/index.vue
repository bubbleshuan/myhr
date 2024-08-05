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
        >
          <template v-slot="{row}">
            <el-input v-if="row.isEdit" v-model="row.editRow.name" size="mini" />
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="state"
          label="启用"
          width="200"
          align="center"
        >
          <!-- 插槽实现自定义列结构
           想使用作用域插槽取数据，需要使用v-slot指令，v-slot需要做用在template模版上，（这里面解构出来了数据row）-->
          <template v-slot="{row}">
            <el-switch v-if="row.isEdit" v-model="row.editRow.state" :active-value="1" :inactive-value="0" />
            <span v-else>{{ row.state === 1 ? '已启用': row.state === 0 ? '未启用':'无' }}</span>
          </template>

        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          align="center"
        >
          <template v-slot="{ row }">
            <el-input v-if="row.isEdit" v-model="row.editRow.description" type="textarea" size="mini" />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
        >

          <template slot-scope="scope">
            <template v-if="scope.row.isEdit">
              <el-button size="mini" type="primary" @click="btnEditOK(scope.row)">确定</el-button>
              <el-button size="mini" @click="btnCancel(scope.row)">取消</el-button>
            </template>
            <template v-else>
              <!-- // 加入type="text"，按钮变成链接的形态 -->
              <el-button type="text" size="mini" @click="handleClick(scope.row)">分配权限</el-button>
              <el-button type="text" size="mini" @click="updateRole(scope.row)">编辑</el-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="delRole(scope.row)"
              >
                <el-button slot="reference" type="text" size="mini" style="margin-left: 10px;">删除</el-button>
              </el-popconfirm>

            </template>
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
import { getRoleList, delRole, updateRole } from '@/api/role'
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

    async delRole(row) {
      await delRole(row.id)
      if (this.roleList.length === 1 && this.param.page !== 1) {
        this.param.page--
      }
      this.getRoleList()
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    },
    updateRole(row) {
      row.isEdit = true
      row.editRow.name = row.name
      row.editRow.state = row.state
      row.editRow.description = row.description
    },
    btnCancel(row) {
      row.isEdit = false
    },
    async btnEditOK(row) {
      if (!row.editRow.name) {
        this.$message.warning('角色名称不能为空')
        return false
      }
      if (!row.editRow.description) {
        this.$message.warning('角色描述不能为空')
        return false
      }
      await updateRole({ ...row.editRow, 'id': row.id })
      this.$message.success('角色更新成功')
      // row.isEdit = false eslint的校验，误判 上面有await，eslint认为上面对row进行了操作，就不允许你再对它进行操作了
      // Object.assign(target,source) 用源数据对目标数据进行修改
      // 可以规避eslint的误判
      Object.assign(row, {
        ...row.editRow,
        isEdit: false
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
      // item.isEdit = false 添加的动态属性  不具备响应式特点
      // 此时数据变化，不会视图更新
      this.roleList.forEach(item => {
        // item.isEdit = false
        // Vue自己提供的$set方法，可以对添加的属性，拥有响应式的特点
        // this.$set(目标对象，属性名称，初始值) 等价于 Vue.set(目标对象, 属性名称, 初始值 )
        // 向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新
        this.$set(item, 'isEdit', false)
        this.$set(item, 'editRow', {
          'description': item.description,
          'state': item.state,
          'name': item.name
        })
      })
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
