// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Sender from './Sender/sender'

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  created: function () {
    Sender.post('http://localhost:2333/api/logout', {username: 'yinminqian7', password: '1212'})
  },
  components: {App},
  template: '<App/>'
})




