import _ from 'lodash'

export default function createTypography({ fonts, fontSizes, fontWeights }) {
  if (!_.isObject(fonts))
    throw new Error(`Expected "fonts" to be an object, but received: ${fonts}`)
  if (!_.isArray(fontSizes))
    throw new Error(
      `Expected "fontSizes" to be an array, but received: ${fontSizes}`
    )
  if (!_.isArray(fontWeights))
    throw new Error(
      `Expected "fontWeights" to be an array, but received: ${fontWeights}`
    )

  const { display, text } = fonts
  const createTypeStyles = ({
    fontFamily = text.family,
    fontSize,
    fontWeight = fontWeights.regular,
    lineHeight,
    textTransform = 'none',
  }) => {
    const styles = {
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
      textTransform,
    }

    const prototype = {
      toString() {
        return Object.keys(this)
          .map(key => `\n  ${_.kebabCase(key)}: ${this[key]};`)
          .join('')
      },
    }

    // eslint-disable-next-line fp/no-mutating-assign
    return Object.assign(Object.create(prototype), styles)
  }

  /* eslint-disable sort-keys */
  const typography = {
    display1: createTypeStyles({
      fontFamily: display.family,
      fontSize: fontSizes.display1,
      fontWeight: fontWeights.boldest,
      lineHeight: '4.75rem',
    }),
    display2: createTypeStyles({
      fontFamily: display.family,
      fontSize: fontSizes.display2,
      fontWeight: fontWeights.boldest,
      lineHeight: '4rem',
    }),
    display3: createTypeStyles({
      fontFamily: display.family,
      fontSize: fontSizes.display3,
      fontWeight: fontWeights.boldest,
      lineHeight: '3rem',
    }),
    h1: createTypeStyles({
      fontSize: fontSizes.heading1,
      fontWeight: fontWeights.boldest,
      lineHeight: '1.75rem',
    }),
    h2: createTypeStyles({
      fontSize: fontSizes.heading2,
      fontWeight: fontWeights.boldest,
      lineHeight: '1.5rem',
    }),
    subtitle: createTypeStyles({
      fontSize: fontSizes.heading2,
      fontWeight: fontWeights.bolder,
      lineHeight: '1.5rem',
    }),
    body: createTypeStyles({
      fontSize: fontSizes.standard,
      lineHeight: '1.25rem',
    }),
    button: createTypeStyles({
      fontSize: fontSizes.standard,
      fontWeight: fontWeights.boldest,
      lineHeight: '1.25rem',
      textTransform: 'capitalize',
    }),
    label: createTypeStyles({
      fontSize: fontSizes.smaller,
      fontWeight: fontWeights.boldest,
      lineHeight: '1.25rem',
    }),
    caption: createTypeStyles({
      fontSize: fontSizes.smallest,
      lineHeight: '1rem',
    }),
    overline: createTypeStyles({
      fontSize: fontSizes.smallest,
      lineHeight: '1rem',
      textTransform: 'uppercase',
    }),
    remToValue(remValue) {
      return _.toNumber(remValue.replace('rem', ''))
    },
    use(type) {
      const styles = _.get(typography, type)
      if (!styles) throw new Error(`"${type}" is not a valid type`)
      return styles
    },
    useImportant(type) {
      const styles = _.get(typography, type)
      if (!styles) throw new Error(`"${type}" is not a valid type`)
      return _.mapValues(styles, value => `${value} !important`)
    },
  }
  /* eslint-enable sort-keys */

  return typography
}
