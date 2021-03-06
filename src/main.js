import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import axios from 'axios'
// 引入element-tiptap
import { ElementTiptapPlugin } from 'element-tiptap'
// import element-tiptap 样式
import 'element-tiptap/lib/index.css'

Vue.use(ElementUI)
Vue.use(ElementTiptapPlugin, {
  lang: 'zh'
})
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
