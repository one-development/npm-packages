import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import resets from '../utils/styleResets'

const Root = styled.div(({ theme, styleProps }) => {
  const boxShadow = _.get(theme.shadows, styleProps.elevation)
  return {
    ...resets,
    backgroundColor: theme.colors.surface,
    boxShadow,
    color: theme.colors.onSurface.primary,
    position: 'relative',
  }
})

const Overlay = styled.div(({ theme, styleProps }) => {
  const isDark = theme.type === 'dark'
  /* eslint-disable sort-keys */
  const opacity = _.get(
    {
      none: 0,
      xs: 0.05,
      sm: 0.07,
      md: 0.1,
      lg: 0.13,
      xl: 0.16,
    },
    isDark ? styleProps.elevation : 'none'
  )
  /* eslint-enable sort-keys */

  return {
    ...resets,
    backgroundColor: theme.colors.onSurface.primary,
    bottom: 0,
    left: 0,
    opacity,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
  }
})

const Content = styled.div(resets)

/**
 * Use Surface to provide the correct background color, text color, and elevation styles
 * for a surface. It should be used to build custom surface components in your app
 * or as a base for other One UI components, like Drawer and Modal.
 */
const Surface = React.forwardRef(function Surface(props, ref) {
  const { as, children, elevation, ...rest } = props

  return (
    <Root {...rest} as={as} ref={ref} styleProps={{ elevation }}>
      <Overlay styleProps={{ elevation }} />
      <Content>{children}</Content>
    </Root>
  )
})

Surface.displayName = 'Surface'
Surface.defaultProps = {
  as: 'div',
  elevation: 'none',
}
Surface.propTypes = {
  /**
   * The component used for the root node
   * (either a string to use as DOM element or a React component)
   */
  as: PropTypes.elementType,
  children: PropTypes.node,
  elevation: PropTypes.oneOf(['none', 'xs', 'sm', 'md', 'lg', 'xl']),
}

export default Surface
