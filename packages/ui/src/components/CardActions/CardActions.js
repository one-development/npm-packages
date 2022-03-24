import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { useDensity } from '../Card'
import resets from '../utils/styleResets'

const Root = styled.div(({ theme, styleProps }) => {
  const { align, density } = styleProps
  const defaultPadding = { padding: theme.space.custom(3) }
  const comfortablePadding = { padding: theme.space.custom(2.5) }
  const compactPadding = { padding: theme.space.custom(2) }

  return {
    ...resets,
    alignItems: 'center',
    display: 'flex',
    justifyContent: align === 'start' ? 'flex-start' : 'flex-end',
    ...defaultPadding,
    ...(density === 'default' && defaultPadding),
    ...(density === 'comfortable' && comfortablePadding),
    ...(density === 'compact' && compactPadding),
    ...(density === 'responsive' && {
      ...compactPadding,
      [theme.breakpoints.above('sm')]: comfortablePadding,
      [theme.breakpoints.above('md')]: defaultPadding,
    }),
    ...(align === 'start' && {
      '& > *': {
        marginLeft: theme.space.sm,
      },
      '& > :first-child': {
        marginLeft: 0,
      },
    }),
    ...(align === 'end' && {
      '& > *': {
        marginRight: theme.space.sm,
      },
      '& > :last-child': {
        marginRight: 0,
      },
    }),
  }
})

const CardActions = forwardRef(function CardActions(props, ref) {
  const { align, as, children, className, ...rest } = props
  const density = useDensity()

  if (!density)
    throw new Error('CardActions was rendered outside of a Card component')

  return (
    <Root
      {...rest}
      as={as}
      className={className}
      ref={ref}
      styleProps={{ align, density }}
    >
      {children}
    </Root>
  )
})

CardActions.displayName = 'CardActions'
CardActions.defaultProps = {
  align: 'start',
}
CardActions.propTypes = {
  /**
   * Determines whether the children will be aligned to the start (left) or end (right)
   */
  align: PropTypes.oneOf(['start', 'end']),
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
}

export default CardActions
