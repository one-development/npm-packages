import React from 'react'
import { createComponentStory } from '../../../utils'
import Box from '../Box'
import Card from '../Card'
import CardContent from './CardContent'
import Text from '../Text'

export default createComponentStory(CardContent, {
  caption: 'Provides styling for text and other elements in a Card.',
  description: `
    Only use CardContent components inside of a 
    [Card](/?path=/docs/components-card--basic) component.
    CardContent components can position paragraphs, forms, or other primary 
    content in the middle of a Card.
  `,
})

export const Basic = args => (
  <Box maxWidth='320px'>
    <Card>
      <CardContent {...args}>
        <Text>
          Use the CardContent component to provide padding around basic text and
          other content in Cards.
        </Text>
      </CardContent>
    </Card>
  </Box>
)

export const WithMultiple = args => (
  <Box maxWidth='320px'>
    <Card>
      <CardContent {...args}>
        <Text>
          Use the CardContent component to provide padding around basic text and
          other content in Cards.
        </Text>
      </CardContent>
      <CardContent {...args}>
        <Text>
          By the way, did you know that you can add as many CardContent elements
          to your card as you would like? This is great for scenarios where you
          have multiple blocks of text.
        </Text>
      </CardContent>
    </Card>
  </Box>
)
