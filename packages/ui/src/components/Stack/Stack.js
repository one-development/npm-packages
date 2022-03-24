import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { system } from 'styled-system'
import resets from '../utils/styleResets'
import Divider from '../Divider'
import Space from '../Space'

const Root = styled.div(
  {
    ...resets,
    display: 'flex',
    flexDirection: 'column',
  },
  system({
    align: {
      property: 'alignItems',
      transform(key) {
        return _.get(
          {
            center: 'center',
            left: 'flex-start',
            right: 'flex-end',
            stretch: 'stretch',
          },
          key
        )
      },
    },
  })
)

const Stack = forwardRef(function Stack(props, ref) {
  // prettier-ignore
  const {
    align,
    as,
    children,
    className,
    dividers,
    space,
    ...rest
  } = props
  const content = React.Children.toArray(children).reduce(
    (results, item, i) => {
      if (i === 0) return [item]
      return dividers
        ? results.concat([
            <Space height={space} key={`${i}-space-top`} />,
            <Divider key={`${i}-divider`} />,
            <Space height={space} key={`${i}-space-bottom`} />,
            item,
          ])
        : results.concat([<Space height={space} key={`${i}-space`} />, item])
    },
    []
  )

  return (
    <Root {...rest} align={align} as={as} className={className} ref={ref}>
      {content}
    </Root>
  )
})

Stack.displayName = 'Stack'
Stack.defaultProps = {
  align: 'stretch',
  as: 'div',
  dividers: false,
  space: 'lg',
}
Stack.propTypes = {
  /**
   * Determines how to align the items in the stack. `responsive prop`
   */
  align: PropTypes.oneOfType([
    PropTypes.oneOf(['left', 'right', 'center', 'stretch']),
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * The component used for the root node
   * (either a string to use as a DOM element or a React component)
   */
  as: PropTypes.elementType,
  /**
   * Content to display in a stack. Should be more than one element.
   */
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Determines if dividers should be displayed between items in the stack.
   * Note: space will be applied to each side a divider. For example,
   * space='8px' will result in 8px on each side of divider, 16px in total.
   */
  dividers: PropTypes.bool,
  /**
   * Determines how much space to display between items.
   * Can be any alias or index in `theme.space` or a custom value.
   * Additionally, strings can be in the form of "*multiplier",
   * to get the product of the theme's grid and the multiplier
   * (i.e. "*4' = 32px). `responsive prop`
   */
  space: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
}

export default Stack
