import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { Box, lightTheme, ThemeProvider, Text } from '../../src'

export default function ColorSwatch(props) {
  const { swatch } = props

  return (
    <ThemeProvider theme={lightTheme}>
      <Box
        boxShadow='rgba(0,0,0,0.10) 0 1px 3px 0'
        border='thin'
        borderRadius='6px'
        overflow='hidden'
        marginTop='lg'
      >
        {Object.keys(swatch)
          .filter(color => _.isString(swatch[color]))
          .map(color => (
            <Box
              alignItems='center'
              backgroundColor={swatch[color]}
              margin={`${color}` === `${swatch.closest}` ? 'xs' : '0px'}
              color={lightTheme.colors.on(swatch[color])}
              display='flex'
              justifyContent='space-between'
              key={color}
              overflow='hidden'
              padding='md'
              paddingLeft={`${color}` === `${swatch.closest}` ? '12px' : 'md'}
            >
              <Text>{color}</Text>
              <Text>{swatch[color]}</Text>
            </Box>
          ))}
      </Box>
    </ThemeProvider>
  )
}

ColorSwatch.propTypes = {
  swatch: PropTypes.object.isRequired,
}
