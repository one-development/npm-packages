import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import ExtraPropTypes from '../utils/ExtraPropTypes'
import FilterStyledProps from '../utils/FilterStyledProps'
import isColor from '../utils/isColor'
import styleResets from '../utils/styleResets'
import useEventCallback from '../utils/useEventCallback'
import useFocusVisible from '../utils/useFocusVisible'
import useForkRef from '../utils/useForkRef'
import useInvariant from '../utils/useInvariant'
import { useTheme } from '../../themes'

const Root = styled.a(({ styleProps, theme }) => {
  const { borderWidths } = theme
  const { color, elementType, isFocusVisible, underline } = styleProps
  const outlineColor = color === 'inherit' ? 'currentColor' : color

  const resets = {
    ...styleResets,
    ...(elementType === 'button' && {
      '&::-moz-focus-inner': {
        borderStyle: 'none', // Remove Firefox dotted outline
      },
      '-moz-appearance': 'none', // Reset
      '-webkit-appearance': 'none', // Reset
      backgroundColor: 'transparent', // Reset default value
      border: 0, // Disable focus ring for mouse, touch, and keyboard users
      borderRadius: 0,
      font: 'inherit',
      letterSpacing: 'inherit',
      userSelect: 'none',
      WebkitTapHighlightColor: 'transparent',
    }),
  }

  return {
    ...resets,
    color,
    cursor: 'pointer',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    outline: 'none',
    textDecoration: underline === 'always' ? 'underline' : 'none',
    // eslint-disable-next-line sort-keys
    ':focus': {
      outline: isFocusVisible
        ? `${borderWidths.thick} solid ${outlineColor}`
        : 'none',
      outlineOffset: '1px',
      textDecoration: 'none',
    },
    // eslint-disable-next-line sort-keys
    '&:hover': {
      textDecoration: underline === 'none' ? 'none' : 'underline',
    },
    '&:visited, &:active': {
      color,
    },
  }
})

const Link = forwardRef(function Link(props, ref) {
  const {
    as,
    children,
    className,
    href,
    onBlur,
    onFocus,
    target,
    underline,
    color: colorProp,
    rel = target === '_blank' ? 'noopener' : null,
    ...rest
  } = props

  const elementType = as || 'a'
  const theme = useTheme()
  const color = _.get(theme.colors, colorProp, colorProp)

  useInvariant(
    color === 'inherit' || isColor(color),
    'Warning: Failed prop type: Invalid prop `color` supplied to `Link`'
  )

  const {
    createBlurHandler,
    createFocusHandler,
    isFocusVisible,
    register,
  } = useFocusVisible()

  const handleBlur = createBlurHandler(useEventCallback(onBlur))
  const handleFocus = createFocusHandler(useEventCallback(onFocus))

  return (
    <Root
      as={FilterStyledProps}
      className={className}
      forwardedAs={elementType}
      href={href}
      onBlur={handleBlur}
      onFocus={handleFocus}
      ref={useForkRef(ref, register)}
      rel={rel}
      target={target}
      styleProps={{
        color,
        elementType,
        isFocusVisible,
        underline,
      }}
      {...rest}
    >
      {children}
    </Root>
  )
})

const { color } = ExtraPropTypes

Link.displayName = 'Link'
Link.defaultProps = {
  as: 'a',
  color: 'brand',
  underline: 'always',
}
Link.propTypes = {
  /**
   * The DOM element or component used for the root.
   */
  as: PropTypes.any,
  /**
   * Any valid React node. Typically, this should be plain text.
   * However, it can also include icons or other
   * [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content).
   */
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Determines the color of the link. Can be set to 'inherit',
   * any key defined in theme.colors (supports "." syntax),
   * or any valid CSS color value (hex, rgb, etc.).
   */
  color: PropTypes.oneOfType([
    PropTypes.oneOf(['brand', 'brand2', 'error', 'inherit']),
    PropTypes.string,
    color,
  ]),
  /**
   * The URL to link to when the link is clicked.
   */
  href: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * Any valid value for the HTML rel attribute.
   * To improve security, rel defaults to 'noopener' when target is set to '_blank'.
   * Read more here: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
   */
  rel: PropTypes.string,

  /**
   * Any valid value for the HTML target attribute.
   */
  target: PropTypes.string,
  /**
   * Determines when the link should have display underline text decoration.
   */
  underline: PropTypes.oneOf(['none', 'hover', 'always']),
}

export default Link
