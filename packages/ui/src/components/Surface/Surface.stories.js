import React from 'react'
import Box from '../Box'
import Surface from './Surface'
import Text from '../Text'
import { createComponentStory } from '../../../utils'

export default createComponentStory(Surface, {
  caption:
    'Serves as a base for Card, Drawer, Modal, and other surface components',
  description: `
    Use Surface to provide the correct background color, text color, and elevation styles
    for a surface. It should be used to build custom surface components in your app
    or as a base for other One UI components, like Drawer and Modal.
  `,
})

export const Basic = args => (
  <Box backgroundColor='background' padding='xl'>
    <Surface {...args}>
      <Box padding='xl'>
        <Text>This text is displayed on top of a surface</Text>
      </Box>
    </Surface>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithElevation = args => (
  <Box
    backgroundColor='background'
    padding='xl'
    display='grid'
    gridTemplateRows='repeat(6, 150px)'
    gridTemplateColumns='1fr'
    gridRowGap='md'
  >
    <Surface />
    <Surface elevation='xs' />
    <Surface elevation='sm' />
    <Surface elevation='md' />
    <Surface elevation='lg' />
    <Surface elevation='xl' />
  </Box>
)
