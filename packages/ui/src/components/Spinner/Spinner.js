import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled, { keyframes } from 'styled-components'
import resets from '../utils/styleResets'

const Root = styled.div(({ styleProps }) => ({
  ...resets,
  height: styleProps.size,
  position: 'relative',
  width: styleProps.size,
}))

const Background = styled.div(({ styleProps, theme }) => ({
  ...resets,
  border: `${styleProps.borderWidth} solid currentColor`,
  borderRadius: '50%',
  bottom: 0,
  left: 0,
  opacity: theme.colors.stateOpacities.focused,
  position: 'absolute',
  right: 0,
  top: 0,
}))

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Fill = styled.div`
  *, *::before, *::after: {
    box-sizing: border-box;
  }
  box-sizing: border-box;
  animation: ${rotate} 700ms linear infinite;
  border-color: transparent;
  border-style: solid;
  border-top-color: ${({ theme, styleProps }) =>
    styleProps.color === 'inherit'
      ? 'currentColor'
      : _.get(theme.colors, styleProps.color)};
  border-width: ${({ styleProps }) => styleProps.borderWidth};
  border-radius: 50%;
  box-sizing: border-box;
  display: inline-block;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Spinner = forwardRef((props, ref) => {
  // prettier-ignore
  const {
    as,
    className,
    color,
    role,
    size: sizeProp,
    ...rest
  } = props
  const borderWidth = _.get(
    {
      lg: '8px',
      md: '4px',
      sm: '2px',
      xs: '2px',
    },
    sizeProp
  )
  const size = _.get(
    {
      lg: '40px',
      md: '32px',
      sm: '24px',
      xs: '16px',
    },
    sizeProp
  )

  return (
    <Root
      {...rest}
      as={as}
      className={className}
      ref={ref}
      role={role}
      styleProps={{ size }}
    >
      <Background styleProps={{ borderWidth }} />
      <Fill styleProps={{ borderWidth, color }} />
    </Root>
  )
})

Spinner.displayName = 'Spinner'
Spinner.defaultProps = {
  as: 'div',
  color: 'brand',
  role: 'progressbar',
  size: 'md',
}
Spinner.propTypes = {
  /**
   * The component used for the root node
   * (either a string to use as DOM element or a React component)
   */
  as: PropTypes.elementType,
  className: PropTypes.string,
  /**
   * Determines the Spinner's color
   */
  color: PropTypes.oneOf(['brand', 'brand2', 'inherit']),
  /**
   * Sets the ARIA role for the Spinner. Can be
   * set to `progressbar`, `status`, or `alert`.
   */
  role: PropTypes.oneOf(['progressbar', 'status', 'alert']),
  /**
   * Determines the Spinner's size
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
}

export default Spinner
