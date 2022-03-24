import React from 'react'
import Box from '../Box'
import Button from '../Button'
import Card from '../Card'
import CardHeader from './CardHeader'
import { createComponentStory } from '../../../utils'
import Text from '../Text'

export default createComponentStory(CardHeader, {
  caption: 'Provides styling for the header text, avatar, and actions.',
  description: `
    Only use a CardHeader component inside of a
    [Card](/?path=/docs/components-card--basic) component.
    A CardHeader component can be used to position an avatar,
    title, subtitle, or action at the top of a Card.
  `,
})

export const Basic = args => (
  <Box maxWidth='320px'>
    <Card>
      <CardHeader {...args} />
    </Card>
  </Box>
)

Basic.args = {
  title: 'Shrimp and Chorizo Paella',
}

// eslint-disable-next-line no-unused-vars
export const WithSubtitle = args => (
  <Box maxWidth='320px'>
    <Card>
      <CardHeader
        title='Shrimp and Chorizo Paella'
        subtitle='September 15, 2020'
      />
    </Card>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithAvatar = args => (
  <Box maxWidth='320px'>
    <Card>
      <CardHeader
        avatar={
          <Box
            alignItems='center'
            backgroundColor='error'
            borderRadius='circular'
            color='onError.primary'
            display='flex'
            justifyContent='center'
            size='40px'
          >
            <Text variant='subtitle'>R</Text>
          </Box>
        }
        title='Shrimp and Chorizo Paella'
        subtitle='September 15, 2020'
      />
    </Card>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithAction = args => (
  <Box maxWidth='320px'>
    <Card>
      <CardHeader
        action={
          <Button shape='pill' variant='tertiary'>
            Change
          </Button>
        }
        title='Contact Info'
      ></CardHeader>
    </Card>
  </Box>
)
