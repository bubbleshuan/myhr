<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
          <el-form-item prop="mobile">
            <el-input v-model="ruleForm.mobile" placeholder="输入手机号" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" placeholder="输入密码" show-password />
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="ruleForm.isAgree" label="用户平台使用协议" />
          </el-form-item>
          <el-form-item>
            <el-button style="width: 350px;" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      ruleForm: {
        mobile: process.env.NODE_ENV === 'development' ? '13800000002' : '',
        password: process.env.NODE_ENV === 'development' ? 'hm#qd@23!' : '',
        isAgree: process.env.NODE_ENV === 'development'
      },
      rules: {
        mobile: [
          // trigger: 'blur'触发方式：失去焦点触发
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码必须在6到16位之间', trigger: 'blur' }
        ],
        // required只能检测 null undefined "" ,不能检测true 或者false
        // validator自定义校验函数 rule:校验规则 value:校验的值
        // callback函数 ————相当于promise里面的resolve 和 reject，resolve 和 reject必须执行，否则promis没有结束.同样的callback函数也必须执行，否则也不会结束
        // 成功的时候执行callback()  失败的时候执行callback(new Error(错误信息))
        isAgree: [
          { validator: (rule, value, callback) => {
            value ? callback() : callback(new Error('请勾选协议'))
          }
          }
        ]
      }
    }
  },

  methods: {
    submitForm(formName) {
      console.log(this.ruleForm.mobile)
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          console.log(this)
          // 这里没有直接调用请求，而是调用的vuex的action。说明肯定有数据需要共享。这里共享的是token数据
          // vuex中的action返回的promise，因此是异步的
          await this.$store.dispatch('user/login', this.ruleForm)
          this.$router.push('/')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }

}
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png)
      no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center /
        contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }
    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 20px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color:#606266;
    }
  }
}
</style>
