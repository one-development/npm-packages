import Color from 'color'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import ButtonBase from '../ButtonBase'
import Spinner from '../Spinner'
import Text from '../Text'
import ExtraPropTypes from '../utils/ExtraPropTypes'
import resets from '../utils/styleResets'
import useEventCallback from '../utils/useEventCallback'
import useFocusVisible from '../utils/useFocusVisible'
import useForkRef from '../utils/useForkRef'

const Base = styled.div(({ theme, styleProps }) => {
  const { fullWidth, shape } = styleProps
  const { radii, sizes, transitions } = theme

  return {
    ...resets,
    borderRadius: shape === 'square' ? radii.sm : sizes.inputHeight,
    flex: '0 0 auto',
    overflow: 'hidden',
    transition: transitions.create(
      ['background-color', 'box-shadow', 'border'],
      { duration: transitions.durations.short }
    ),
    width: fullWidth ? '100%' : 'auto',
  }
})

const TextRoot = styled(Base)(({ theme, styleProps }) => {
  const { colors, sizes, space, type } = theme
  const { color: colorInput, disabled, fullWidth, isFocusVisible } = styleProps
  const scaleDown = fullWidth ? 'scale(0.98)' : 'scale(0.96)'
  const scaleUp = fullWidth ? 'scale(1.02)' : 'scale(1.04)'
  const stroke = disabled
    ? colors.state('disabled')
    : colorInput === 'neutral'
    ? colors.onSurface.primary
    : colors[colorInput] || colorInput
  const active = disabled ? 'transparent' : colors.state('selected', { stroke })
  const activeStroke =
    type === 'dark'
      ? Color(stroke)
          .lighten(0.25)
          .toString()
      : Color(stroke)
          .darken(0.25)
          .toString()

  return {
    color: stroke,
    height: sizes.badgeHeight,
    padding: space.custom(0, 1.5),
    // eslint-disable-next-line sort-keys
    '&:focus': isFocusVisible
      ? {
          backgroundColor: active,
          color: activeStroke,
          transform: scaleUp,
        }
      : {},
    // Hover must override focus styles
    '&:hover': {
      backgroundColor: active,
      color: activeStroke,
    },
    // Active must override focus/hover styles
    // eslint-disable-next-line sort-keys
    '&:active': {
      backgroundColor: active,
      color: activeStroke,
      transform: scaleDown,
    },
  }
})

const TertiaryRoot = styled(Base)(({ theme, styleProps }) => {
  const { colors, sizes, space, type } = theme
  const { color: colorInput, disabled, fullWidth, isFocusVisible } = styleProps
  const scaleDown = fullWidth ? 'scale(0.98)' : 'scale(0.96)'
  const scaleUp = fullWidth ? 'scale(1.02)' : 'scale(1.04)'
  const main = disabled
    ? colors.state('disabled')
    : colorInput === 'neutral'
    ? colors.onSurface.primary
    : colors[colorInput] || colorInput
  const background = colors.state('selected', { stroke: main })
  const active = disabled
    ? background
    : colors.state('pressed', { stroke: main })
  const stroke =
    type === 'dark'
      ? Color(main)
          .lighten(0.25)
          .toString()
      : Color(main)
          .darken(0.25)
          .toString()

  return {
    backgroundColor: background,
    color: stroke,
    height: sizes.badgeHeight,
    padding: space.custom(0, 1.5),
    // eslint-disable-next-line sort-keys
    '&:focus': isFocusVisible
      ? {
          backgroundColor: active,
          transform: scaleUp,
        }
      : {},
    // Hover must override focus styles
    '&:hover': {
      backgroundColor: active,
    },
    // Active must override focus/hover styles
    // eslint-disable-next-line sort-keys
    '&:active': {
      backgroundColor: active,
      transform: scaleDown,
    },
  }
})

const SecondaryRoot = styled(TextRoot)(({ theme }) => {
  const { borders, borderWidths, sizes, space } = theme
  return {
    border: borders.thin,
    borderColor: 'currentColor',
    height: sizes.inputHeight,
    padding: `0 calc(${space.lg} - ${borderWidths.thin})`,
  }
})

const PrimaryRoot = styled(Base)(({ theme, styleProps }) => {
  const { colors, shadows, sizes, space } = theme
  const { color: colorInput, disabled, fullWidth, isFocusVisible } = styleProps
  const scaleDown = fullWidth ? 'scale(0.98)' : 'scale(0.96)'
  const scaleUp = fullWidth ? 'scale(1.02)' : 'scale(1.04)'
  const background = disabled
    ? colors.state('disabled')
    : colorInput === 'neutral'
    ? colors.onSurface.primary
    : colors[colorInput] || colorInput
  const stroke = disabled
    ? colors.onSurface.disabled
    : colorInput === 'neutral'
    ? colors.on(background)
    : colors.on(colorInput)

  const active = disabled
    ? background
    : colorInput === 'neutral'
    ? Color(background)
        .fade(0.2)
        .toString()
    : Color(background)
        .darken(0.2)
        .toString()

  return {
    backgroundColor: background,
    boxShadow: disabled ? 'none' : shadows.xs,
    color: stroke,
    height: sizes.inputHeight,
    padding: space.custom(0, 3),
    // eslint-disable-next-line sort-keys
    '&:focus': isFocusVisible
      ? {
          boxShadow: `0 0 0 3px ${colors.onSurface.divider}`,
          transform: scaleUp,
        }
      : {},
    // Hover must override focus styles
    '&:hover': {
      backgroundColor: active,
    },
    // Active must override hover/focus styles
    // eslint-disable-next-line sort-keys
    '&:active': {
      boxShadow: shadows.none,
      transform: scaleDown,
    },
  }
})

