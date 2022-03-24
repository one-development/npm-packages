import React from 'react'
import TestRenderer from 'react-test-renderer'
import { createTheme, ThemeProvider } from '../../themes'
import CssBaseline from './CssBaseline'

const theme = createTheme()

describe('<CssBaseline/>', () => {
  it('should not render its children', () => {
    const testRenderer = TestRenderer.create(
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <div className='foo'>Foo</div>
        </CssBaseline>
      </ThemeProvider>
    )
    const testInstance = testRenderer.root
    expect(() => testInstance.findByProps({ className: 'foo' })).toThrow()
  })
})
