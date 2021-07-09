<template>
  <div class="login-view">
    <el-form class="login-form" ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item  prop="phoneNum">
        <el-input placeholder="请输入手机号" v-model="form.phoneNum"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input placeholder="请输入验证码" type="password" v-model="form.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-checkbox class="checkbox" v-model="checked">我以阅读并同意用户协议</el-checkbox>
      <el-form-item>
        <el-button type="primary" :loading="isloading" class="submit-button" @click="onSubmit">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        phoneNum: '',
        code: ''
      },
      checked: true,
      isloading: false,
      rules: {
        phoneNum: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[1,3,5,7,8,9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { patten: /\d{6}/, message: '请输入正确的验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('点击提交')
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
        left: -80px;
        text-aligin: center;
        margin-bottom: 20px;
      }
      .submit-button {
        width: 100%;
      }
    }
  }
</style>
