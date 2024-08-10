<template>
  <!--element-ui级联组件-->
  <el-cascader
    size="mini"
    :options="treeData"
    :props="props"
    separator="-"
    :value="value"
    @change="changeValue"
  />
</template>
<script>
import { getDepartmentList } from '@/api/department'
import { changeListToTree } from '@/utils'
export default {
  props: {
    value: {
      type: Number,
      default: null
    }

  },
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
    },
    changeValue(list) {
      console.log(list)
      if (list.length > 0) {
        // 取到数组的最后一个   将数组最后一位的Id取出来  传出去
        this.$emit('input', list[list.length - 1])
      } else {
        this.$emit('input', null)
      }
    }
  }
}
</script>
