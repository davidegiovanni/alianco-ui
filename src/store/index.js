import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@revas/auth-vue'

import realms from '@/modules/realms/realms.store'
import app from './app.store'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    app,
    realms,
    auth
  }
})
