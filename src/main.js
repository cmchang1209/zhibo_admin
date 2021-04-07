import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-theme-dark'
import VueSocketIOExt from 'vue-socket.io-extended'
import { io } from 'socket.io-client'
import './assets/icon/iconfont.css'
/* eslint-disable */
Vue.config.productionTip = false
Vue.use(ElementUI)

const socket = io('http://videostream.fidodarts.com:8003')
//const socket = io('http://192.168.2.130:8003')
Vue.use(VueSocketIOExt, socket)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
/* eslint-enable */
