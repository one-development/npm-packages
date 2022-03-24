import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import resets from '../utils/styleResets'

const Root = styled.button(({ theme, ...props }) => ({
  ...resets,
  '&::-moz-focus-inner': {
    borderStyle: 'none', // Remove Firefox dotted outline
  },
  '-moz-appearance': 'none', // Reset
  '-webkit-appearance': 'none', // Reset
  alignItems: 'center',
  backgroundColor: 'transparent', // Reset default value
  border: 0, // Disable focus ring for mouse, touch, and keyboard users
  borderRadius: 0,
  color: 'inherit',
  cursor: 'pointer',
  display: 'inline-flex',
  justifyContent: 'center',
  margin: 0, // Remove the margin in Safari
  outline: 0, // Disable focus ring for mouse, touch, and keyboard users
  padding: 0, // Remove the padding in Firefox
  position: 'relative',
  textDecoration: 'none', // Remove <a/> element styling
  userSelect: 'none',
  verticalAlign: 'middle',
  WebkitTapHighlightColor: 'transparent',
  ...(props.disabled && {
    cursor: 'not-allowed',
    pointerEvents: 'none', // Disable link interactions
  }),
}))

const getButtonAttributes = ({
  disabled,
  elementType,
  href,
  styleProps, // This may have been passed from parent into a Styled Component
  type,
  ...attributes
}) => {
  const tabIndex = disabled ? -1 : attributes.tabIndex

  // If it's a button element, add the normal props, including type
  if (elementType === 'button') {
    return {
      ...attributes,
      disabled,
      tabIndex,
      type,
    }
  }

  // Only allow attributes related to anchor tags
  if (elementType === 'a' && href) {
    return {
      ...attributes,
      'aria-disabled': disabled,
      href,
      tabIndex,
    }
  }

  // Add appropriate aria attributes to describe a button for HTML elements
  if (_.isString(elementType)) {
    return {
      ...attributes,
      'aria-disabled': disabled,
      role: 'button',
      tabIndex,
    }
  }

  // For custom components, we will just pass all props through
  return {
    ...attributes,
    'aria-disabled': disabled,
    role: 'button',
    tabIndex,
  }
}

/**
 * `ButtonBase` contains as few styles as possible.
 * It aim to be a simple building block for creating a button.
 * It contains style resets and some focus/touch treatments
 */
const ButtonBase = React.forwardRef(function ButtonBase(props, ref) {
  const { as, href, children, ...rest } = props
  const elementType = as === 'button' && href ? 'a' : as

  return (
    <Root
      as={elementType}
      ref={ref}
      {...getButtonAttributes({ ...rest, elementType, href })}
    >
      {children}
    </Root>
  )
})

ButtonBase.displayName = 'ButtonBase'

ButtonBase.defaultProps = {
  as: 'button',
  disabled: false,
  type: 'button',
}

ButtonBase.propTypes = {
  'aria-describedby': PropTypes.string,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  as: PropTypes.elementType,
  /**
   * Determines if the button should focus on first mount
   */
  autoFocus: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * If `true`, the base button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   */
  form: PropTypes.string,
  /**
   * @ignore
   */
  formAction: PropTypes.string,
  /**
   * @ignore
   */
  formEncType: PropTypes.oneOf([
    'applicationx-www-form-urlencoded',
    'multipart/form-data',
    'text/plain',
  ]),

  /**
   * @ignore
   */
  formMethod: PropTypes.oneOf(['get', 'post']),
  /**
   * @ignore
   */
  formNoValidate: PropTypes.bool,
  /**
   * @ignore
   */
  formTarget: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
  /**
   * Id for the HTML element
   */
  id: PropTypes.string,
  /**
   * Name for the HTML element
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onDragLeave: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * @ignore
   */
  onMouseDown: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
  /**
   * @ignore
   */
  onMouseUp: PropTypes.func,
  /**
   * @ignore
   */
  onTouchEnd: PropTypes.func,
  /**
   * @ignore
   */
  onTouchMove: PropTypes.func,
  /**
   * @ignore
   */
  onTouchStart: PropTypes.func,
  /**
   * @ignore
   */
  role: PropTypes.string,
  /**
   * @ignore
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Used to control the button's purpose.
   * This prop passes the value to the `type` attribute of the native button component.
   */
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
}

export default ButtonBase
