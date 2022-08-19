import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import * as filters from '@/filters' // 引入工具类
// 注册全局的过滤器
Object.keys(filters).forEach(key => {
  // 注册过滤器
  Vue.filter(key, filters[key])
})
// 自定义指令
import * as directivces from '@/directivces'
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
// 全局组件
import components from '@/components'
import Print from 'vue-print-nb'
Vue.use(Print)
Vue.use(components)
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
// 循环添加自定义指令
for (const key in directivces) {
  Vue.directive(key, directivces[key])
}
// Vue.directive('imgError', {
//   inserted: function(element, { value }) {
//     element.onerror = function() {
//       element.src = value
//     }
//   }
// })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
