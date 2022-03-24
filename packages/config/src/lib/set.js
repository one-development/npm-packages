const extend = require('./extend')

function set(key, value, dangerously = false) {
  extend({ [key]: value }, dangerously)
}

module.exports = set
