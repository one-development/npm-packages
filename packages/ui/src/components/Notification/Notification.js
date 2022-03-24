import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import ButtonBase from '../ButtonBase'
import useEventCallback from '../utils/useEventCallback'
import useFocusVisible from '../utils/useFocusVisible'
import CloseIcon from '../../icons/Close'
import ErrorIcon from '../../icons/Error'
import InfoIcon from '../../icons/Info'
import SuccessIcon from '../../icons/Success'
import WarningIcon from '../../icons/Warning'
import resets from '../utils/styleResets'
import useOnce from '../utils/useOnce'

const Root = styled.div(({ theme, styleProps }) => {
  const { density, variant } = styleProps
  const { breakpoints, colors, radii, space } = theme
  const paddings = {
    comfortable: space.custom(2, 1.5),
    compact: space.custom(1.5, 1),
    default: space.custom(2.5, 2),
  }
  const bgColors = {
    error: colors.errorLight,
    info: colors.infoLight,
    success: colors.successLight,
    warning: colors.warningLight,
  }
  const onColors = {
    error: colors.onErrorLight.primary,
    info: colors.onInfoLight.primary,
    success: colors.onSuccessLight.primary,
    warning: colors.onWarningLight.primary,
  }
  return {
    ...resets,
    alignItems: 'center',
    backgroundColor: _.get(bgColors, variant),
    borderRadius: radii.sm,
    color: _.get(onColors, variant),
    display: 'flex',
    padding: _.get(paddings, density, paddings.compact),
    ...(density === 'responsive' && {
      [breakpoints.above('sm')]: {
        padding: paddings.comfortable,
      },
      [breakpoints.above('md')]: {
        padding: paddings.default,
      },
    }),
  }
})

const Icon = styled.div(({ theme }) => ({
  flex: '0 0 auto',
  marginBottom: 'auto',
  marginRight: theme.space.sm,
}))

const Content = styled.div({
  flex: '1 1 auto',
  padding: '3px 0',
})

const CloseButton = styled.div(({ theme, styleProps }) => ({
  flex: '0 0 auto',
  marginBottom: 'auto',
  marginLeft: theme.space.sm,
  ...(styleProps.isFocusVisible && {
    backgroundColor: theme.colors.state('focused'),
    borderRadius: theme.radii.lg,
  }),
}))

const Notification = forwardRef(function Notification(props, ref) {
  const {
    as,
    autoDismissDuration,
    children,
    density,
    dismissable,
    onDismiss,
    role,
    variant,
    ...rest
  } = props

  // Automatically call onDismiss function after duration
  useOnce(() => {
    if (onDismiss && autoDismissDuration) {
      const timeout = setTimeout(onDismiss, autoDismissDuration)
      return () => clearTimeout(timeout)
    }

    return () => {}
  })

  // Handle dismiss
  const {
    createBlurHandler,
    createFocusHandler,
    isFocusVisible,
    register,
  } = useFocusVisible()
  const handleDismissButtonBlur = createBlurHandler()
  const handleDismissButtonFocus = createFocusHandler()
  const handleDismissButtonClick = useEventCallback(() => {
    if (onDismiss) {
      onDismiss()
    }
  })

  const IconComponent = _.get(
    {
      error: ErrorIcon,
      info: InfoIcon,
      success: SuccessIcon,
      warning: WarningIcon,
    },
    variant
  )

  return (
    <Root
      {...rest}
      as={as}
      ref={ref}
      role={role}
      styleProps={{ density, variant }}
    >
      <Icon as={IconComponent} color='inherit' />
      <Content>{children}</Content>
      {dismissable && (
        <CloseButton
          as={ButtonBase}
          aria-label='Dismiss notification'
          onBlur={handleDismissButtonBlur}
          onClick={handleDismissButtonClick}
          onFocus={handleDismissButtonFocus}
          ref={register}
          styleProps={{ isFocusVisible }}
        >
          <CloseIcon color='inherit' />
        </CloseButton>
      )}
    </Root>
  )
})

Notification.displayName = 'Notification'
Notification.defaultProps = {
  as: 'div',
  autoDismissDuration: null,
  density: 'default',
  dismissable: false,
  onDismiss: () => {},
  role: 'alert',
  variant: 'info',
}
Notification.propTypes = {
  /**
   * The component used for the root node
   * (either a string to use as DOM element or a React component)
   */
  as: PropTypes.elementType,
  /**
   * The number of milliseconds to wait before automatically dismissing the notification.
   * Note: The `onDismiss` callback will be invoked after the required time has elapsed.
   */
  autoDismissDuration: PropTypes.number,
  /**
   * The content to display in the Notification.
   * Normally, this should be one or more `Text` components.
   */
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Determines how much padding Notification should use.
   * Use "responsive" to apply the appropriate space based on screen size.
   */
  density: PropTypes.oneOf(['default', 'comfortable', 'compact', 'responsive']),
  /**
   * Determines if the notification can be dismissed via a close icon
   */
  dismissable: PropTypes.bool,
  /**
   * Callback to invoke when the notification is dismissed.
   * Note: this callback must be provided when `dismissable`
   * is set to `true` or `autoDismissDuration` is set.
   */
  onDismiss: PropTypes.func,
  /**
   * The ARIA role to use for this component.
   */
  role: PropTypes.string,
  /**
   * Determines the Notification color and style
   */
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
}

export default Notification
