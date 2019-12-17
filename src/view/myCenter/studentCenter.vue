<template>
    <div class="main-contain">
        <div class="functions">
            <div class="tab">
              <div>
                <div class="personal-info">
                  <img :src="personalInfo.headImg" class="head-img">
                  <div>
                    <div class="personal-name">{{personalInfo.name}}</div>
                    <div class="admin">
                      <div>{{identify}}</div>
                      <span class="man" v-if="personalInfo.sex == '男'"></span>
                      <span class="woman" v-if="personalInfo.sex == '女'"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="func">
              <swiper :options="swiperOption" ref="mySwiper">
                <!-- slides -->
                <swiper-slide v-for="(badge, index) in badge" :key="index">
                  <div class="swiper-item" :class="{'swiper-bg': clickIndex == index}">
                    <img :src="badge.logo">
                    <div class="func-name">{{badge.title}}</div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
        </div>
        <div class="my-functions">
            <div
            v-for="(func, index) in functions"
            :key="index"
            class="my-func"
            >
                <img :src="func.logoSrc" class="logo-src">
                <div>{{func.name}}</div>
                <img src="../../assets/img/arrow.png" class="arrow-logo">
            </div>
        </div>
        <div class="account" :class="{'account-active': accountClick}">
            <div @click="logout">退出登录</div>
        </div>
        <Tabbar :selected="selected"></Tabbar>
    </div>
</template>

<script>
import Tabbar from '../../components/tabbar'
import { Toast } from 'vant'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import API from '../../common/libs/resources'

