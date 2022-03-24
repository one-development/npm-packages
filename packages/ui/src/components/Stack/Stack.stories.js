import React from 'react'
import Box from '../Box'
import Space from '../Space'
import Stack from './Stack'
import Text from '../Text'
import { createComponentStory } from '../../../utils'

export default createComponentStory(Stack, {
  caption: 'Adds consistent space between items in a list',
  controls: {
    align: {
      options: ['left', 'right', 'center', 'stretch'],
      type: 'radio',
    },
    dividers: 'boolean',
    space: 'text',
  },
  description: `
    Use a Stack to consistently space blocks of text, list items, etc.
    With a Stack, you can control the space, alignment, and even add dividers.

    ###### Accessibility
    When using a stack with links or other navigation elements, it can be helpful
    to set \`role='list'\` on the root and \`role='listitem'\` on each child.
  `,
})

export const Basic = args => (
  <Stack {...args}>
    <Box
      border='thick'
      height='40px'
      minWidth='40px'
      backgroundColor='background'
    />
    <Box
      border='thick'
      height='40px'
      minWidth='40px'
      backgroundColor='background'
    />
    <Box
      border='thick'
      height='40px'
      minWidth='40px'
      backgroundColor='background'
    />
  </Stack>
)

export const WithAlignment = () => (
  <Box
    marginX='auto'
    maxWidth='420px'
    borderLeft='thin'
    borderRight='thin'
    padding='md'
  >
    <Text>Align items to the left</Text>
    <Space height='sm' />
    <Stack space='lg' align='left'>
      <Box
        border='thick'
        height='40px'
        minWidth='60px'
        backgroundColor='background'
      />
      <Box
        border='thick'
        height='40px'
        minWidth='80px'
        backgroundColor='background'
      />
      <Box
        border='thick'
        height='40px'
        minWidth='120px'
        backgroundColor='background'
      />
    </Stack>
    <Space height='lg' />
    <Text>Align items to the right</Text>
    <Space height='sm' />
    <Stack space='lg' align='right'>
      <Box
        border='thick'
        height='40px'
        minWidth='60px'
        backgroundColor='background'
      />
      <Box
        border='thick'
        height='40px'
        minWidth='80px'
        backgroundColor='background'
      />
      <Box
        border='thick'
        height='40px'
        minWidth='120px'
        backgroundColor='background'
      />
    </Stack>
    <Space height='lg' />
    <Text>Align items to the center</Text>
    <Space height='sm' />
    <Stack space='lg' align='center'>
      <Box
        border='thick'
        height='40px'
        minWidth='60px'
        backgroundColor='background'
      />
      <Box
        border='thick'
        height='40px'
        minWidth='80px'
        backgroundColor='background'
      />
      <Box
        border='thick'
        height='40px'
        minWidth='120px'
        backgroundColor='background'
      />
    </Stack>
    <Space height='lg' />
    <Text>Align items stretch</Text>
    <Space height='sm' />
    <Stack space='lg' align='stretch'>
      <Box border='thick' height='40px' backgroundColor='background' />
      <Box border='thick' height='40px' backgroundColor='background' />
      <Box border='thick' height='40px' backgroundColor='background' />
    </Stack>
    <Space height='lg' />
    <Text>Center on mobile, left on desktop</Text>
    <Space height='sm' />
    <Stack space='lg' align={['center', 'center', 'left']}>
      <Box
        border='thick'
        height='40px'
        minWidth='60px'
        backgroundColor='background'
      />
      <Box
        border='thick'
        height='40px'
        minWidth='80px'
        backgroundColor='background'
      />
      <Box
        border='thick'
        height='40px'
        minWidth='120px'
        backgroundColor='background'
      />
    </Stack>
  </Box>
)

export const WithDividers = () => (
  <Box
    marginX='auto'
    maxWidth='420px'
    borderLeft='thin'
    borderRight='thin'
    padding='md'
  >
    <Stack space='md' dividers>
      <Box
        border='thick'
        height='40px'
        width='60px'
        backgroundColor='background'
      />
      <Box
        border='thick'
        height='40px'
        width='80px'
        backgroundColor='background'
      />
      <Box
        border='thick'
        height='40px'
        width='120px'
        backgroundColor='background'
      />
    </Stack>
  </Box>
)

export const WithSizes = () => (
  <Box
    marginX='auto'
    maxWidth='420px'
    borderLeft='thin'
    borderRight='thin'
    padding='md'
  >
    <Text>xs</Text>
    <Space height='sm' />
    <Stack space='xs'>
      <Box border='thick' height='40px' backgroundColor='background' />
      <Box border='thick' height='40px' backgroundColor='background' />
      <Box border='thick' height='40px' backgroundColor='background' />
    </Stack>
    <Space height='lg' />
    <Text>sm</Text>
    <Space height='sm' />
    <Stack space='sm'>
      <Box border='thick' height='40px' backgroundColor='background' />
      <Box border='thick' height='40px' backgroundColor='background' />
      <Box border='thick' height='40px' backgroundColor='background' />
    </Stack>
    <Space height='lg' />
    <Text>md</Text>
    <Space height='sm' />
    <Stack space='md'>
      <Box border='thick' height='40px' backgroundColor='background' />
      <Box border='thick' height='40px' backgroundColor='background' />
      <Box border='thick' height='40px' backgroundColor='background' />
    </Stack>
    <Space height='lg' />
    <Text>lg</Text>
    <Space height='sm' />
    <Stack space='lg'>
      <Box border='thick' height='40px' backgroundColor='background' />
      <Box border='thick' height='40px' backgroundColor='background' />
      <Box border='thick' height='40px' backgroundColor='background' />
    </Stack>
    <Space height='lg' />
    <Text>custom</Text>
    <Space height='sm' />
    <Stack space='51px'>
      <Box border='thick' height='40px' backgroundColor='background' />
      <Box border='thick' height='40px' backgroundColor='background' />
      <Box border='thick' height='40px' backgroundColor='background' />
    </Stack>
  </Box>
)
