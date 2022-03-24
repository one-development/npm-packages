import React from 'react'
import CssBaseline from './CssBaseline'
import { createComponentStory } from '../../../utils'

export default createComponentStory(CssBaseline, {
  caption:
    'Provides HTML element and attribute style normalizations across browsers',
  description: `
    Use CssBaseline once in the root of your application.
    It should be rendered before your app component as a child of ThemeProvider.
  `,
  title: 'Utils/CssBaseline',
})

export const Basic = () => (
  <div>Hello, this text has received baseline styles.</div>
)
