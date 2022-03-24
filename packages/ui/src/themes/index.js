import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import {
  ThemeProvider as StyledThemeProvider,
  ThemeContext as StyledThemeContext,
  withTheme as withStyledTheme,
} from 'styled-components'
import lightTheme from './light'

export { default as createTheme } from './utils/createTheme'
export { default as darkTheme } from './dark'
export { default as lightTheme } from './light'

export function ThemeProvider(props) {
  const { children, theme } = props
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
}

ThemeProvider.displayName = 'ThemeProvider'
ThemeProvider.defaultProps = {
  theme: lightTheme,
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
  /**
   * The theme to provide.
   */
  theme: PropTypes.object,
}

export const useTheme = () => {
  return useContext(StyledThemeContext)
}

export const withTheme = Component => withStyledTheme(Component)
