<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginFormRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <!-- 放置标题图片 @是设置的别名-->
      <div class="title-container">
        <h3 class="title">
          <img src="~@/assets/common/login-logo.png" alt="">
        </h3>
      </div>

      <el-form-item prop="mobile">
        <!-- 使用element ui内置图标 -->
        <span class="svg-container el-icon-user-solid" />
        <el-input v-model="loginForm.mobile" />
      </el-form-item>
      <el-form-item prop="password">
        <!-- 使用自己svg图标 -->
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input v-model="loginForm.password" />
      </el-form-item>
      <el-button class="loginBtn" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <div class="tips">
        <span style="margin-right:20px;">账号: 13800000002</span>
        <span> 密码: 123456</span>
      </div>

    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        mobile: '13800000002',
        password: '123456'
      },
      loading: false,
      // 表单校验规则，需和数据名称一致
      loginFormRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '手机号码格式不正确'
          }
        ],
        password: [
          { required: true, message: '请填写密码' }
        //   {
        //     pattern:
        // /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/,
        //     message:
        // '密码格式为大写字母/小写字母/数字/特殊符号，任意三项组合'
        //   }
        ]
      }
    }
  },
  watch: {
  },
  methods: {
    async  handleLogin() {
      this.loading = true
      try {
        await this.$refs.loginForm.validate()
        await this.$store.dispatch('user/gitToken', this.loginForm)
        this.$router.push('/')
        this.$message.success('登录成功')
        console.log('登录')
      } catch (e) {
        // 失败
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray: #68b0fe;
$cursor: #68b0fe;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
     border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
    border-radius: 5px;

  }
   .el-form-item__error {
    color: #fff
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url('~@/assets/common/login.jpg'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .loginBtn {
  background: #407ffe;
  height: 64px;
  line-height: 32px;
  font-size: 24px;
}
}
</style>
