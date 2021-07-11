<template>
  <div class="login-view">
    <el-form class="login-form" ref="login-form" :model="form" label-width="80px" :rules="rules">
      <el-form-item  prop="mobile">
        <el-input placeholder="请输入手机号" v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input placeholder="请输入验证码" type="password" v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox class="checkbox"  v-model="form.agree">我以阅读并同意用户协议</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="isloading" class="submit-button" @click="onSubmit">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request.js'

export default {
  data () {
    return {
      form: {
        mobile: '17866912038',
        code: '123456',
        agree: false
      },
      isloading: false,
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[1,3,5,7,8,9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: 'blur' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.isloading = true
      console.log(this.$refs['login-form'])
      this.$refs['login-form'].validate((valid, data) => {
        if (!valid) {
          this.isloading = false
          return
        }
        this.login()
      })
    },
    login () {
      const data = this.form
      request(data).then(res => {
        this.isloading = false
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        console.log(res)
      }).catch(err => {
        console.log(err)
        this.isloading = false
        this.$message({
          message: '登录失败，验证码错误',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-view {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-form {
      width: 500px;
      min-height: 500px;
      .checkbox {
        position: relative;
        left: -120px;
        text-aligin: center;
        margin-bottom: 20px;
      }
      .submit-button {
        width: 100%;
      }
    }
  }
</style>
