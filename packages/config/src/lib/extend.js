const constants = require('../utils/constants')
const {
  getEnvironment,
  getInGlobal,
  setInGlobal,
} = require('../utils/environment')

module.exports = (updates = {}, dangerously = false) => {
  const { isBrowser } = getEnvironment()
  const rawConfig = getInGlobal(constants.globalKey) || {}
  const state = rawConfig[constants.stateKey]
  const { isFrozen, isPublished } = state

  if (isFrozen) return
  if (isBrowser && !dangerously) return
  if (isPublished && !dangerously) return

  setInGlobal(constants.globalKey, {
    ...rawConfig,
    ...updates,
  })
}
