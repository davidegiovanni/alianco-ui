// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import RevasComponents from '@revas/design-vue-components'
import { sync } from 'vuex-router-sync'

Vue.use(RevasComponents)
Vue.use(VueAxios, Axios)
sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
