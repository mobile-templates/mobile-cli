<template>
    <div class="main-contain">
        <div class="login">
            <img src="../assets/img/logo1.png" class="logo">
            <div class="login-title">青少年心理健康促进服务平台</div>
            <div class="login-area">
                <div class="login-choose">
                    <div :class="{'choosed-tab': choosed}" @click="loginChoose(0)">账号密码登录</div>
                    <div :class="{'choosed-tab': !choosed}" @click="loginChoose(1)">短信动态密码登录</div>
                </div>
                <div class="login-info">
                    <div class="name-input" v-if="choosed">
                        <img src="../assets/img/phone.png" class="phone-logo">
                        <input
                        type="text"
                        class="login-name"
                        v-model="loginInfo.loginName"
                        placeholder="请输入您的账号/手机号/身份证号"
                        >
                    </div>
                    <div class="name-input" v-if="!choosed">
                        <img src="../assets/img/phone.png" class="phone-logo">
                        <input
                        type="text"
                        class="login-name"
                        v-model="loginInfo.loginName"
                        placeholder="请输入您的手机号"
                        >
                    </div>
                    <div v-if="choosed" class="pwd-input">
                        <img src="../assets/img/pwd.png" class="pwd-logo">
                        <input
                        type="password"
                        class="pwd-name"
                        v-model="loginInfo.password"
                        placeholder="请输入您的密码"
                        >
                    </div>
                    <div v-if="!choosed" class="captchad-input">
                        <img src="../assets/img/pwd.png" class="pwd-logo">
                        <input
                        type="text"
                        class="pwd-name captcha-name"
                        v-model="loginInfo.captcha"
                        placeholder="请输入短信验证码"
                        >
                        <button class="captcha-btn" :class="{'captcha-disabled': !disabled}">{{captcha}}</button>
                    </div>
                </div>
                <div class="password-option">
                    <div v-if="choosed">
                        <input
                        type="checkbox"
                        name="rememberPwd"
                        value="rememberPwd"
                        id="remember-pwd"
                        v-model="rememberPwd"
                        >
                        <label
                        for="remember-pwd"
                        class="remember-pwd"
                        :class="{choosed: rememberPwd}"
                        >
                        </label>
                        <label class="pwd-option">记住密码</label>
                    </div>
                </div>
                <div class="login-btn" @click="login" :class="{'login-active': btnActive}">
                  登录
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  name: '',
  components: {
    [Toast.name]: Toast
  },
  data () {
    return {
      choosed: true, // 默认选择账号密码登录
      rememberPwd: !!localStorage.getItem('userInfo'), // 是否选择记住密码
      loginInfo: {
        loginName: '',
        password: '',
        captcha: ''
      },
      captcha: '获取验证码',
      disabled: true, // 倒数时不能再点击按钮
      changePwd: false,
      sha256: require('js-sha256').sha256, // 引入sha256库加密
      lastFocusInputIndex: '',
      btnActive: false
    }
  },
  methods: {
    loginChoose (index) {
      let vm = this
      if (!index && !vm.choosed) {
        vm.choosed = true
        vm.loginInfo.password = ''
      }
      if (index && vm.choosed) {
        vm.choosed = false
        vm.loginInfo.captcha = ''
      }
    },
    login () {
      let vm = this
      vm.btnActive = true
      setTimeout(() => {
        vm.btnActive = false
      }, 200)
      // 模拟登录
      let data = {
        token: 'gengoengenlenlqhrihrqobfwogbw',
        userId: 12345
      }
      vm.$store.commit('set_token', data) // vuex保存登录信息
      vm.$router.replace('/index')
    }
  },
  mounted () {
    let vm = this
    if (vm.$store.state.token) { // 通过vuex获取当前的token是否存在
      vm.$router.replace('index')
    }
  }
}
</script>

