const forBrowser = require('./forBrowser')

function forFile() {
  const fileConfig = JSON.stringify(forBrowser())

  return `
const config = ${fileConfig} || {}
module.exports = {
  config() {
    return config
  },
  get(key) {
    return config[key]
  },
}
`
}

module.exports = forFile
