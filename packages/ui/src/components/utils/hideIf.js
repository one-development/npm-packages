import _ from 'lodash'

const hideIf = condition => result => {
  if (condition) return null
  return _.isFunction(result) ? result() : result
}

export default hideIf
