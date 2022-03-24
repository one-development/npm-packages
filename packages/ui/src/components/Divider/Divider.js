import PropTypes from 'prop-types'
import React from 'react'
import { useTheme } from '../../themes'
import Box from '../Box'

/**
 * A Divider is helpful for separating groups of content.
 * Note: Divider *does not* spread props into the root element.
 */
const Divider = React.forwardRef(function Divider(props, ref) {
  const { as, className, color, variant, vertical } = props
  const theme = useTheme()
  const size = theme.borderWidths.use(variant)
  const height = vertical ? 'auto' : size
  const width = vertical ? size : 'auto'

  return (
    <Box
      alignSelf='stretch'
      as={as}
      backgroundColor={color}
      border='none'
      className={className}
      height={height}
      ref={ref}
      width={width}
    />
  )
})

Divider.displayName = 'Divider'

Divider.defaultProps = {
  as: 'hr',
  color: 'onSurface.divider',
  variant: 'thin',
}

Divider.propTypes = {
  /**
   * The component used for the root node
   * (either a string to use as DOM element or a React component)
   */
  as: PropTypes.elementType,
  className: PropTypes.string,
  /**
   * Any key defined in theme.colors (supports "." syntax) or a custom hex value
   */
  color: PropTypes.string,
  /**
   * Any key defined in theme.borderWidths
   */
  variant: PropTypes.oneOf(['thin', 'thick']),
  /**
   * Sets the orientation of the divider to vertical.
   * When vertical is true, the divider’s parent must be a flex or grid container.
   */
  vertical: PropTypes.bool,
}

export default Divider
