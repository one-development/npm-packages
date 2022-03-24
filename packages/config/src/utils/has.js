const { hasOwnProperty } = Object.prototype

module.exports = has

function has(object, key) {
  return object != null && hasOwnProperty.call(object, key)
}
