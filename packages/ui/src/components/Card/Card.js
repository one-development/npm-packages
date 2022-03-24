import PropTypes from 'prop-types'
import React, { createContext, forwardRef, useContext } from 'react'
import styled from 'styled-components'
import Surface from '../Surface'

const CardDensityContext = createContext(null)

export function useDensity() {
  const density = useContext(CardDensityContext)
  return density
}

const Root = styled.div(({ theme }) => ({
  border: theme.borders.thin,
  borderRadius: theme.radii.sm,
  overflow: 'hidden',
}))

const Card = forwardRef(function Card(props, ref) {
  const { as, children, className, density, ...rest } = props
  return (
    <Root
      {...rest}
      as={Surface}
      className={className}
      forwardedAs={as}
      ref={ref}
    >
      <CardDensityContext.Provider value={density}>
        {children}
      </CardDensityContext.Provider>
    </Root>
  )
})

Card.displayName = 'Card'
Card.defaultProps = {
  density: 'default',
}

Card.propTypes = {
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
   * Determines how much space Card and card components should include.
   * Use "responsive" to apply the appropriate space based on screen size.
   */
  density: PropTypes.oneOf(['default', 'comfortable', 'compact', 'responsive']),
}

export default Card
