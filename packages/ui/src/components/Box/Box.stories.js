import _ from 'lodash'
import React from 'react'
import StyledPropTypes from '@styled-system/prop-types'
import Box, { SupportedStylePropTypes } from './Box'
import { createComponentStory } from '../../../utils'

const styleCategoriesByName = Object.keys(StyledPropTypes).reduce(
  (result, category) => {
    const props = StyledPropTypes[category]
    return {
      ...result,
      ..._.mapValues(props, () => category),
    }
  },
  {}
)

const getArgType = name => {
  const category = styleCategoriesByName[name]
  const description = `See the ${category} style prop
    [reference](https://styled-system.com/table#${category})
    for complete information. \`responsive prop\`
  `
  const defaultProp = Box.defaultProps[name]
  return {
    control: 'text',
    description,
    name,
    table: {
      category,
      defaultValue: defaultProp && {
        summary: defaultProp,
      },
      type: {
        summary: 'number | string | array | object',
      },
    },
  }
}

const argTypes = Object.keys(SupportedStylePropTypes)
  .filter(key => Boolean(styleCategoriesByName[key]))
  .reduce(
    (result, key) => ({
      ...result,
      [key]: getArgType(key),
    }),
    {}
  )

const story = createComponentStory(Box, {
  caption: 'A wrapper component for most CSS utility needs',
  description: `
    Box is a helper component that lets you define one-off styles
    inline via Style Props. Style Props are implemented via
    [Styled System](https://styled-system.com/) and make it 
    easy to use theme values for CSS properties like margin, color, etc.
    Before using Box, you may want to read the [Theming](/?path=/docs/theming--page) and
    [Styling](/?path=/docs/styling--page)
    guides to learn more about the theme object, its scales, and style props.

    ###### Theme Values
    Many Style Props accept [scale](/?path=/docs/theming--page#scales)
    aliases and indices as values. When provided, these values will be determined from 
    the theme. For example, you can pass \`margin='md'\` to use the value at \`theme.space.md\`, 
    which evaluates to \`(16px)\`. 
    Similarly, you can pass \`color='onBrand.primary'\` to use \`theme.colors.onBrand.primary\`, 
    which evaluates to \`rgba(255, 255, 255, 1)\`. 
    You should use the Styled System [reference table](https://styled-system.com/table)
    to learn which theme scales and CSS properties correspond to each Box prop.

    ###### Responsive Styles
    All Style Props accept either a single value or an array/object.
    When an array/object is provided, the Box will create media queries for 
    each item based on the theme breakpoint values. View the example 
    [below](#with-responsive-styles)
    or read more about responsive props on the Styled-System 
    [reference](https://styled-system.com/responsive-styles).
  `,
})

story.argTypes = argTypes

export default story

export const Basic = args => <Box {...args} />

Basic.args = {
  border: 'thin',
  height: '120px',
  opacity: 1,
  width: '120px',
}

Basic.argTypes = {
  children: {
    control: 'text',
  },
  opacity: {
    control: {
      max: 1,
      min: 0,
      step: 0.1,
      type: 'range',
    },
  },
}

// eslint-disable-next-line no-unused-vars
export const WithResponsiveStyles = args => (
  <Box
    border='thin'
    padding={{
      _: 'sm', // default padding
      md: 'md', // padding when screens size > theme.breakpoints.md
    }}
  >
    I am a Box
  </Box>
)
