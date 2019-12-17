<template>
  <div v-show="show" class="loading">
    <van-loading size="0.8rem"/>
  </div>
</template>

<script>
import { Loading } from 'vant'
export default {
  name: 'toastMessage',
  components: {[Loading.name]: Loading},
  data () {
    return {
      message: '',
      show: false,
      type: ''
    }
  }
}
</script>

<style lang='less' scoped>
  .loading{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .loading .van-loading{
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-radius: 5px;
    text-align: center;
  }
</style>
