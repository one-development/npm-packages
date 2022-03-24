import React, { useState } from 'react'
import styled from 'styled-components'
// eslint-disable-next-line object-curly-newline
import { Box, Button, Divider, Space, Text, ThemeProvider } from '../../src'
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import changelog from '!!raw-loader!../../CHANGELOG.md'

const versions = changelog
  .match(/\[\d{1,}\.\d{1,}\.\d{1,}.*\]/g)
  .filter(str => !str.includes('alpha'))
  .map(str => str.replace('[', '').replace(']', ''))

const currentPath =
  typeof window !== 'undefined' && window.location.pathname.split('/')[1]
export const currentVersion = currentPath.match(/\d{1,}\.\d{1,}\.\d{1,}.*/g)
  ? currentPath
  : versions[0]

const Link = styled.a(({ theme }) => ({
  color: theme.colors.brand,
  textDecoration: 'underline',
}))

export const CurrentVersion = () => (
  <ThemeProvider>
    <Box alignItems='center' backgroundColor='transparent' display='flex'>
      <Box as='img' src='' />
      <Space inline width='*1.5' />
      <Box
        display='inline-block'
        backgroundColor='background'
        color='onBackground.primary'
        borderRadius='24px'
        flex='0 0 auto'
        paddingX='md'
        paddingY='8px'
        marginTop='18px'
      >
        <Text variant='subtitle'>{`v${currentVersion}`}</Text>
      </Box>
    </Box>
  </ThemeProvider>
)

export default function VersionList() {
  const [isExpanded, setIsExpanded] = useState(false)
  const releases = isExpanded ? versions : versions.slice(0, 5)

  const handleButtonClick = () => {
    setIsExpanded(prev => !prev)
  }

  return (
    <ThemeProvider>
      <Box display='flex' flexDirection='column'>
        {releases.map((release, i) => (
          <Link href={`/${release}`} key={release}>
            <Box pt='sm' color='inherit'>
              {`${release}${i === 0 ? ' (latest)' : ''}`}
            </Box>
          </Link>
        ))}
        <Space height='md' />
        <Divider />
        <Space height='md' />
        <Box marginX='auto'>
          <Button
            variant='secondary'
            color='neutral'
            onClick={handleButtonClick}
            shape='pill'
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
