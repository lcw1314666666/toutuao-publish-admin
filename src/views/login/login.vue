<template>
  <div class="login-view">
    <el-form class="login-form" ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="手机" prop="phoneNum">
        <el-input v-model="form.phoneNum"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="submit-button" @click="onSubmit">立即登录</el-button>
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
        pass: ''
      },
      rules: {
        phoneNum: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[1,3,5,7,8,9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
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
      .submit-button {
        width: 100%;
      }
    }
  }
</style>
