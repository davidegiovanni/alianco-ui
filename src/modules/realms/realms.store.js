import AliancoService from '@revas/alianco-service'
import AnimoService from './animo.service'
import types from './realms.store.mutations'
import Axios from 'axios'
import _ from 'lodash'

const service = new AliancoService(Axios, {
  endpoint: process.env.REVAS_API_ENDPOINT
})
const animo = new AnimoService(Axios, {
  endpoint: process.env.REVAS_API_ENDPOINT
})
export default {
  namespaced: true,
  state: {
    isWaiting: false,
    citizens: []
  },
  getters: {
    isWaiting: (state) => {
      return state.isWaiting
    },
    citizens: (state) => {
      return state.citizens
    }
  },
  mutations: {
    [types.REALM_CREATE_REQUEST] (state) {
      state.isWaiting = true
    },
    [types.REALM_CREATE_SUCCESS] (state) {
      state.isWaiting = false
    },
    [types.REALM_CREATE_FAILURE] (state) {
      state.isWaiting = false
    },
    [types.REALMS_CITIZENS_QUERY_REQUEST] (state) {
      state.isWaiting = true
    },
    [types.REALMS_CITIZENS_QUERY_SUCCESS] (state, payload) {
      state.isWaiting = false
      state.citizens = payload
    },
    [types.REALMS_CITIZENS_QUERY_FAILURE] (state) {
      state.isWaiting = false
    },
    [types.REALMS_REMOVE_CITIZEN_REQUEST] (state) {
      state.isWaiting = true
    },
    [types.REALMS_REMOVE_CITIZEN_SUCCESS] (state, citizen) {
      state.isWaiting = false
      state.citizens = _.reject(state.citizens, ['user_hid', citizen.user_hid])
    },
    [types.REALMS_REMOVE_CITIZEN_FAILURE] (state) {
      state.isWaiting = false
    },
    [types.REALMS_ADD_CITIZEN_REQUEST] (state) {
      state.isWaiting = true
    },
    [types.REALMS_ADD_CITIZEN_SUCCESS] (state, citizen) {
      state.isWaiting = false
      state.citizens.push(citizen)
    },
    [types.REALMS_ADD_CITIZEN_FAILURE] (state) {
      state.isWaiting = false
    }
  },
  actions: {
    async createRealm ({ commit, dispatch }, payload) {
      commit(types.REALM_CREATE_REQUEST)
      try {
        const { data: { realm } } = await service.createRealm(payload.realm)
        commit(types.REALM_CREATE_SUCCESS)
        dispatch('app/updateRealms', realm, { root: true })
      } catch (e) {
        console.log(e)
        commit(types.REALM_CREATE_FAILURE)
      }
    },
    async queryCitizens ({commit}, realm) {
      commit(types.REALMS_CITIZENS_QUERY_REQUEST)
      try {
        const { data: { citizens } } = await service.queryCitizens(realm)
        const { data: { profiles } } = await animo.queryProfiles(citizens)
        const citizensWithProfile = _.map(citizens, function (citizen) {
          return _.assign({}, citizen, _.find(profiles, ['user_hid', citizen.user_hid]))
        })
        commit(types.REALMS_CITIZENS_QUERY_SUCCESS, citizensWithProfile)
      } catch (e) {
        commit(types.REALMS_CITIZENS_QUERY_FAILURE, e)
        throw e
      }
    },
    async addCitizen ({commit, rootGetters}, user) {
      commit(types.REALMS_ADD_CITIZEN_REQUEST)
      try {
        const realm = rootGetters['app/currentRealm']
        const { data: { citizen } } = await service.addCitizen(realm, {
          user_hid: user.user_hid,
          role: 'member'
        })
        commit(types.REALMS_ADD_CITIZEN_SUCCESS, Object.assign({}, user, citizen))
      } catch (e) {
        commit(types.REALMS_ADD_CITIZEN_FAILURE)
      }
    },
    async removeCitizen ({commit, rootGetters}, citizen) {
      commit(types.REALMS_REMOVE_CITIZEN_REQUEST)
      try {
        const realm = rootGetters['app/currentRealm']
        await service.removeCitizen(realm, citizen)
        commit(types.REALMS_REMOVE_CITIZEN_SUCCESS, citizen)
      } catch (e) {
        commit(types.REALMS_REMOVE_CITIZEN_FAILURE)
      }
    }
  }
}
