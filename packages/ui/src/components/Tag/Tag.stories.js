import React from 'react'
import Stack from '../Stack'
import Tag from './Tag'
import Box from '../Box'
import Space from '../Space'
import WarningIcon from '../../icons/Warning'
import { createComponentStory } from '../../../utils'

export default createComponentStory(Tag, {
  args: {
    children: 'Tag',
  },
  caption: 'Displays keywords associated with an item',
  controls: {
    children: 'text',
    closeable: 'boolean',
    color: 'text',
    rounded: 'boolean',
    variant: {
      options: ['filled', 'outline'],
      type: 'radio',
    },
  },
  description: `
    Use a Tag to display keywords that describe an item. Common tags include
    an item's attributes, category, or labels.

    ###### Notes
    The Tag component wraps children in a [Text](/?path=/docs/components-text--basic) 
    component. This means children should only be valid child elements of a Text component.

    ###### Accessibility
    The Tag will set \`aria-label='Remove {children}'\` on the close button. For example,
    if the Tag's child text is 'cars', the close button will have an \`aria-label\` set to 
    'Remove cars'. 
  `,
})

export const Basic = args => (
  <Box display='flex'>
    <Tag {...args}>{args.children}</Tag>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithColors = args => (
  <Box display='flex'>
    <Stack align='left' space='md'>
      <Tag color='brand'>Brand</Tag>
      <Tag color='brand2'>Brand2</Tag>
      <Tag color='error'>Error</Tag>
      <Tag color='neutral'>Neutral</Tag>
      <Tag color='warning'>Warning</Tag>
      <Tag color='pink'>Custom</Tag>
    </Stack>
    <Space width='md' />
    <Stack align='left' space='md'>
      <Tag variant='outline' color='brand'>
        Brand
      </Tag>
      <Tag variant='outline' color='brand2'>
        Brand2
      </Tag>
      <Tag variant='outline' color='error'>
        Error
      </Tag>
      <Tag variant='outline' color='neutral'>
        Neutral
      </Tag>
      <Tag variant='outline' color='warning'>
        Warning
      </Tag>
      <Tag variant='outline' color='pink'>
        Custom
      </Tag>
    </Stack>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithVariants = args => (
  <Box display='flex'>
    <Tag variant='filled'>Filled</Tag>
    <Space width='md' />
    <Tag variant='outline'>Outline</Tag>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithRounded = args => (
  <Box display='flex'>
    <Tag rounded>Rounded filled</Tag>
    <Space width='md' />
    <Tag rounded variant='outline'>
      Rounded outline
    </Tag>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithCloseable = args => (
  <Box display='flex'>
    <Tag closeable onClose={() => {}}>
      Closeable filled
    </Tag>
    <Space width='md' />
    <Tag variant='outline' closeable onClose={() => {}}>
      Closeable outline
    </Tag>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithIcon = args => (
  <Box display='flex'>
    <Tag color='warning' icon={<WarningIcon />}>
      Filled icon
    </Tag>
    <Space width='md' />
    <Tag color='warning' icon={<WarningIcon />} variant='outline'>
      Outline icon
    </Tag>
    <Space width='md' />
    <Tag closeable onClose={() => {}} color='warning' icon={<WarningIcon />}>
      Closeable filled icon
    </Tag>
    <Space width='md' />
    <Tag
      closeable
      onClose={() => {}}
      color='warning'
      icon={<WarningIcon />}
      variant='outline'
    >
      Closeable outline icon
    </Tag>
  </Box>
)
