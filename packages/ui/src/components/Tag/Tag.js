import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import CloseIcon from '../../icons/Close'
import { useTheme } from '../../themes'
import ButtonBase from '../ButtonBase'
import Text from '../Text'
import useEventCallback from '../utils/useEventCallback'
import ExtraPropTypes from '../utils/ExtraPropTypes'
import isColor from '../utils/isColor'
import useFocusVisible from '../utils/useFocusVisible'
import useInvariant from '../utils/useInvariant'
import resets from '../utils/styleResets'
import showIf from '../utils/showIf'

const Root = styled.div(({ theme, styleProps }) => {
  const { colors, radii, sizes } = theme
  const { color, rounded, variant } = styleProps

  const fillColor =
    color === 'neutral' ? colors.onSurface.primary : colors[color] || color
  const textColor =
    color === 'neutral' ? colors.on(fillColor) : colors.on(color)

  return {
    ...resets,
    alignItems: 'center',
    backgroundColor: fillColor,
    borderRadius: rounded ? sizes.badgeHeight : radii.sm,
    color: textColor,
    display: 'flex',
    height: sizes.badgeHeight,
    overflow: 'hidden',
    position: 'relative',
    ...(variant === 'outline' && {
      backgroundColor: 'transparent',
      borderColor: fillColor,
      borderSize: '1px',
      borderStyle: 'solid',
      color: fillColor,
    }),
  }
})

const Label = styled.div(({ theme, styleProps }) => {
  const { closeable, closeButtonPosition, icon, iconPosition } = styleProps
  return {
    margin: theme.space.custom(0, 1.5),
    ...(closeable &&
      closeButtonPosition === 'start' && {
        marginLeft: theme.space.sm,
      }),
    ...(closeable &&
      closeButtonPosition === 'end' && {
        marginRight: theme.space.sm,
      }),
    ...(icon &&
      iconPosition === 'start' && {
        marginLeft: theme.space.sm,
      }),
    ...(icon &&
      iconPosition === 'end' && {
        marginRight: theme.space.sm,
      }),
  }
})

const Icon = styled.div(({ theme, styleProps }) => ({
  display: 'flex',
  marginLeft:
    styleProps.iconPosition === 'start' ? theme.space.sm : theme.space.xs,
  marginRight:
    styleProps.iconPosition === 'start' ? theme.space.xs : theme.space.sm,
}))

const CloseButton = styled.div(({ theme, styleProps }) => {
  const { color, isFocusVisible, variant } = styleProps
  const { colors } = theme

  const fillColor =
    color === 'neutral' ? colors.onSurface.primary : colors[color] || color
  const textColor =
    color === 'neutral' ? colors.on(fillColor) : colors.on(color)

  return {
    cursor: 'pointer',
    height: '100%',
    paddingLeft: theme.space.sm,
    paddingRight: theme.space.sm,
    // eslint-disable-next-line sort-keys
    '&:hover': {
      backgroundColor: colors.state('focused', {
        on: fillColor,
        stroke: textColor,
      }),
    },
    ...(isFocusVisible && {
      backgroundColor: colors.state('focused', {
        on: fillColor,
        stroke: textColor,
      }),
    }),
    ...(variant === 'outline' && {
      '&:hover': {
        backgroundColor: fillColor,
        color: textColor,
      },
      ...(isFocusVisible && {
        backgroundColor: fillColor,
        color: textColor,
      }),
    }),
  }
})

/**
 * Use a Tag to display keywords that describe an item. Common tags include
 * an item's attributes, category, or labels.
 */
