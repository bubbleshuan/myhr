<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    width="50%"
    @close="close"
  >
    <el-form ref="form" :model="deptForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="deptForm.name" placeholder="2-10个字符" style="width: 80%;" size="mini" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="deptForm.code" placeholder="2-10个字符" style="width: 80%;" size="mini" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="managerId">
        <el-select
          v-model="deptForm.managerId"
          placeholder="请选择负责人"
          style="width: 80%;"
          size="mini"
        >

          <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="deptForm.introduce" type="textarea" placeholder="1-100个字符" :rows="4" style="width: 80%;" size="mini" />
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" size="mini" @click="submitForm('form')">确定</el-button>
            <el-button size="mini" @click="resetForm('form')">取消</el-button>
          </el-col>
        </el-row>

      </el-form-item>

    </el-form>
  </el-dialog>

</template>
<script>
import { getDepartmentList, getManagerList, addDepartment, getDepartmentDetail } from '@/api/department'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    currentNodeId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      managerList: [],
      title: '新增部门',
      deptForm: {
        name: '',
        code: '',
        managerId: '',
        introduce: '',
        pid: '' // 父部门的id
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }, { trigger: 'blur',
            validator: async(rule, value, callback) => {
              // value就是输入的名称
              const result = await getDepartmentList()
              //   result.some判断是否包含值
              if (result.some(item => item.name === value)) {
                callback(new Error('该部门已经有该名称了'))
              } else {
                callback()
              }
            }
          }

        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: async(rule, value, callback) => {
              // value就是输入的编码
              const result = await getDepartmentList()
              //   result.some判断是否包含值
              if (result.some(item => item.code === value)) {
                callback(new Error('该部门已经有该编码了'))
              } else {
                callback()
              }
            }
          }
        ],
        managerId: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
      }

    }
  },

  created() {
    this.getManagerList()
  },
  methods: {
    async getDepartmentDetail() {
      this.deptForm = await getDepartmentDetail(this.currentNodeId)
    },
    async getManagerList() {
      this.managerList = await getManagerList()
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          console.log('currentNodeId:' + this.currentNodeId)
          await addDepartment({ ...this.deptForm, pid: this.currentNodeId })
          this.$message.success('新增成功')
          this.$emit('updateDepartment')
          this.resetForm(formName)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit('update:dialogVisible', false)
    },
    close() {
      // 修改父组件的值  子传父
      this.$emit('update:dialogVisible', false)
    }
  }

}
</script>
