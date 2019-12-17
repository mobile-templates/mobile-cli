<template>
    <div class="main-contain">
      <div class="welcome">欢迎来到mobil-cli!</div>
      <Tabbar :selected="selected"></Tabbar>
    </div>
</template>

<script>
import Tabbar from '../components/tabbar'

export default {
  name: '',
  components: {
    Tabbar
  },
  data () {
    return {
      test: true,
      selected: 0, // 标签栏下标
      userId: this.$store.state.userId
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style scoped>
  .welcome{position: fixed;top: 50%;left: 50%;width:auto;height: auto;-webkit-transform: translateX(-50%) translateY(-50%); -moz-transform: translateX(-50%) translateY(-50%);-ms-transform: translateX(-50%) translateY(-50%);transform: translateX(-50%) translateY(-50%);color: #1A91F5;font-size: 0.4rem;}
</style>
