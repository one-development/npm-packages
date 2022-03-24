export default function createfontWeights() {
  const fontWeights = [400, 500, 700]

  /* eslint-disable prefer-destructuring */
  // Size aliases
  fontWeights.regular = fontWeights[0]
  fontWeights.bolder = fontWeights[1]
  fontWeights.boldest = fontWeights[2]
  /* eslint-enable prefer-destructuring */

  fontWeights.use = type => {
    if (!fontWeights[type]) throw new Error(`${type} is not a valid fontWeight`)
    return fontWeights[type]
  }

  return fontWeights
}
