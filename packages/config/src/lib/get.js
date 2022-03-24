const config = require('./config')

module.exports = key => (config() || {})[key]
