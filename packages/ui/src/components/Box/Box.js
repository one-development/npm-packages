import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import {
  background,
  border,
  color,
  compose,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
} from 'styled-system'
import StyledPropTypes from '@styled-system/prop-types'
import FilterStyledProps from '../utils/FilterStyledProps'
import resets from '../utils/styleResets'

const Root = styled.div(
  {
    ...resets,
    minWidth: 0,
  },
  compose(
    background,
    border,
    color,
    flexbox,
    grid,
    layout,
    position,
    shadow,
    space
  )
)

const Box = forwardRef(function Box(props, ref) {
  const { styleProps, as, ...rest } = props
  return <Root {...rest} as={FilterStyledProps} forwardedAs={as} ref={ref} />
})

Box.displayName = 'Box'

Box.defaultProps = {
  as: 'div',
  backgroundColor: 'inherit',
  color: 'onBackground.primary',
}

export const SupportedStylePropTypes = {
  ...StyledPropTypes.background,
  ...StyledPropTypes.border,
  ...StyledPropTypes.color,
  ...StyledPropTypes.flexbox,
  ...StyledPropTypes.grid,
  ...StyledPropTypes.layout,
  ...StyledPropTypes.position,
  ...StyledPropTypes.shadow,
  ...StyledPropTypes.space,
}

Box.propTypes = {
  ...SupportedStylePropTypes,
  /**
   * The component used for the root node
   * (either a string to use as DOM element or a React component)
   */
  as: PropTypes.elementType,
  /**
   * Any key defined in theme.colors or a custom hex value
   * (all [color style props](https://styled-system.com/table/#color) are supported).
   * `responsive prop`
   */
  /**
   * Any valid React node
   */
  children: PropTypes.node,
  className: PropTypes.string,
}

export default Box
