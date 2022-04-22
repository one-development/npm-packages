import PropTypes from 'prop-types'
import React from 'react'
import { Box, Space, Text, lightTheme, ThemeProvider } from '../../src'

export default function IconsTable(props) {
  const { icons } = props

  return (
    <ThemeProvider theme={lightTheme}>
      <Box
        borderRadius='sm'
        border='thin'
        boxShadow='rgba(0,0,0,0.10) 0 1px 3px 0'
      >
        {Object.keys(icons)
          .sort()
          .map((key, index) => {
            const Icon = icons[key]

            if (!Icon.displayName) return null

            return (
              <Box
                key={key}
                alignItems='stretch'
                borderTop={index !== 0 ? 'thin' : 'none'}
                display='flex'
                flexDirection='row'
                height='appbarHeight'
              >
                <Box
                  display='flex'
                  flexDirection='column'
                  justifyContent='center'
                  paddingX='md'
                  flex='1 0 50%'
                >
                  <Text variant='label'>{`${key.replace('Icon', '')}`}</Text>
                  <Space height='*1.5' />
                  <Text color='onSurface.secondary'>
                    {`import { ${key} } from '@one-dev/ui'`}
                  </Text>
                </Box>
                <Box
                  alignItems='center'
                  borderLeft='thin'
                  display='flex'
                  paddingX='md'
                  flex='1 0 50%'
                >
                  <Icon size='lg' />
                </Box>
              </Box>
            )
          })}
      </Box>
    </ThemeProvider>
  )
}

IconsTable.propTypes = {
  icons: PropTypes.object,
}
