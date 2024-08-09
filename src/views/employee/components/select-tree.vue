<template>
  <!--element-ui级联组件-->
  <el-cascader
    size="mini"
    :options="treeData"
    :props="props"
    separator="-"
  />
</template>
<script>
import { getDepartmentList } from '@/api/department'
import { changeListToTree } from '@/utils'
export default {
  data() {
    return {
      treeData: [], // 赋值给级联属性的options
      props: {
        value: 'id', // 要存储的字段
        label: 'name' // 要展示的字段
      }
    }
  },
  created() {
    this.getTreeData()
  },
  methods: {
    async getTreeData() {
      // 将组织架构的数据，转化树形赋值给treeData
      this.treeData = changeListToTree(await getDepartmentList(), 0)
    }
  }
}
</script>
