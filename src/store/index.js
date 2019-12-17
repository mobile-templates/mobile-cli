import Vue from 'vue'
import Vuex from 'vuex'
import _axios from 'axios'

Vue.use(Vuex)

const state = {
  token: '',
  userId: ''
}
const mutations = {
  // sessionStorage保存登陆状态
  set_token (state, data) {
    state.token = data.token
    state.userId = data.userId
    sessionStorage.setItem('token', JSON.stringify({
      token: data.token,
      userId: data.userId
    }
    ))
  },
  // 判断是否有sessionStorage,防止刷新后登录状态失效
  judge_token (state) {
    if (sessionStorage.getItem('token')) {
      state.token = JSON.parse(sessionStorage.getItem('token')).token
      state.userId = JSON.parse(sessionStorage.getItem('token')).userId
    }
  },
  // 删除token
  del_token (state) {
    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token')
      state.token = ''
      state.userId = ''
    }
  },
  // 接口封装
  axios (state, {url, params, callback, method = 'post'}) {
    this._vm.$Loading()
    _axios({
      url: url,
      data: params,
      method: method,
      headers: {
        'Authorization': state.token,
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then(res => {
        if (res.data.errors[0].errorCode === '401') {
          if (sessionStorage.getItem('token')) {
            sessionStorage.removeItem('token')
            state.token = ''
            state.userId = ''
            setTimeout(() => {
              location.reload()
            }, 1000)
            return
          }
        }
        this._vm.$Loading.close()
        return callback(res.data)
      })
      .catch(err => {
        this._vm.$Loading.close()
        return callback(err)
      })
  }
}

const actions = {
  axios (context, value) {
    context.commit('axios', value)
  }
}

const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions
})

export default store
