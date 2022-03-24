import _ from 'lodash'

export default function createShadows() {
  const shadows = [
    'none',
    '0 1px 4px rgba(0,0,0,0.16)',
    '0 2px 8px rgba(0,0,0,0.16)',
    '0 4px 16px rgba(0,0,0,0.16)',
    '0 8px 24px rgba(0,0,0,0.16)',
    '0 20px 32px rgba(0,0,0,0.16)',
  ]

  /* eslint-disable prefer-destructuring */
  shadows.none = shadows[0]
  shadows.xs = shadows[1]
  shadows.sm = shadows[2]
  shadows.md = shadows[3]
  shadows.lg = shadows[4]
  shadows.xl = shadows[5]
  /* eslint-enable prefer-destructuring */

  shadows.use = (type = 'default') => {
    if (!_.has(shadows, type)) {
      throw new Error(`"${type}" is not a valid shadow type`)
    }

    return _.get(shadows, type)
  }

  return shadows
}
