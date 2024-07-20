<template>
  <div class="container">
    <!-- 自定义结构获取作用域插槽数据 -->
    <div class="app-container">
      <!-- 这里的props不是组件传值的props，而是属性名 -->
      <!--default-expand-all这样写就是true ，完整版是..........   ：             ：default-expand-all="true" -->
      <!-- 使用el-tree的插槽，把页面结构封装到了插槽里 -->
      <el-tree :data="data" :props="defaultProps" default-expand-all>
        <!-- v-slot等于一个对象，得到转义出来的数据，传过来node和data，这里我们只要data,使用v-slot得到el-tree传过来的节点数据
         v-slot只能作用在template标签上-->
        <!-- data里面有多少数据，template就会循环多少次，把数据展示出来， 完成作用域插槽接取数据-->
        <template v-slot="{ data:department }">
          <!-- 这里使用的elementui的布局 -->
          <el-row style="width:100%;height:40px" type="flex" justify="space-between" align="middle">
            <el-col>{{ department.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ department.managerName }}</span>
              <el-dropdown>
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                  <el-dropdown-item>编辑部门</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>

        </template>
      </el-tree>
    </div>
  </div>
</template>
<script>
import { getDepartmentList } from '@/api/department'
import { changeListToTree } from '@/utils/index'
export default {

  name: 'Department',
  data() {
    return {
      data: [],
      defaultProps: {
        // 读取子节点的字段名
        children: 'children',
        // 要显示的字段的名字
        label: 'name'
      }
    }
  },

  created() {
    this.getDepartmentList()
  },
  methods: {
    async getDepartmentList() {
      // 这里不是this.getDepartmentList()，否则会死循环。我们要调用的是导入进来的方法。
      const data = await getDepartmentList()

      this.data = changeListToTree(data, 0)
      console.log(data)
    }
  }

}
</script>
<style scoped>
 .tree-manager{
  width: 150px;
  display: inline-block;
  margin: 10px;
 }
</style>
