import React from 'react'
import Box from '../Box'
import Divider from './Divider'
import Text from '../Text'
import { createComponentStory } from '../../../utils'

export default createComponentStory(Divider, {
  caption: 'Separates content with a line',
  description: `
    A Divider is helpful for separating groups of content.
    You can orient dividers horizontally or vertically.

    ###### Notes
    * Divider *does not* spread props into the root element.

  `,
})

export const Basic = args =>
  args.vertical ? (
    <Box
      display='flex'
      flexDirection='row'
      height='200px'
      justifyContent='center'
    >
      <Divider {...args} />
    </Box>
  ) : (
    <Divider {...args} />
  )

// eslint-disable-next-line no-unused-vars
export const WithFlexboxRows = args => (
  <Box display='flex' flexDirection='column'>
    <Box padding='md'>
      <Text align='center'>One</Text>
    </Box>
    <Divider />
    <Box padding='md'>
      <Text align='center'>Two</Text>
    </Box>
    <Divider />
    <Box padding='md'>
      <Text align='center'>Three</Text>
    </Box>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithGridRows = args => (
  <Box display='grid' gridTemplateRows='repeat(5, min-content)'>
    <Box padding='md'>
      <Text align='center'>One</Text>
    </Box>
    <Divider />
    <Box padding='md'>
      <Text align='center'>Two</Text>
    </Box>
    <Divider />
    <Box padding='md'>
      <Text align='center'>Three</Text>
    </Box>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithFlexboxColumns = args => (
  <Box display='flex' flexDirection='row'>
    <Box flex='1 1 auto' paddingY='xl'>
      <Text align='center'>One</Text>
    </Box>
    <Divider vertical />
    <Box flex='1 1 auto' paddingY='xl'>
      <Text align='center'>Two</Text>
    </Box>
    <Divider vertical />
    <Box flex='1 1 auto' paddingY='xl'>
      <Text align='center'>Three</Text>
    </Box>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithGridColumns = args => (
  <Box display='grid' gridTemplateColumns='1fr auto 1fr auto 1fr'>
    <Box paddingY='xl'>
      <Text align='center'>One</Text>
    </Box>
    <Divider vertical />
    <Box paddingY='xl'>
      <Text align='center'>Two</Text>
    </Box>
    <Divider vertical />
    <Box paddingY='xl'>
      <Text align='center'>Three</Text>
    </Box>
  </Box>
)