const Tag = forwardRef((props, ref) => {
  const {
    as,
    children,
    className,
    closeable,
    // eslint-disable-next-line react/prop-types
    closeButtonAriaLabel = `Remove ${children}`,
    // eslint-disable-next-line react/prop-types
    closeButtonPosition = 'end',
    color,
    icon,
    // eslint-disable-next-line react/prop-types
    iconPosition = 'start',
    onClose,
    rounded,
    variant,
    ...rest
  } = props

  // Check if color prop is either a theme color, 'neutral', or a valid hex code
  const theme = useTheme()

  // Validate deprecated/misconfigured props
  useInvariant(
    color === 'neutral' || isColor(theme.colors[color] || color),
    'Warning: Failed prop type: Invalid prop `color` supplied to `Tag`'
  )

  useInvariant(
    !_.has(props, 'closeButtonPosition'),
    'Warning: Deprecated prop type: The prop `closeButtonPosition` is deprecated.'
  )

  useInvariant(
    !_.has(props, 'iconPosition'),
    'Warning: Deprecated prop type: The prop `iconPosition` is deprecated.'
  )

  useInvariant(
    !_.has(props, 'closeButtonAriaLabel'),
    'Warning: Deprecated prop type: The prop `closeButtonAriaLabel` is deprecated.'
  )

  useInvariant(
    closeButtonPosition !== iconPosition,
    'Warning: Incompatible prop types: The props `iconPosition` and `closeButtonPosition` must not be the same.'
  )

  const {
    createBlurHandler,
    createFocusHandler,
    isFocusVisible,
    register,
  } = useFocusVisible()
  const handleBlur = createBlurHandler()
  const handleFocus = createFocusHandler()

  const handleCloseButtonClick = useEventCallback(e => {
    e.stopPropagation()
    if (onClose) onClose()
  })

  const iconEl = <Icon styleProps={{ iconPosition }}>{icon}</Icon>

  const closeButtonEl = (
    <CloseButton
      as={ButtonBase}
      aria-label={closeButtonAriaLabel}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onClick={handleCloseButtonClick}
      ref={register}
      styleProps={{ color, isFocusVisible, variant }}
    >
      <CloseIcon scalable={false} color='inherit' />
    </CloseButton>
  )

  return (
    <Root
      {...rest}
      as={as}
      className={className}
      forwardedAs={as}
      ref={ref}
      styleProps={{
        color,
        rounded,
        variant,
      }}
    >
      {showIf(closeable && closeButtonPosition === 'start')(closeButtonEl)}
      {showIf(icon && iconPosition === 'start')(iconEl)}
      <Label
        as={Text}
        forwardedAs='span'
        variant='caption'
        styleProps={{ closeable, closeButtonPosition, icon, iconPosition }}
      >
        {children}
      </Label>
      {showIf(icon && iconPosition === 'end')(iconEl)}
      {showIf(closeable && closeButtonPosition === 'end')(closeButtonEl)}
    </Root>
  )
})

Tag.displayName = 'Tag'
Tag.defaultProps = {
  as: 'span',
  closeable: false,
  color: 'neutral',
  rounded: false,
  variant: 'filled',
}

const { color } = ExtraPropTypes

Tag.propTypes = {
  /**
   * The component used for the root node
   * (either a string to use as DOM element or a React component)
   */
  as: PropTypes.elementType,
  /**
   * Sets the text content of the tag. Children must be plain text.
   */
  children: PropTypes.string,
  className: PropTypes.string,
  /**
   * Determines if the Tag can be closed/deleted/removed.
   * A close icon will be displayed to the right of the text.
   */
  closeable: PropTypes.bool,
  /**
   * Determines the tag's color.
   */
  color: PropTypes.oneOfType([
    PropTypes.oneOf(['brand', 'brand2', 'error', 'info', 'neutral', 'warning']),
    color,
  ]),
  /**
   * Sets the icon to the left of the Tag text.
   */
  icon: PropTypes.node,
  /**
   * Callback for when a user clicks the close button.
   */
  onClose: PropTypes.func,
  /**
   * Determines the tag's border radius.
   */
  rounded: PropTypes.bool,
  /**
   * Determines the tag's background and border colors.
   */
  variant: PropTypes.oneOf(['filled', 'outline']),
}
export default Tag
