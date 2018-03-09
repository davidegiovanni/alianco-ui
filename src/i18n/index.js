import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'it-IT',
  messages: {
    'it-IT': require('./it-IT.json')
  }
})

if (module.hot) {
  module.hot.accept(['./it-IT.json'], () => {
    i18n.setLocaleMessage('it-IT', require('./it-IT.json'))
  })
}

export default i18n
