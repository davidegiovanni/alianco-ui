'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  OAUTH_DOMAIN: '"hashbardd.eu.auth0.com"',
  OAUTH_CLIENT_ID: '"fL1MYYR1BQ85gOSp4WN9R2SOwWqm2C2O"',
  OAUTH_REDIRECT_URI: '"http://localhost:8080"',
  REVAS_API_ENDPOINT: '"http://localhost"'
})
