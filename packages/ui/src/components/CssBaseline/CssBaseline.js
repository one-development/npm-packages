import React from 'react'
import { createGlobalStyle } from 'styled-components'

const Resets = createGlobalStyle(({ theme }) => ({
  '*, *::before, *::after': {
    boxSizing: 'inherit',
  },
  body: {
    '&::backdrop': {
      backgroundColor: theme.colors.background,
    },
    '@media print': {
      backgroundColor: theme.colors.surface,
    },
    'b, strong': {
      fontWeight: theme.fontWeights.bolder,
    },
    backgroundColor: theme.colors.background,
    color: theme.colors.onBackground.primary,
    margin: 0,
  },
  html: {
    boxSizing: 'border-box',
    fontFamily: theme.fonts.text.family,
    mozOsxFontSmoothing: 'grayscale',
    msTextSizeAdjust: 'antialiased',
    WebkitFontSmoothing: 'antialiased',
    WebkitOverflowScrolling: 'touch',
    WebkitTextSizeAdjust: '100%',
  },
}))

const CssBaseline = () => (
  <div>
    <style>
      {`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
    `}
    </style>
    <Resets />
  </div>
)

CssBaseline.displayName = 'CssBaseline'
CssBaseline.defaultProps = {}
CssBaseline.propTypes = {}

export default CssBaseline
