import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import styleResets from '../utils/styleResets'

const Root = styled.div(styleResets)

const List = styled.ol(() => ({
  alignItems: 'center',
  display: 'flex',
  listStyleType: 'none', // remove list item markers
  margin: 0, // reset list spacing
  padding: 0, // reset list spacing
}))

const ListItem = styled.li(() => ({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
}))

const Separator = styled.li(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  marginLeft: theme.space.sm,
  marginRight: theme.space.sm,
}))

const Stepper = forwardRef(function Stepper(props, ref) {
  const { as, children, className, separator, ...rest } = props
  const totalItems = React.Children.count(children)
  const allItems = React.Children.toArray(children).map((child, index) => {
    const isLastStep = totalItems - 1 === index

    return (
      <React.Fragment key={`stepper-item-${index}`}>
        <ListItem>{child}</ListItem>
        {!isLastStep && <Separator aria-hidden>{separator}</Separator>}
      </React.Fragment>
    )
  })

  return (
    <Root {...rest} as={as} className={className} ref={ref}>
      <List>{allItems}</List>
    </Root>
  )
})

Stepper.displayName = 'Stepper'

Stepper.defaultProps = {
  as: 'div',
  separator: '>',
}

Stepper.propTypes = {
  /**
   * The component used for the root node
   * (either a string to use as DOM element or a React component)
   */
  as: PropTypes.elementType,
  /**
   * The steps to display. Can be any valid React node,
   * but typically should be `Text` or `Link` components.
   */
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * The content to render between children (steps). Can be any valid React node.
   */
  separator: PropTypes.node,
}

export default Stepper