<style scoped>
.main-contain{
  font-family: 'PingFang-SC-Regular';
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("../assets/img/icon_24.png") no-repeat left top #ffffff;
  background-size: 7.5rem auto;
}
.login{
    width: 100%;
  padding-top: 0.8rem;
    position: relative;
}
.logo{
    width: 50%;
  display: block;
    margin: 0 auto;
}
.login-title{
    width: 100%;
    text-align: center;
    font-size: .39rem;
    color: #333333;
  margin-top: 0.22rem;
  font-weight: 600;
}
.login-area{
    width: 93%;
    height: 6.6rem;
    background-color: #fff;
    border-radius: .15rem;
    margin: auto;
}
.login-choose{
    width: 84%;
    margin: 10% auto 0;
    height: 10%;
    display: flex;
}
.login-choose>div{
    height: 100%;
    width: 50%;
    text-align: center;
    font-size: .3rem;
    transform: scale(.95,1);
    letter-spacing: .02rem;
}
.choosed-tab{
    border-bottom: 1px solid #7AA1F9;
    color: #4F85F6;
}
.login-info{
    margin: 1.5% auto 0;
    width: 82%;
    height: 30%;
}
.name-input{
    width: 100%;
    height: 40%;
    position: relative;
    margin-bottom: .19rem;
    outline: none;
    display: flex;
    margin-top: .45rem;
}
.phone-logo{
    width: .22rem;
    position: absolute;
    top: 28%;
    left: 4%;
}
.login-name{
    width: 100%;
    height: 100%;
    border: none;
    font-size: .3rem;
    padding: 0 0 0 1rem;
    letter-spacing: .02rem;
    background-color: #F4F6F8;
    border: 1px solid #F4F6F8;
}
.pwd-input{
    width: 100%;
    height: 40%;
    position: relative;
    outline: none;
    display: flex;
}
.pwd-logo{
    width: .24rem;
    position: absolute;
    top: 36%;
    left: 4%;
}
.pwd-name{
    width: 100%;
    height: 100%;
    border: none;
    font-size: .3rem;
    padding: 0 0 0 1rem;
    letter-spacing: .05rem;
    background-color: #F4F6F8;
    border: 1px solid #F4F6F8;
}
.captchad-input{
    width: 100%;
    height: 40%;
    position: relative;
    outline: none;
    display: flex;
}
.captcha-name{
    width: 60%;
    border: 1px solid #F4F6F8;
}
.captcha-btn{
    width: 36%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    border: 1px solid #97C0FE;
    background-color: #D0E7FF;
    color: #4B82F7;
    font-size: .26rem;
    display: flex;
    justify-content: center;
    align-items: center;

}
.captcha-disabled{
    background-color: #ddd;
    color: #888;
    border: #888;
}
input::placeholder{
    color: #C3C3C3;
    font-size: .26rem;
    letter-spacing: .02rem;
}
.password-option{
    margin: 1% auto 0;
    width: 80%;
    display: flex;
    justify-content: space-between;
    font-size: .26rem;
    letter-spacing: .02rem;
    color: #AFAFAF;
    height: .41rem;
}
.choose-captchad{
    opacity: 0;
}
input[name=rememberPwd]{
    display: none;
}
.remember-pwd{
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: .23rem;
    height: .23rem;
    border: 1px solid #C3C3C3;
    background-color: #fff;
    font-size: .26rem;
    margin-right: .07rem;
}
.choosed{
    background-image: url('../assets/img/option.png');
    background-size: cover;
    background-repeat: no-repeat;
    border: none;
}
.tips{
    width: .3rem;
    padding-bottom: 5%;
}
.login-btn{
  width: 5.8rem;
  height: 0.96rem;
  color: #ffffff;
  border-radius: 3px;
  font-size: 0.39rem;
  margin: 0.6rem auto 0 auto;
  text-align: center;
  line-height: 0.96rem;
  letter-spacing: 0.2rem;
  background-color: #1A91F5;
  box-shadow: 2px 2px 6px #CDE7FC, -2px 2px 6px #CDE7FC;
}
.login-active{background-color: #7CC3FF !important;}
.register{
    font-size: .26rem;
    text-decoration: underline;
    color: #B7B7B7;
    margin: 2% 0 0 5%;
    transform: scale(.9,1);
    letter-spacing: .03rem;
}
.ant-message-notice{
    font-size: 0.75rem!important;
}
</style>
