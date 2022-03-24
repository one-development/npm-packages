const cosmic = require('cosmiconfig')
const isObject = require('lodash/isObject')
const constants = require('../utils/constants')
const {
  getEnvironment,
  setHandlers,
  setInGlobal,
} = require('../utils/environment')

const prepareConfig = (config = {}) => {
  const initialState = {
    [constants.stateKey]: {
      isFrozen: false,
    },
  }

  return {
    ...config,
    ...initialState,
  }
}

const transform = result => {
  const isConfigObject = isObject(result.config)
  // eslint-disable-next-line no-underscore-dangle
  const isESModule = isConfigObject && result.config.__esModule

  if (!isConfigObject) {
    throw new Error(`${result.filepath} must be an Object`)
  }

  if (isESModule && !result.config.default) {
    throw new Error(
      `${result.filepath} must use default export with ES Modules`
    )
  }

  const config = isESModule ? result.config.default : result.config

  return {
    ...result,
    config,
  }
}

const explorer = cosmic('config', { transform })

const initialize = (source, handlers = {}) => {
  setHandlers(handlers)

  if (isObject(source)) {
    const config = prepareConfig(source)
    setInGlobal(constants.globalKey, config)
    return
  }

  const { isServer } = getEnvironment()

  if (isServer) {
    try {
      const result = source ? explorer.loadSync(source) : explorer.searchSync()
      const config = prepareConfig(result.config)

      setInGlobal(constants.globalKey, config)
    } catch (e) {
      /* eslint-disable no-console */
      console.error(`Encountered error: ${e}`)
      console.log('Initializing empty config...')
      /* eslint-enable */
      setInGlobal(constants.globalKey, prepareConfig())
    }
  }
}

module.exports = initialize
