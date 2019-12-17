<template>
    <div>
        <van-tabbar v-model="active">
            <van-tabbar-item>
                <span>首页</span>
                <img
                slot="icon"
                slot-scope="props"
                :class="{'enlarge': props.active}"
                :src="props.active ? index.active : index.normal"
                >
            </van-tabbar-item>
            <van-tabbar-item>
                <span>测评</span>
                <img
                slot="icon"
                slot-scope="props"
                :class="{'enlarge': props.active}"
                :src="props.active ? testing.active : testing.normal"
                >
            </van-tabbar-item>
            <van-tabbar-item>
                <span>我的</span>
                <img
                slot="icon"
                slot-scope="props"
                :class="{'enlarge': props.active}"
                :src="props.active ? center.active : center.normal"
                >
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem, Toast } from 'vant'

export default {
  name: '',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast
  },
  props: {
    selected: Number
  },
  data () {
    return {
      active: this.selected || 0,
      index: {
        normal: require('../assets/img/index1.png'),
        active: require('../assets/img/index.png')
      },
      testing: {
        normal: require('../assets/img/testing1.png'),
        active: require('../assets/img/testing.png')
      },
      center: {
        normal: require('../assets/img/center1.png'),
        active: require('../assets/img/center.png')
      }
    }
  },
  watch: {
    active (index) {
      let vm = this
      switch (index) {
        case 0:
          vm.$nextTick(() => {
            vm.$router.replace('/index')
          })
          break
        case 1:
          vm.$toast({
            message: '即将上线，敬请期待',
            duration: 800
          })
          break
        case 2:
          vm.$nextTick(() => {
            vm.$router.replace('/studentCenter')
          })
          break
      }
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
*{
    font-size: .22rem;
    font-family: 'MicrosoftYaHei';
}
.van-tabbar-item__icon img{height: 20px !important;width: 20px !important;}
.enlarge{animation: mychange 300ms linear;}
@keyframes mychange{
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
</style>
