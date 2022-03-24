import _ from 'lodash'

export default function createRadii() {
  const radii = ['0px', '4px', '8px', '100%']

  /* eslint-disable prefer-destructuring */
  radii.none = radii[0]
  radii.sm = radii[1]
  radii.lg = radii[2]
  radii.circular = radii[3]
  /* eslint-enable prefer-destructuring */

  radii.use = type => {
    if (!_.has(radii, type)) {
      throw new Error(`"${type}" is not a valid radius`)
    }

    return _.get(radii, type)
  }

  return radii
}
