const omit = require('lodash/omit')
const constants = require('../utils/constants')
const { getInGlobal, setInGlobal } = require('../utils/environment')
const config = require('./config')

function forBrowser() {
  const rawConfig = getInGlobal(constants.globalKey) || {}
  const state = rawConfig[constants.stateKey]
  const nextState = {
    ...state,
    isPublished: true,
  }
  setInGlobal(constants.globalKey, {
    ...rawConfig,
    [constants.stateKey]: nextState,
  })

  return omit(config(), constants.serverKey)
}

module.exports = forBrowser
