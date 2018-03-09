/* eslint-disable camelcase */
import _ from 'lodash'
import queryString from 'query-string'

export default class AnimoService {
  constructor ($http, config) {
    this.$http = $http
    this.config = config
  }
  async getProfile (user) {
    if (user === undefined) {
      user = {
        user_hid: 'me'
      }
    }
    return this.$http.get(this.config.endpoint + `/users/${user.user_hid}`)
  }
  async queryProfiles (users, search) {
    const users_hid = _.map(users, 'user_hid')
    let queryObject = {
      users_hid: users_hid
    }
    if (search !== undefined) {
      queryObject.search = search
    }
    const query = queryString.stringify(queryObject)
    return this.$http.get(this.config.endpoint + `/users?${query}`)
  }
  async updateProfile (profile, user) {
    if (user === undefined) {
      user = {
        user_hid: 'me'
      }
    }
    return this.$http.put(this.config.endpoint + `/users/${user.user_hid}`, profile)
  }
}
