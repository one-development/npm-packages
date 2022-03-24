export default function createFontSizes() {
  const toRem = size => `${size}rem`
  const fontSizes = [0.75, 0.8125, 0.875, 1, 1.25, 2.75, 3.75, 4.5].map(toRem)

  /* eslint-disable prefer-destructuring */
  // Display aliases
  fontSizes.display1 = fontSizes[7]
  fontSizes.display2 = fontSizes[6]
  fontSizes.display3 = fontSizes[5]
  fontSizes.heading1 = fontSizes[4]
  fontSizes.heading2 = fontSizes[3]

  // Text aliases
  fontSizes.standard = fontSizes[2]
  fontSizes.smaller = fontSizes[1]
  fontSizes.smallest = fontSizes[0]
  /* eslint-enable prefer-destructuring */

  fontSizes.use = type => {
    if (!fontSizes[type]) throw new Error(`${type} is not a valid fontSize`)
    return fontSizes[type]
  }

  return fontSizes
}
