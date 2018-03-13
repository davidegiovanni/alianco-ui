import AliancoService from '@revas/alianco-service'
import types from './app.store.mutations'
import Axios from 'axios'

const service = new AliancoService(Axios, {
  endpoint: process.env.REVAS_API_ENDPOINT
})
export default {
  namespaced: true,
  state: {
    isWaiting: false,
    realms: [],
    currentRealm: null
  },
  getters: {
    isWaiting: (state) => {
      return state.isWaiting
    },
    realms: (state) => {
      return state.realms
    },
    currentRealm: (state) => {
      return state.currentRealm
    }
  },
  mutations: {
    [types.APP_UPDATE_REALMS_ADD_REALM] (state, payload) {
      state.realms.push(payload)
    },
    [types.APP_UPDATE_REALMS_QUERY_REALMS_REQUEST] (state) {
      state.isWaiting = true
    },
    [types.APP_UPDATE_REALMS_QUERY_REALMS_SUCCESS] (state, payload) {
      state.isWaiting = false
      state.realms = payload
    },
    [types.APP_UPDATE_REALMS_QUERY_REALMS_FAILURE] (state) {
      state.isWaiting = false
      // errors
    },
    [types.APP_CHANGE_REALM] (state, payload) {
      state.currentRealm = payload
    }
  },
  actions: {
    async init ({ state, dispatch }) {
      try {
        await dispatch('updateRealms')
        if (state.realms.length > 0) {
          await dispatch('changeRealm', state.realms[0])
        }
      } catch (e) {
        throw e
      }
    },
    async changeRealm ({commit}, realm) {
      commit(types.APP_CHANGE_REALM, realm)
    },
    async updateRealms ({commit, dispatch}, realm) {
      if (realm) {
        commit(types.APP_UPDATE_REALMS_ADD_REALM, realm)
        await dispatch('changeRealm', realm)
        await dispatch('realms/queryCitizens', realm, { root: true })
      } else {
        commit(types.APP_UPDATE_REALMS_QUERY_REALMS_REQUEST)
        try {
          const { data: {realms} } = await service.queryRealms()
          commit(types.APP_UPDATE_REALMS_QUERY_REALMS_SUCCESS, realms)
        } catch (e) {
          commit(types.APP_UPDATE_REALMS_QUERY_REALMS_FAILURE, e)
          throw e
        }
      }
    }
  }
}
