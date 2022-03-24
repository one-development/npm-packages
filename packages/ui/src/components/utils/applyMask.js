import _ from 'lodash'

const takeNextMatch = (chars, regexp = /^.$/) => {
  if (chars.length === 0) return ''
  const next = chars.shift()
  return regexp.test(next) ? next : takeNextMatch(chars, regexp)
}

export default function applyMask(mask, value = '') {
  // Mask must include at least one #, must not include _, and must end with #
  if (!/^([^#]*[#]+)+$/g.test(mask)) {
    throw new Error(
      [
        'Invalid mask format. ',
        'A valid mask must include at least one "#", ',
        'must end with a "#", and',
        'must not include "_".',
      ].join('')
    )
  }

  // Format the value and add "_" for placeholder characters
  const paddedValue = _.padEnd(value, mask.length, '_')
  const valueChars = paddedValue.split('')
  const maskChars = mask.split('')

  return _.reduce(
    maskChars,
    (result, maskChar) => {
      // Allow letters, numbers, and underscores
      if (maskChar === '#')
        return `${result}${takeNextMatch(valueChars, /^[a-zA-Z0-9_]$/)}`
      // Allow any next letter
      if (maskChar === valueChars[0])
        return `${result}${takeNextMatch(valueChars)}`
      // Insert the mask character
      return `${result}${maskChar}`
    },
    ''
  )
}
