import _ from 'lodash'
import { withThemes } from 'storybook-addon-themes/react'
import React from 'react'
import { Box, CssBaseline } from '../src/components'
import {
  createTheme,
  darkTheme,
  lightTheme,
  ThemeProvider,
} from '../src/themes'
import storybookTheme from './theme'

const basilTheme = createTheme({
  colors: {
    background: {
      main: '#fffbe6',
      on: '#356859',
    },
    brand: {
      dark: '#043d30',
      light: '#37966f',
      main: '#356859',
    },
    brand2: {
      light: '#fffbe6',
      main: '#fd5523',
    },
    surface: {
      main: '#f1f5df',
      on: '#4e7a6a',
    },
  },
})

const owlTheme = createTheme({
  colors: {
    background: '#ffde03',
    brand: '#ffde03',
    brand2: '#0336ff',
    brand3: '#ff0266',
  },
})

// Storybook Options
export const parameters = {
  a11y: {
    element: '#root',
    manual: false,
  },
  backgrounds: {
    default: 'Surface',
    grid: {
      cellAmount: 8,
      cellSize: 8,
      offsetX: 20, // default is 0 if story has 'fullscreen' layout, 16 if layout is 'padded'
      offsetY: 20, // default is 0 if story has 'fullscreen' layout, 16 if layout is 'padded'
      opacity: 0.5,
    },
    values: [
      { name: 'Background', value: lightTheme.colors.background },
      { name: 'Surface', value: lightTheme.colors.surface },
    ],
  },
  docs: {
    theme: storybookTheme,
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Getting Started',
        ['About', 'Installation', 'Design Principles', 'Features'],
        'Usage',
        ['Theming', 'Styling'],
        'API Reference',
        'Components',
        'Utils',
        'Tools',
      ],
    },
  },
  themes: {
    Decorator: props => {
      // eslint-disable-next-line react/prop-types
      const { children, themeName } = props
      const theme = _.get(
        {
          basil: basilTheme,
          dark: darkTheme,
          light: lightTheme,
          owl: owlTheme,
        },
        themeName,
        lightTheme
      )
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box backgroundColor='surface' padding='md'>
            {children}
          </Box>
        </ThemeProvider>
      )
    },
    list: [
      {
        color: lightTheme.colors.surface,
        default: true,
        name: 'light',
      },
      {
        color: darkTheme.colors.surface,
        name: 'dark',
      },
      {
        color: basilTheme.colors.surface,
        name: 'basil',
      },
      {
        color: owlTheme.colors.surface,
        name: 'owl',
      },
    ],
  },
}

// Global Decorators
export const decorators = [withThemes]