const IconWrapper = styled.span(({ theme, styleProps }) => ({
  height: ['primary', 'secondary'].includes(styleProps.variant)
    ? '24px'
    : '20px',
  marginLeft: styleProps.start ? 0 : theme.space.sm,
  marginRight: styleProps.start ? theme.space.sm : 0,
  width: ['primary', 'secondary'].includes(styleProps.variant)
    ? '24px'
    : '20px',
}))

const MainContent = styled.div(({ styleProps }) => ({
  alignItems: 'center',
  display: 'flex',
  flex: '0 0 auto',
  justifyContent: 'center',
  visibility: styleProps.loading ? 'hidden' : 'visible',
}))

const LoadingContent = styled.div({
  alignItems: 'center',
  bottom: 0,
  display: 'flex',
  flex: '0 0 auto',
  justifyContent: 'center',
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
})

const Button = forwardRef((props, forwardedRef) => {
  // prettier-ignore
  const {
    as,
    className,
    children,
    color,
    disabled,
    fullWidth,
    icon,
    iconPosition,
    loading,
    onBlur,
    onClick,
    onFocus,
    shape,
    variant,
    ...rest 
  } = props

  const {
    createBlurHandler,
    createFocusHandler,
    isFocusVisible,
    register,
  } = useFocusVisible()
  const ref = useForkRef(forwardedRef, register)
  const handleBlur = useEventCallback(createBlurHandler(onBlur))
  const handleFocus = useEventCallback(createFocusHandler(onFocus))
  const handleClick = useEventCallback(e => {
    if (loading) {
      e.preventDefault()
      return
    }

    if (onClick) {
      onClick(e)
    }
  })

  const Root = _.get(
    {
      primary: PrimaryRoot,
      secondary: SecondaryRoot,
      tertiary: TertiaryRoot,
      text: TextRoot,
    },
    variant
  )

  const iconEl =
    icon &&
    React.cloneElement(icon, {
      color: 'inherit',
      scalable: true,
      size: ['primary', 'secondary'].includes(variant) ? '24px' : '20px',
    })

  return (
    <Root
      {...rest}
      aria-busy={loading}
      as={ButtonBase}
      className={className}
      disabled={disabled}
      forwardedAs={as}
      onBlur={handleBlur}
      onClick={handleClick}
      onFocus={handleFocus}
      ref={ref}
      styleProps={{
        color,
        disabled,
        fullWidth,
        isFocusVisible,
        shape,
        variant,
      }}
    >
      <MainContent styleProps={{ loading }}>
        {iconEl && iconPosition === 'start' && (
          <IconWrapper styleProps={{ start: true, variant }}>
            {iconEl}
          </IconWrapper>
        )}
        <Text align='center' variant='button'>
          {children}
        </Text>
        {iconEl && iconPosition === 'end' && (
          <IconWrapper styleProps={{ start: false, variant }}>
            {iconEl}
          </IconWrapper>
        )}
      </MainContent>
      {loading && (
        <LoadingContent>
          <Spinner
            aria-label={`Completing ${_.isString(children) && children}`}
            aria-live='polite'
            color='inherit'
            role='status'
            size='xs'
          />
        </LoadingContent>
      )}
    </Root>
  )
})

Button.displayName = 'Button'

Button.defaultProps = {
  as: 'button',
  color: 'brand',
  disabled: false,
  fullWidth: false,
  iconPosition: 'start',
  loading: false,
  shape: 'square',
  variant: 'primary',
}

const { color } = ExtraPropTypes

Button.propTypes = {
  /**
   * The component used for the root node
   * (either a string to use as DOM element or a React component)
   */
  as: PropTypes.elementType,
  /**
   * The content to render for the button. Should generally be plain text.
   * Note: the Button renders a
   * [Text](/?path=/docs/components-text--basic) component around children,
   * so limit children to elements that are valid descendants of a `span`.
   */
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Determines the color of the component. It supports theme colors that make sense for this component.
   */
  color: PropTypes.oneOfType([
    PropTypes.oneOf(['brand', 'brand2', 'error', 'neutral']),
    color,
  ]),
  /**
   * Determines if the button is disabled
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the button will take up the full width of its container
   */
  fullWidth: PropTypes.bool,
  /**
   * The URL to link to when the button is clicked. If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
  /**
   * Icon to show in the button.
   * Note: must use an [exported icon](/?path=/docs/icon-reference--page#reference-table)
   * or the [icon component](/?path=/docs/components-icon--basic) for custom SVGs.
   */
  icon: PropTypes.node,
  /**
   * Determines if the icon should appear before or after the button's children
   */
  iconPosition: PropTypes.oneOf(['start', 'end']),
  /**
   * Determines if a loading spinner should be displayed instead of the Button content.
   * Note: Setting `loading` to true will prevent click events.
   */
  loading: PropTypes.bool,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Called when the onClick event is triggered. Note: click is blocked when `loading`
   * is set to `true`.
   *
   * @param {object} event The event source of the callback.
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * Determines the button's shape
   */
  shape: PropTypes.oneOf(['pill', 'square']),
  /**
   * Determines the button styles to be applied
   */
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'text']),
}

export default Button
