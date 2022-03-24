import _ from 'lodash'
import fp from 'lodash/fp'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { get, system } from 'styled-system'
import resets from '../utils/styleResets'
import FilterStyledProps from '../utils/FilterStyledProps'

const multiplication = /^\*\d*(.\d*)$/
const isMultiplication = str => multiplication.test(str)
const getMultiplier = fp.compose(_.toFinite, _.last, fp.split('*'))
const getValueFromScale = (key, scale) => get(scale, key, key)
export const transform = (key, scale) =>
  isMultiplication(key)
    ? scale.custom(getMultiplier(key))
    : getValueFromScale(key, scale)

const spaceStyles = system({
  height: {
    property: 'height',
    scale: 'space',
    transform,
  },
  width: {
    property: 'width',
    scale: 'space',
    transform,
  },
})

const displayStyles = system({
  display: true,
})

const Root = styled.div(
  {
    ...resets,
    flex: '0 0 auto',
  },
  displayStyles,
  spaceStyles
)

const Space = forwardRef(function Space(props, ref) {
  const { height, inline, size, width } = props

  return (
    <Root
      as={FilterStyledProps}
      display={inline ? 'inline-block' : 'block'}
      height={size || height}
      ref={ref}
      width={size || width}
    />
  )
})

Space.displayName = 'Space'

Space.propTypes = {
  /**
   * Any alias or index defined in theme.space or a custom value.
   * (all [space style props](https://styled-system.com/table#space) props are supported)
   * Also accepts strings in the form of "*multiplier" to get the product of
   * the theme's grid and the multiplier. For example, in a theme with a grid of 8px,
   * "*8" would return 64px. This syntax can also be used as one of the values of a
   * responsive style.
   * `responsive prop`
   */
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * Determines if the component should display inline
   */
  inline: PropTypes.bool,
  /**
   * Any alias or index defined in theme.space or a custom value. Sets both the height and the width.
   * (all [space style props](https://styled-system.com/table#space) props are supported)
   * Also accepts strings in the form of "*multiplier" to get the product of
   * the theme's grid and the multiplier. For example, in a theme with a grid of 8px,
   * "*8" would return 64px. This syntax can also be used as one of the values of a
   * responsive style.
   * `responsive prop`
   */
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  /**
   * Any alias or index defined in theme.space or a custom value.
   * (all [space style props](https://styled-system.com/table#space) props are supported)
   * Also accepts strings in the form of "*multiplier" to get the product of
   * the theme's grid and the multiplier. For example, in a theme with a grid of 8px,
   * "*8" would return 64px. This syntax can also be used as one of the values of a
   * responsive style.
   * `responsive prop`
   */
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
}

export default Space
