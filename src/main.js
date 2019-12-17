import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './common/libs/rem.js' // rem自适应单位运用 html文件 <html data-use-rem="750">750为设计稿宽度
import 'vant/lib/index.css'
import './assets/css/main.css'
import './assets/css/border.css' // 移动端解决1px border问题
import Loading from './plugins/loading' // loading插件
Vue.use(Loading)

Vue.config.productionTip = false // 阻止启动生产消息

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
