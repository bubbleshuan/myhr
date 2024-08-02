<template>
  <el-dialog
    title="新增角色"
    :visible="showDialog"
    width="500px"
    @close="resetForm('form')"
  >
    <el-form ref="form" :model="roleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleForm.name" size="mini" style="width: 300px;" />
      </el-form-item>
      <el-form-item label="启用" prop="state">
        <el-switch v-model="roleForm.state" />
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input v-model="roleForm.description" type="textarea" size="mini" style="width: 300px;" :rows="3" />
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
import { addRole } from '@/api/role'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleForm: {
        name: '',
        description: '',
        state: false
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.roleForm.state === false ? this.roleForm.state = 0 : this.roleForm.state = 1
          const result = await addRole(this.roleForm)
          this.$message.success('新增角色成功')
          console.log(result)
          this.resetForm(formName)
          this.$emit('updateRole')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit('update:showDialog', false)
    }
  }

}
</script>

<style  scoped>

</style>

