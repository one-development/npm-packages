const name = 'one-config'
const stateKey = `${name}/state`

module.exports = {
  fileName: 'config.js',
  globalKey: name,
  internalKeys: [stateKey],
  serverKey: '__server',
  stateKey,
}
