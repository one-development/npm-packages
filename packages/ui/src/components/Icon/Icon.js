import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import ExtraPropTypes from '../utils/ExtraPropTypes'
import px from '../utils/px'

const Root = styled.div(({ theme, styleProps }) => {
  const { color, scalable, size } = styleProps
  const themeColors = ['brand', 'brand2', 'error']
  const fill = themeColors.includes(color)
    ? theme.colors.use(color)
    : color === 'inherit'
    ? 'currentColor'
    : color

  const pxFontSize = px(
    _.get(
      {
        lg: '24px',
        md: '20px',
        sm: '16px',
      },
      size,
      size
    )
  )

  const fontSize = scalable ? px.toRem(pxFontSize) : pxFontSize

  return {
    display: 'inline-block',
    fill,
    flex: '0 0 auto',
    fontSize,
    height: '1em',
    transition: theme.transitions.create('fill', {
      duration: theme.transitions.durations.shorter,
    }),
    userSelect: 'none',
    width: '1em',
  }
})

const Icon = React.forwardRef(function Icon(props, ref) {
  const {
    as,
    children,
    className,
    color,
    scalable,
    shapeRendering,
    size,
    title,
    viewBox,
    ...rest
  } = props

  return (
    <Root
      aria-hidden={!title}
      as={as}
      className={className}
      focusable='false'
      ref={ref}
      role={title ? 'img' : rest.role}
      shapeRendering={shapeRendering}
      styleProps={{
        color,
        scalable,
        size,
      }}
      viewBox={viewBox}
      {...rest}
    >
      {children}
      {title && <title>{title}</title>}
    </Root>
  )
})

const { color } = ExtraPropTypes

Icon.displayName = 'Icon'
Icon.defaultProps = {
  as: 'svg',
  color: 'inherit',
  scalable: true,
  size: 'sm',
  viewBox: '0 0 24 24',
}

Icon.propTypes = {
  /**
   * The component used for the root node
   * (either a string to use as DOM element or a React component)
   */
  as: PropTypes.elementType,
  /**
   * Node passed into the SVG element. Typically, should be two path elements:
   * one for negative space (fill="none") and one for the icon fill.
   */
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * The color of the SVG fill. Supports the theme colors that make sense for this component.
   * Also supports "currentColor" via the "inherit" setting and custom color values
   * (e.g. "red" or "#fafafa") when necessary.
   */
  color: PropTypes.oneOfType([
    PropTypes.oneOf(['inherit', 'brand', 'brand2', 'error']),
    color,
  ]),
  /**
   * Determines if the SVG should scale with user's browser setting for font size.
   * Note: when `scalable=true`, rem values will be used for height and width.
   */
  scalable: PropTypes.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * Note: investigate this property to resolve issues with blurry icons.
   */
  shapeRendering: PropTypes.oneOf([
    'auto',
    'optimizeSpeed',
    'crispEdges',
    'geometricPrecision',
  ]),
  /**
   * The height/width applied to the icon. Defaults to `24px`, but can be configured to any px value.
   */
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf(['sm', 'md', 'lg']),
  ]),
  /**
   * Sets the human-readable SVG <title> label, which is used for accessibility.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  title: PropTypes.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20", this means that the coordinates inside
   * the SVG will go from the top left corner (0,0) to bottom right (50,20)
   * and each unit will be worth 10px.
   */
  viewBox: PropTypes.string,
}

export default Icon
