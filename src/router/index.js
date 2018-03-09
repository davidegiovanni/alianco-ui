import Vue from 'vue'
import Router from 'vue-router'

import realms from '@/modules/realms/realms.router'

Vue.use(Router)

const routes = [].concat(realms)

export default new Router({
  mode: 'history',
  routes: routes.concat([{
    path: '*',
    redirect: '/list'
  }])
})
