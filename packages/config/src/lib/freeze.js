const constants = require('../utils/constants')
const { getInGlobal, setInGlobal } = require('../utils/environment')

function freeze() {
  const rawConfig = getInGlobal(constants.globalKey) || {}
  const state = rawConfig[constants.stateKey]
  const nextState = {
    ...state,
    isFrozen: true,
  }
  setInGlobal(constants.globalKey, {
    ...rawConfig,
    [constants.stateKey]: nextState,
  })
}

module.exports = freeze
