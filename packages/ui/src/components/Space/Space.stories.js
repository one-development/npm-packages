import React from 'react'
import Box from '../Box'
import Card from '../Card'
import CardContent from '../CardContent'
import CardHeader from '../CardHeader'
import Stack from '../Stack'
import Text from '../Text'
import { createComponentStory } from '../../../utils'
import Space from './Space'

const story = createComponentStory(Space, {
  args: {
    height: 'xl',
    inline: false,
    size: undefined,
    width: 'xl',
  },
  caption: 'Creates spacing between elements',
  controls: {
    height: 'text',
    inline: 'boolean',
    size: 'text',
    width: 'text',
  },
  description: `
    Use the Space component to create spacing between elements, 
    using the space scale.

    ###### Notes
    * The \`size\` prop can be used as a convenient shorthand to set height and width
    at the same time
    * When \`size\` is defined, it will take precedence over \`height\` or \`width\`
    * The \`height\`, \`size\`, and \`width\` props all support a special multiplier syntax.
    * For example, you can specify \`width='*1.5'\` to multiple 1.5 times the grid and get \`12px\`
  `,
})

export default story

export const Basic = args => (
  <Box display='flex' justifyContent='flex-start'>
    <Box border='thin'>
      <Space {...args} />
    </Box>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithFlexRow = args => (
  <Box border='thin' display='flex' flexDirection='row'>
    <Box
      flex='1 1 auto'
      backgroundColor='surface'
      height='50px'
      borderRight='thin'
    />
    <Space width='xl' />
    <Box
      flex='1 1 auto'
      backgroundColor='surface'
      height='50px'
      borderLeft='thin'
    />
  </Box>
)

export const WithResponsiveDimensions = () => (
  <Box maxWidth='420px'>
    <Card>
      <CardHeader title='Using Responsive Props' />
      <CardContent>
        <Text>This box is smaller at breakpoints smaller than 600px.</Text>
        <Space height='md' />
        <Box display='flex'>
          <Box border='thick'>
            <Space
              height={['md', null, 'xxl']}
              width={{ _: 'md', sm: 'xxl' }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithCustomDimensions = args => (
  <Stack align='left'>
    <div>
      <Text variant='label'>*10.5</Text>
      <Box border='thick' marginTop='sm'>
        <Space size='*10.5' />
      </Box>
    </div>

    <div>
      <Text variant='label'>*20</Text>
      <Box border='thick' marginTop='sm'>
        <Space size='*20' />
      </Box>
    </div>

    <div>
      <Text variant='label'>*30 x *50</Text>
      <Box border='thick' marginTop='sm'>
        <Space height='*30' width='*50' />
      </Box>
    </div>
  </Stack>
)
