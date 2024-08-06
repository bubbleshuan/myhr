<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input v-model="queryParams.keyword" style="margin-bottom:10px" type="text" prefix-icon="el-icon-search" size="small" placeholder="输入员工姓名全员搜索" @input="changekeyword" />
        <!-- 树形组件 -->
        <el-tree ref="deptsTree" :data="depts" :props="defaultProps" :expand-on-click-node="false" default-expand-all highlight-current node-key="id" @current-change="updateDepartmentId" />
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button size="mini" type="primary">添加员工</el-button>
          <el-button size="mini">excel导入</el-button>
          <el-button size="mini">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table
          :data="users"
          style="width: 100%"
          :default-sort="[{prop: 'date', order: 'descending'},
                          {prop: 'workNumber', order: 'descending'}
          ]"
        >
          <!-- <el-table-column

            width="180"
          >
            <template>

              <el-checkbox v-model="checked" />
            </template>
          </el-table-column> -->
          <el-table-column
            prop="staffPhoto"
            align="center"
            label="头像"
          >
            <template v-slot="{ row }">
              <el-avatar v-if="row.staffPhoto" :src="row.staffPhoto" :size="30" />
              <span v-else class="username">{{ row.username.charAt(0) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
          />
          <el-table-column
            prop="mobile"
            label="手机号"
            sortable
          />
          <el-table-column
            prop="workNumber"
            label="工号"
            sortable
          />
          <el-table-column
            prop="formOfEmployment"
            label="聘用形式"
            :formatter="formatter"
          />
          <el-table-column
            prop="departmentName"
            label="部门"
          />
          <el-table-column
            prop="timeOfEntry"
            label="入职时间"
            sortable
          />
          <el-table-column
            label="操作"
            width="280"
          >
            <template slot-scope="{row}">
              <el-button type="text" size="mini" @click="handleClick(row)">查看</el-button>
              <el-button type="text" size="mini">角色</el-button>
              <el-button type="text" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="end" style="height: 60px;" align="middle">
          <el-pagination
            layout="total,prev, pager, next"
            :total="total"
            :page-size="queryParams.pagesize"
            :current-page="queryParams.page"
            @size-change="sizeChange"
            @current-change="currentChange"
            @prev-click="prevClick"
            @next-click="nextClick"
          />
        </el-row>

      </div>
    </div>
  </div>
</template>

<script>
import { getDepartmentList } from '@/api/department'
import { changeListToTree } from '@/utils/index'
import { getUserList } from '@/api/employee'
export default {
  name: 'Employee',
  data() {
    return {
      depts: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      queryParams: {
        'departmentId': null,
        'page': 1,
        'pagesize': 10,
        'keyword': null
      },
      total: 0,
      users: []
    }
  },
  computed: {

  },
  created() {
    this.getDepartmentList()
  },
  methods: {
    async getDepartmentList() {
      this.depts = changeListToTree(await getDepartmentList(), 0)
      this.queryParams.departmentId = this.depts[0].id
      this.$nextTick(() => {
        this.$refs.deptsTree.setCurrentKey(this.queryParams.departmentId)
      })
      this.getUserList()
    },
    updateDepartmentId(node) {
      this.queryParams.departmentId = node.id
      this.queryParams.page = 1
      this.getUserList()
    },
    async getUserList() {
      const { total, rows } = await getUserList(this.queryParams)
      this.users = rows
      this.total = total
    },
    formatter(row, column) {
      return row.formOfEmployment === 1 ? '正式' : '非正式'
    },
    sizeChange(val) {
      this.queryParams.pagesize = val
      this.getUserList()
    },
    currentChange(val) {
      this.queryParams.page = val
      this.getUserList()
    },
    prevClick() {
      if (this.queryParams.page > 1) {
        this.queryParams.page--
        this.getUserList()
      }
    },
    nextClick() {
      if (this.queryParams.page < (this.total / this.queryParams.pagesize + 1)) {
        this.queryParams.page++
        this.getUserList()
      }
    },

    changekeyword(keyword) {
      clearTimeout(this.timer)
      // 防抖是单位时间内只执行最后一次
      this.timer = setTimeout(() => {
        this.queryParams.page = 1
        this.getUserList()
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background: #fff;
  display: flex;
  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }
  .right {
    flex: 1;
    padding: 20px;
    .opeate-tools {
      margin:10px ;
    }
    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04C9BE;
      font-size: 12px;
      display:inline-block;
    }
  }
}

</style>
