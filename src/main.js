import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/icon/local.css' // 引入 vant 本地 icon 样式文件
import Vconsole from 'vconsole' // 移动端调试工具
import { Icon, Dialog, Toast } from 'vant' // 需要全局引入的 vant 组件

/**
 * vw、vh 单位的兼容性处理
 */
const hacks = require('viewport-units-buggyfill/viewport-units-buggyfill.hacks')
require('viewport-units-buggyfill').init({
  hacks: hacks
})

/**
 * 在非生产环境下，打开 vConsole 调试工具
 */
if (process.env.NODE_ENV !== 'production') {
  const vConsole = new Vconsole()
  Vue.use(vConsole)
}

/**
 * 全局挂载 vant 组件
 */
Vue.use(Icon)
Vue.use(Dialog)
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
