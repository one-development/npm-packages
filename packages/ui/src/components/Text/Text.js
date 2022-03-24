import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { system } from 'styled-system'
import resets from '../utils/styleResets'
import Box from '../Box'

/* eslint-disable sort-keys */
const defaultVariantMapping = {
  display1: 'h2',
  display2: 'h2',
  display3: 'h2',
  h1: 'h1',
  h2: 'h2',
  subtitle: 'h6',
  body: 'p',
  button: 'span',
  caption: 'p',
  overline: 'p',
  label: 'span',
}
/* eslint-enable sort-keys */

/**
 * The crop and vertical-align calculations are derived from an approach outlined in here:
 * https://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align
 *
 * The calculation solves 2 problems:
 * 1. It uses vertical-align to center text, ignoring ascender and descender
 * 2. It users margin (via ::before element) and translateY to "crop" whitespace
 *
 * If you are unfamiliar with the basic problems, please read:
 * https://material.io/design/typography/understanding-typography.html
 */
const getVerticalAlign = ({ theme, variant }) => {
  const { fontSize } = theme.typography.use(variant)
  const fontSizeRem = theme.typography.remToValue(fontSize)
  const font = variant.includes('display')
    ? theme.fonts.display
    : theme.fonts.text
  const { ascenderScale, descenderScale } = font.metrics
  // Convert the base font's metrics to rem based on the desired font size
  const ascenderRem = fontSizeRem * ascenderScale
  const descenderRem = fontSizeRem * descenderScale

  // Calculate the amount to shift so that capital letters are centered
  const verticalAlign = (descenderRem - ascenderRem) * -0.5
  return `${verticalAlign}rem`
}

const getCropStyles = ({ theme, variant }) => {
  const styles = theme.typography.use(variant)
  const fontSizeRem = theme.typography.remToValue(styles.fontSize)
  const lineHeightRem = theme.typography.remToValue(styles.lineHeight)
  const font = variant.includes('display')
    ? theme.fonts.display
    : theme.fonts.text
  const { capHeightScale } = font.metrics

  // Convert the base font's metrics to rem based on the desired font size
  const capHeightRem = fontSizeRem * capHeightScale

  // Calculate the height correction to remove excessive whitespace from lineHeight
  const verticalAlign = theme.typography.remToValue(
    getVerticalAlign({ theme, variant })
  )
  const lineHeight = lineHeightRem - verticalAlign
  const heightFix = lineHeightRem - capHeightRem
  const preventCollapse = 0.1

  return {
    '::before': {
      content: '""',
      display: 'block',
      height: 0,
      marginTop: `-${heightFix + preventCollapse}rem`,
    },
    lineHeight: `${lineHeight}rem`,
    paddingTop: `${preventCollapse}rem`,
    transform: `translateY(${heightFix / 2}rem)`,
  }
}

const Root = styled.div(
  ({ theme, styleProps, ...rest }) => {
    const { variant } = styleProps
    const cropStyles = getCropStyles({ theme, variant })
    const variantStyles = theme.typography.use(variant)
    const fontStyles = Object.keys(variantStyles).reduce((result, key) => {
      if (!_.isUndefined(rest[key])) return result
      return { ...result, [key]: variantStyles[key] }
    }, {})

    return {
      ...fontStyles,
      ...cropStyles,
    }
  },
  system({
    fontWeight: {
      property: 'fontWeight',
      scale: 'fontWeights',
    },
    textAlign: true,
    textDecoration: true,
    textTransform: true,
  })
)

const Content = styled.span(({ theme, styleProps }) => ({
  ...resets,
  backgroundColor: `rgba(0,0,0,0)`,
  display: 'block',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  textTransform: 'inherit',
  verticalAlign: getVerticalAlign({
    theme,
    variant: styleProps.variant,
  }),
  ...(styleProps.truncate && {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
}))

const Text = forwardRef(function Text(props, ref) {
  const {
    align,
    as,
    backgroundColor,
    className,
    children,
    color,
    decoration,
    opacity,
    transform,
    truncate,
    variant,
    variantMapping,
    weight,
    ...rest
  } = props
  const forwardedAs =
    as || variantMapping[variant] || defaultVariantMapping[variant] || 'span'

  return (
    <Root
      {...rest}
      as={Box}
      backgroundColor={backgroundColor}
      className={className}
      color={color}
      display='block'
      fontWeight={weight}
      forwardedAs={forwardedAs}
      opacity={opacity}
      ref={ref}
      textAlign={align}
      textDecoration={decoration}
      textTransform={transform}
      styleProps={{ variant }}
    >
      <Content styleProps={{ truncate, variant }}>{children}</Content>
    </Root>
  )
})

Text.displayName = 'Text'

Text.defaultProps = {
  align: 'initial',
  backgroundColor: 'initial',
  color: 'inherit',
  truncate: false,
  variant: 'body',
  variantMapping: defaultVariantMapping,
}

Text.propTypes = {
  /**
   * Any valid CSS text-align property value. `responsive prop`
   */
  align: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * The DOM element or component used for the root.
   * This prop will override the behavior of the "variantMapping" prop.
   */
  as: PropTypes.string,
  /**
   * Any named key defined in theme.colors (supports "." syntax) or
   * a custom hex value. `responsive prop`
   */
  backgroundColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * Text content to display. Should generally be plain text, but can also
   * include phrasing content elements, like `<b>`, `<em>`, or `<i>`. Note:
   * restrict to elements that are valid descendents of `span`.
   */
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Any named key defined in theme.colors (supports "." syntax) or
   * a custom hex value. `responsive prop`
   */
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * Use any valid CSS text-decoration value to override variant style.
   * `responsive prop`
   */
  decoration: PropTypes.string,
  /**
   * A valid CSS opacity property value. `responsive prop`
   */
  opacity: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * Use any valid CSS text-transform value to override variant style. `responsive prop`
   */
  transform: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * If true, the text will not wrap but instead will truncate and have an ellipsis
   */
  truncate: PropTypes.bool,
  /**
   * Applies styles of the variant from theme.typography. See the available theme
   * props [here](/?path=/docs/theme-reference--page#font-weights)
   */
  variant: PropTypes.oneOf([
    'body',
    'button',
    'caption',
    'display1',
    'display2',
    'display3',
    'h1',
    'h2',
    'subtitle',
    'overline',
    'label',
  ]),
  variantMapping: PropTypes.object,
  /**
   * Use any alias or index defined in `theme.fontWeights` to override variant style.
   * NOTE: the list below may be non-exhaustive. View the theme structure
   * [here](/?path=/docs/theme-reference--page#font-weights). `responsive prop`
   */
  weight: PropTypes.oneOfType([
    PropTypes.oneOf(['regular', 'bolder', 'boldest']),
    PropTypes.array,
    PropTypes.object,
  ]),
}

export default Text