export default {
  name: '',
  components: {
    Tabbar,
    [Toast.name]: Toast,
    swiper,
    swiperSlide
  },
  data () {
    return {
      selected: 2, // 标签栏下标
      userId: this.$store.state.userId,
      personalInfo: {
        name: '张三',
        headImg: require('../../assets/img/daughter.png'),
        sex: '女'
      },
      identify: '学生',
      badge: [
        {
          logo: require('../../assets/img/jkxws.png'),
          title: '青少年'
        },
        {
          logo: require('../../assets/img/jrbb.png'),
          title: '嘻嘻'
        },
        {
          logo: require('../../assets/img/qxgkdr.png'),
          title: '哈哈'
        },
        {
          logo: require('../../assets/img/wccp.png'),
          title: '完成'
        }
      ],
      functions: [
        {
          name: '我的消息',
          logoSrc: require('../../assets/img/information.png')
        },
        {
          name: '我的测评',
          logoSrc: require('../../assets/img/myTesting.png')
        },
        {
          name: '我的课程',
          logoSrc: require('../../assets/img/course.png')
        },
        {
          name: '我的收藏',
          logoSrc: require('../../assets/img/collection.png')
        },
        {
          name: '意见反馈',
          logoSrc: require('../../assets/img/help.png')
        },
        {
          name: '账号管理',
          logoSrc: require('../../assets/img/password.png')
        }
      ],
      swiperOption: {
        slidesPerView: 3,
        freeMode: true
      },
      clickIndex: 1000,
      accountClick: false
    }
  },
  methods: {
    logout () {
      let vm = this
      vm.accountClick = true
      setTimeout(() => {
        vm.accountClick = false
      }, 200)
      vm.$store.commit('del_token')
      vm.$nextTick(() => {
        vm.$router.replace('login')
      })
    },
    // 请求样例
    getMeg () {
      let vm = this
      let params = {
        userId: vm.userId
      }
      vm.$store.dispatch({
        type: 'axios',
        url: API.login,
        params: params,
        callback: function (data) {
          console.log(data)
          setTimeout(() => {
            if (data.errors[0].errorCode === '200') {
              Toast('请求成功！')
            } else {
              Toast(data.data.errors[0].msg)
            }
          }, 100)
        }
      })
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
  .man{background: url("../../assets/img/icon_20.png") no-repeat;background-size: 0.3rem;display: inline-block;margin-left: 0.22rem;width: 0.3rem;height: 0.3rem;position: relative;top: 0.11rem;}
  .woman{background: url("../../assets/img/icon_21.png") no-repeat;background-size: 0.3rem;display: inline-block;margin-left: 0.22rem;width: 0.3rem;height: 0.3rem;position: relative;top: 0.11rem;}
  .small{width: 0.285rem !important}
  .main-contain{
    padding-bottom: 65px;
    background-color: #F3F4F5;
  }
  .personal-info{
    position: relative;
    display: flex;
    margin-bottom: .22rem;
  }
  .head-img{
    width: 1.54rem;
    height: 1.54rem;
    margin: .4rem 0 0 0.32rem;
    display: inline-block;
  }
  .personal-info>div{
    display: flex;
    width: 4.65rem;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    margin: 0 0 .22rem 7%;
    margin: 0 0 3% 0.47rem;
  }
  .personal-name{
    display: inline-block;
    font-size: .54rem;
    color: #000000;
    letter-spacing: .05rem;
    font-weight: 600;
    font-family: 'PingFang-SC-Regular';
    background: url("../../assets/img/icon_9.png") no-repeat right center;
    background-size: 0.15rem 0.3rem;
    padding-right: 0.375rem;
    width:100%;
  }
  .admin{
    position: absolute;
    font-size: .32rem;
    color: #999999;
    bottom: 0;
    left: 0;
    display: flex;
    letter-spacing: .03rem;
    font-family: 'PingFang-SC-Regular';
  }
  .functions{
    width: 100%;
    margin: 0 auto;
    background-color: #fff;
    font-size: .285rem;
    font-family: 'PingFang-SC-Medium';
    padding-bottom: 0.22rem;
  }
  .tab{
    width: 100%;
    position: relative;
  }
  .myBadge{
    position: absolute;
    width: 2.55rem;
    text-align: center;
    background: url("../../assets/img/icon_19.png") no-repeat 0.12rem center #FFF0D6;
    background-size: 0.36rem;
    height: 0.525rem;
    padding-left: 0.41rem;
    line-height: 0.525rem;
    text-align: center;
    right: 0;
    bottom: 0;
    color: #FCAF07 !important;
    font-size: 0.28rem;
    border-top-left-radius: 0.26rem;
    border-bottom-left-radius: 0.26rem;
  }
  .func{
    display: flex;
    margin-top: .26rem;
    height: 2.4rem;
  }
  .swiper-container{width: 100% !important;}
  .swiper-slide{margin-left: 0.3rem;width: 2rem !important;margin-right: 0 !important;}
  .swiper-item{width: 2rem !important;margin-right: 0 !important;padding: 0.3rem 0;border: solid 1px #eeeeee;border-radius: 0.26rem;}
  .swiper-bg{background-color: #EDF3FA;}
  .func img{
    width: 66%;
    margin: 0 auto;
    display: block;
  }
  .func-name{
    margin-top: .11rem;
    text-align: center;
    font-size: 0.28rem;
    color: #333333;
  }
  .teacherComment .func-name{
    padding-left: 0;
  }
  .my-functions{
    width: 100%;
    margin: .24rem auto 0;
    background-color: #fff;
    font-family: 'PingFang-SC-Medium';
  }
  .my-func{
    margin-left: 5%;
    width: 95%;
    padding: .32rem 0;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    font-size: .34rem;
    position: relative;
    color: #333333;
  }
  .logo-src{
    width: .48rem;
    margin-right: .3rem;
  }
  .arrow-logo{
    position: absolute;
    right: 0.3rem;
    top: 0;
    bottom: 0;
    margin: auto;
    width: .135rem;
  }
  .account{
    width: 84%;
    margin: .375rem auto 0;
    font-size: .36rem;
    border-radius: .11rem;
    background-color: #fff;
    color: #1A91F5;
  }
  .account-active{color: #ffffff;background-color: #1A91F5;}
  .account>div{
    width: 84%;
    margin: 0 auto;
    border-bottom: 1px solid #F5F5F5;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .22rem 0;
  }
  .account>div:last-child{
    border: none;
  }
  .red-point{width: 0.15rem;height: 0.15rem;border-radius: 50%;background-color: #ff5121;position: absolute;top: 0.26rem;left: 0.48rem}
</style>
