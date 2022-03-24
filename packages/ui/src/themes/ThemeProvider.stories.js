import React from 'react'
import { Inspector } from 'react-inspector'
import { darkTheme, ThemeProvider, useTheme } from './index'
import { createComponentStory } from '../../utils'

export default createComponentStory(ThemeProvider, {
  caption: 'Provides the theme object to your components',
  controls: {},
  description: `
    Use the ThemeProvider at the root of your app.
    ThemeProvider uses React's context feature to provide a theme
    to all of your app's components.
  `,
  title: 'Utils/ThemeProvider',
})

const ThemeInspector = () => {
  const theme = useTheme()
  return <Inspector data={theme} />
}

// eslint-disable-next-line no-unused-vars
export const Basic = args => (
  <ThemeProvider>
    <ThemeInspector />
  </ThemeProvider>
)

// eslint-disable-next-line no-unused-vars
export const withDarkTheme = args => (
  <ThemeProvider theme={darkTheme}>
    <ThemeInspector />
  </ThemeProvider>
)
