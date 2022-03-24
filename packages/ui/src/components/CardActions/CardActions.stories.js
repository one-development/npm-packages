import React from 'react'
import { createComponentStory } from '../../../utils'
import Box from '../Box'
import Button from '../Button'
import Card from '../Card'
import CardActions from './CardActions'
import CardContent from '../CardContent'
import Stack from '../Stack'
import Text from '../Text'

export default createComponentStory(CardActions, {
  caption: 'Provides styling for action elements in a Card.',
  description: `
    Only use a CardActions component inside of a 
    [Card](/?path=/docs/components-card--basic) component.
    CardActions can display buttons, icons, or other action elements at the bottom of a Card.
  `,
})

export const Basic = args => (
  <Box maxWidth='320px'>
    <Card>
      <CardContent>
        <Text>
          Use the CardActions component to display buttons, icons, or other
          action elements at the bottom of a Card.
        </Text>
      </CardContent>
      <CardActions {...args}>
        <Button variant='tertiary'>Learn More</Button>
      </CardActions>
    </Card>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithAlignment = args => (
  <Box maxWidth='320px'>
    <Stack space='lg'>
      <Card>
        <CardContent>
          <Text>
            The actions in this Card are aligned to the start, which is the
            default
          </Text>
        </CardContent>
        <CardActions>
          <Button variant='tertiary'>Learn More</Button>
          <Button variant='text'>No Thanks</Button>
        </CardActions>
      </Card>

      <Card>
        <CardContent>
          <Text>
            The actions in this Card are aligned to the end, which is <i>not</i>{' '}
            the default
          </Text>
        </CardContent>
        <CardActions align='end'>
          <Button variant='text'>No Thanks</Button>
          <Button variant='tertiary'>Learn More</Button>
        </CardActions>
      </Card>
    </Stack>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithFullWidth = args => (
  <Box maxWidth='360px'>
    <Card>
      <CardContent>
        <Text>
          Here is an example that illustrates how you can make the actions equal
          width
        </Text>
      </CardContent>
      <CardActions>
        <Box flex='1 1 50%'>
          <Button variant='secondary' color='neutral' fullWidth>
            Yes
          </Button>
        </Box>
        <Box flex='1 1 50%'>
          <Button fullWidth>No</Button>
        </Box>
      </CardActions>
    </Card>
  </Box>
)
