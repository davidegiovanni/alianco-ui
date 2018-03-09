// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'create-realm.create': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .pause(1000)
      .setValue('.nw-create-realm-name-input', 'org-name')
      .setValue('.nw-create-realm-logo-input', require('path').resolve(__dirname, '/../../assets/create-realm-logo.png'))
      .click('.nw-create-realm-create-button')
      .end()
  },
  'create-realm.cancel': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .pause(1000)
      .setValue('.nw-create-realm-name-input', 'org-name')
      .setValue('.nw-create-realm-logo-input', require('path').resolve(__dirname, '/../../assets/create-realm-logo.png'))
      .click('.nw-create-realm-create-button')
      .end()
  }
}
