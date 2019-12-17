import Vue from 'vue'
import Load from './index.vue'
let LoadTem = Vue.extend(Load)
let instance
let Loading = () => {
  if (!instance) {
    instance = new LoadTem()
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
  }
  instance.show = true
}
Loading.close = () => {
  instance.show = false
}
Loading.install = (Vue) => {
  Vue.prototype.$Loading = Loading
}
export default Loading
