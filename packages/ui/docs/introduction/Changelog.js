import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import changelog from '!!raw-loader!../../CHANGELOG.md'
import { ThemeProvider } from '../../src'

const changes = changelog.split(/\[\d{1,}\.\d{1,}\.\d{1,}.*\]/g)
const versions = changelog
  .match(/\[\d{1,}\.\d{1,}\.\d{1,}.*\]/g)
  .filter(str => !str.includes('alpha'))
  .map(str => str.replace('[', '').replace(']', ''))

const markdown = versions
  .map((version, i) => `## [${version}]${changes[i + 1]}`)
  .join('\n')

const sbFontFamily =
  '"Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif'

const Root = styled.div(({ theme }) => ({
  boxSizing: 'border-box',
  color: theme.colors.onSurface.primary,
  fontFamily: sbFontFamily,
  fontSize: '0.875rem',
  // eslint-disable-next-line sort-keys
  '*:empty': {
    display: 'none',
  },
  a: {
    color: theme.colors.brand,
    textDecoration: 'none',
  },
  h2: {
    borderBottom: theme.borders.thin,
    color: 'inherit',
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: theme.space.sm,
    marginTop: '36px',
    paddingBottom: theme.space.xs,
  },
  h3: {
    color: 'rgb(102, 102, 102)',
    fontSize: '0.875rem',
    fontWeight: 700,
    marginBottom: theme.space.sm,
    padding: 0,
  },
  p: {
    lineHeight: '1.5rem',
    marginBottom: theme.space.md,
    marginTop: theme.space.md,
  },
  ul: {
    margin: theme.space.custom(2, 0),
    paddingLeft: '30px',
  },
}))

export default function Changelog() {
  return (
    <ThemeProvider>
      <Root>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </Root>
    </ThemeProvider>
  )
}
