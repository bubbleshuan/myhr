<template>
  <div class="dashboard-container">
    <div class="app-container">
      <div class="edit-form">
        <el-form ref="employeeForm" label-width="220px" :model="employeeForm" :rules="rules">
          <!-- 姓名 部门 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="username">
                <el-input v-model="employeeForm.username" size="mini" class="inputW" />
              </el-form-item>
            </el-col>

          </el-row>
          <!-- 工号 入职时间 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="工号" prop="workNumber">
                <el-input v-model="employeeForm.workNumber" disabled size="mini" class="inputW" />
              </el-form-item>
            </el-col>
          </el-row>
          <!--手机 聘用形式  -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="手机" prop="mobile">
                <el-input
                  v-model="employeeForm.mobile"
                  size="mini"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="部门" prop="departmentId">
                <!-- 放置及联部门组件 -->
                <!-- inputw样式会给到selecttree中 template第一层的组件 -->
                <select-tree v-model="employeeForm.departmentId" class="inputW" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="聘用形式" prop="formOfEmployment">
                <el-select v-model="employeeForm.formOfEmployment" size="mini" class="inputW">
                  <el-option label="正式" :value="1" />
                  <el-option label="非正式" :value="2" />
                </el-select>

              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入职时间" prop="timeOfEntry">
                <el-date-picker
                  v-model="employeeForm.timeOfEntry"
                  size="mini"
                  type="date"
                  value-format="yyyy-MM-dd"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="转正时间" prop="correctionTime">
                <el-date-picker
                  v-model="employeeForm.correctionTime"
                  size="mini"
                  type="date"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 员工照片 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="员工头像">
                <!-- 放置上传图片 -->
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 保存个人信息 -->
          <el-row type="flex">
            <el-col :span="12" style="margin-left:220px">
              <el-button size="mini" type="primary" @click="submitForm">保存更新</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
import { addEmployee } from '@/api/employee'
import SelectTree from '@/views/employee/components/select-tree.vue'
export default {
  components: {
    SelectTree
  },

  data() {
    return {
      employeeForm: {
        username: '',
        mobile: '',
        formOfEmployment: null,
        workNumber: '',
        departmentId: null,
        timeOfEntry: '',
        correctionTime: '',
        staffPhoto: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入员工名称', trigger: 'blur' },
          { min: 1, max: 4, message: '长度在 1 到 4 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入员工手机号', trigger: 'blur' },
          { //   pattern 正则表达式
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '请输入员工聘用形式', trigger: 'blur' }
        ],
        departmentId: [
          { required: true, message: '请输入员工部门id', trigger: 'blur' }
        ],
        timeOfEntry: [
          { required: true, message: '请输入员工入职日期', trigger: 'blur' }
        ],
        correctionTime: [
          { required: true, message: '请输入员工转正日期', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (this.employeeForm.timeOfEntry) {
              if (new Date(this.employeeForm.timeOfEntry) > new Date(value)) {
                callback(new Error('转正时间不能小于入职时间'))
                return
              }
            }
            callback()
          } }
        ],
        staffPhoto: []

      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.employeeForm.validate(async(isOk) => {
        if (isOk) {
          await addEmployee(this.employeeForm)
          this.$refs.employeeForm.resetFields()
          this.$message({ message: '新增员工成功', type: 'success' })
          this.$router.push('/employee')
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
    .edit-form {
      background: #fff;
      padding: 20px;
      .inputW {
        width: 380px
      }
    }

</style>
