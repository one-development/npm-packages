import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import shouldForwardProp from '@styled-system/should-forward-prop'

const isValidProp = (value, key) => shouldForwardProp(key)
const FilterStyledProps = React.forwardRef(function FilterStyledProps(
  props,
  ref
) {
  const { as, styleProps, ...rest } = props
  const forwardedProps = _.pickBy(rest, isValidProp)
  const ElementType = as || 'div'

  return <ElementType {...forwardedProps} ref={ref} />
})

FilterStyledProps.displayName = 'FilterStyledProps'
FilterStyledProps.defaultProps = {
  as: 'div',
}
FilterStyledProps.propTypes = {
  as: PropTypes.elementType,
  styleProps: PropTypes.object,
}

export default FilterStyledProps
