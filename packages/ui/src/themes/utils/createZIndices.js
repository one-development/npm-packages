import _ from 'lodash'

export default function createZIndices() {
  const zIndices = [1100, 1200, 1300, 1400, 1500]

  /* eslint-disable prefer-destructuring */
  zIndices.appbar = zIndices[0]
  zIndices.drawer = zIndices[1]
  zIndices.modal = zIndices[2]
  zIndices.notification = zIndices[3]
  zIndices.tooltip = zIndices[4]
  /* eslint-enable prefer-destructuring */

  zIndices.use = type => {
    if (!_.has(zIndices, type)) {
      throw new Error(`"${type}" is not a valid z-index type`)
    }

    return _.get(zIndices, type)
  }

  return zIndices
}
