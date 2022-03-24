import Color from 'color'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { useTheme } from '../../themes'
import resets from '../utils/styleResets'

const Root = styled.div(({ theme }) => ({
  ...resets,
  backgroundColor: Color(theme.colors.onSurface.divider)
    .fade(0.75)
    .toString(),
  padding: theme.space.custom(3, 2),
}))

const RadioDetails = forwardRef((props, ref) => {
  const { as, children, className, id, ...rest } = props
  const theme = useTheme()
  const backgroundColor = Color(theme.colors.onSurface.divider)
    .fade(0.75)
    .toString()

  return (
    <Root
      {...rest}
      as={as}
      backgroundColor={backgroundColor}
      paddingX=''
      className={className}
      id={id}
      ref={ref}
    >
      {children}
    </Root>
  )
})

RadioDetails.displayName = 'RadioDetails'
RadioDetails.defaultProps = {
  as: 'div',
}
RadioDetails.propTypes = {
  /**
   * The component used for the root element
   * (either a string to use as DOM element or a React component)
   */
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Sets the elements ID so that it can be associated with Radio input.
   * Note: When used with Radio inside a RadioGroup, `aria-controls` will be
   * set correctly on Radio input.
   */
  id: PropTypes.string.isRequired,
}

export default RadioDetails
