import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { useDensity } from '../Card'
import resets from '../utils/styleResets'

const Root = styled.div(({ theme, styleProps }) => {
  const { density } = styleProps
  const defaultPadding = {
    padding: theme.space.custom(2, 3),
    // eslint-disable-next-line sort-keys
    '&:first-child': {
      paddingTop: theme.space.xl,
    },
    '&:last-child': {
      paddingBottom: theme.space.xl,
    },
    '&:only-child': {
      paddingBottom: theme.space.xl,
      paddingTop: theme.space.xl,
    },
  }
  const comfortablePadding = {
    padding: theme.space.custom(1.5, 2.5),
    // eslint-disable-next-line sort-keys
    '&:first-child': {
      paddingTop: theme.space.custom(3.5),
    },
    '&:last-child': {
      paddingBottom: theme.space.custom(3.5),
    },
    '&:only-child': {
      paddingBottom: theme.space.custom(3.5),
      paddingTop: theme.space.custom(3.5),
    },
  }
  const compactPadding = {
    padding: theme.space.custom(1, 2),
    // eslint-disable-next-line sort-keys
    '&:first-child': {
      paddingTop: theme.space.custom(3),
    },
    '&:last-child': {
      paddingBottom: theme.space.custom(3),
    },
    '&:only-child': {
      paddingBottom: theme.space.custom(3),
      paddingTop: theme.space.custom(3),
    },
  }
  return {
    ...resets,
    ...defaultPadding,
    ...(density === 'default' && defaultPadding),
    ...(density === 'comfortable' && comfortablePadding),
    ...(density === 'compact' && compactPadding),
    ...(density === 'responsive' && {
      ...compactPadding,
      [theme.breakpoints.above('sm')]: comfortablePadding,
      [theme.breakpoints.above('md')]: defaultPadding,
    }),
  }
})

const CardContent = forwardRef(function Card(props, ref) {
  const { as, children, className, ...rest } = props
  const density = useDensity()

  if (!density)
    throw new Error('CardContent was rendered outside of a Card component')

  return (
    <Root
      {...rest}
      as={as}
      className={className}
      ref={ref}
      styleProps={{ density }}
    >
      {children}
    </Root>
  )
})

CardContent.displayName = 'CardContent'
CardContent.defaultProps = {}
CardContent.propTypes = {
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

export default CardContent
