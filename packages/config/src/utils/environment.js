const has = require('./has')

module.exports = {
  getEnvironment,
  getInGlobal,
  setHandlers,
  setInGlobal,
}

const implementation = {
  get(key) {
    const { isBrowser, isServer } = getEnvironment()

    if (isBrowser && has(window, key)) return window[key]

    if (isServer && has(global, key)) return global[key]

    return undefined
  },
  set(key, value) {
    const { isBrowser, isServer } = getEnvironment()

    if (isBrowser) window[key] = value

    if (isServer) global[key] = value
  },
}

function getEnvironment() {
  const isBrowser = typeof window !== 'undefined'
  const isServer = typeof window === 'undefined'

  return {
    isBrowser,
    isServer,
  }
}

function getInGlobal(key) {
  return implementation.get(key)
}

function setHandlers({ get, set }) {
  if (get) implementation.get = get
  if (set) implementation.set = set
}

function setInGlobal(key, value) {
  implementation.set(key, value)
}
