import propTypes from '@styled-system/prop-types'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import Box from '../Box'

const Container = forwardRef(function Container(props, ref) {
  const { as, children, disableMaxWidth, disableGutters, ...rest } = props
  const maxWidth = disableMaxWidth ? 'none' : 'containerWidth'
  const paddingX = disableGutters ? 0 : 'md'
  return (
    <Box
      as={as}
      marginX={'auto'}
      maxWidth={maxWidth}
      paddingX={paddingX}
      ref={ref}
      width={'100%'}
      {...rest}
    >
      {props.children}
    </Box>
  )
})

Container.displayName = 'Container'

Container.defaultProps = {
  as: 'div',
  disableGutters: false,
  disableMaxWidth: false,
}

Container.propTypes = {
  ...propTypes.background,
  ...propTypes.border,
  ...propTypes.color,
  ...propTypes.flexbox,
  ...propTypes.grid,
  ...propTypes.layout,
  ...propTypes.position,
  ...propTypes.shadow,
  ...propTypes.space,
  /**
   * The component used for the root node
   * (either a string to use as DOM element or a React component)
   */
  as: PropTypes.elementType,
  /**
   * Any valid React node
   */
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Disables the container's left/right padding
   */
  disableGutters: PropTypes.bool,
  /**
   * Disables the container's max-width, set to `theme.sizes.containerWidth` by default
   */
  disableMaxWidth: PropTypes.bool,
}

export default Container
