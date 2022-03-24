import _ from 'lodash'
import React from 'react'
import { Box, lightTheme, Stack, Text } from '../../src'
import ScaleVisualizer from './ScaleVisualizer'

const helperDefs = {
  add: {
    args: ['name: string', 'input: string|object'],
    description: `
    Adds a new color to the theme
    - \`name\` is the prefix to be used for all generated colors, e.g. 'brand3'
    - \`input\` can be a simple hex code or an object { main, light, dark, onLight, onDark, onMain }
    `,
  },
  on: {
    args: ['color: string', 'variant: string'],
    description: `
    Calculates the "on" colors for input.
    - \`color\` accepts the name of a theme color (i.e. \`brandDark\`) or an arbitray hex value.
    - \`variant\` accepts \`disabled\`, \`divider\`, \`hint\`, \`secondary\`, and \`primary\`
    `,
  },
  state: {
    args: ['variant: string', 'options: { on: string, stroke: string }'],
    description: `
    Calculates the "state" color variant (i.e. dragged, hovered). 
    - \`variant\` can accept any key defined in \`theme.colors.stateOpacities\` above.
    - \`options.on\` is the background color. It defaults to "surface" and accepts a theme color name or custom hex value.
    - \`options.stroke\` is the text/icon color. It defaults to "onSurface".
    - \`options.stroke\` does not accept "background" or "surface".`,
  },
  use: {
    args: ['name: string', 'variant: string'],
    description: `
    Gets the color value for the given name and variant (light, main, dark).
    - \`variant\` defaults to "primary".
    `,
  },
}

const getPreviewInfo = key =>
  _.get(
    {
      background: {
        bordered: true,
        dark: 'background',
        light: 'surface',
        main: null,
      },
      brand: {
        bordered: false,
        dark: 'brandDark',
        light: 'brandLight',
        main: 'brand',
      },
      brand2: {
        bordered: false,
        dark: 'brand2Dark',
        light: 'brand2Light',
        main: 'brand2',
      },
      error: {
        bordered: false,
        dark: 'errorDark',
        light: 'errorLight',
        main: 'error',
      },
      highlight: {
        bordered: false,
        dark: null,
        light: null,
        main: 'highlight',
      },
      info: {
        bordered: false,
        dark: 'infoDark',
        light: 'infoLight',
        main: 'info',
      },
      success: {
        bordered: false,
        dark: 'successDark',
        light: 'successLight',
        main: 'success',
      },
      warning: {
        bordered: false,
        dark: 'warningDark',
        light: 'warningLight',
        main: 'warning',
      },
    },
    key,
    null
  )

// eslint-disable-next-line react/prop-types
const Color = ({ gridArea, name }) => {
  const onPrefix = _.camelCase(`on-${name}`)
  const onColors = _.get(lightTheme.colors, onPrefix)
  const value = _.get(lightTheme.colors, name)

  return (
    <Box backgroundColor={name} gridArea={gridArea} padding='md'>
      <Stack space='md'>
        <Text
          variant='label'
          color={onColors.primary}
        >{`${name}: ${value}`}</Text>
        <Text color={onColors.primary}>
          {`${onPrefix}.primary: ${onColors.primary}`}
        </Text>
        <Text color={onColors.secondary}>
          {`${onPrefix}.secondary: ${onColors.secondary}`}
        </Text>
        <Text color={onColors.hint}>
          {`${onPrefix}.hint: ${onColors.hint}`}
        </Text>
        <Text color={onColors.disabled}>
          {`${onPrefix}.disabled: ${onColors.disabled}`}
        </Text>
        <Text color={onColors.divider}>
          {`${onPrefix}.divider: ${onColors.divider}`}
        </Text>
      </Stack>
    </Box>
  )
}

export default function ColorsScale() {
  const renderPreview = (value, key) => {
    const info = getPreviewInfo(key)

    if (!info) return null

    const { bordered, dark, light, main } = info

    return (
      <Box key={key}>
        <Box
          borderRadius='lg'
          border={bordered ? 'thin' : 'none'}
          display='grid'
          gridTemplateAreas={`
        "main main"
        "light dark"
      `}
          gridTemplateRows='auto auto'
          gridTemplateColumns='auto auto'
          overflow='hidden'
        >
          {main && <Color gridArea='main' name={main} />}
          {light && <Color gridArea='light' name={light} />}
          {dark && <Color gridArea='dark' name={dark} />}
        </Box>
      </Box>
    )
  }

  return (
    <ScaleVisualizer
      helperDefs={helperDefs}
      name='colors'
      renderPreview={renderPreview}
    />
  )
}
