import React, { useRef, useState } from 'react'
import Button from './Button'
import Box from '../Box'
import Card from '../Card'
import CardActions from '../CardActions'
import CardContent from '../CardContent'
import CardHeader from '../CardHeader'
import Space from '../Space'
import Stack from '../Stack'
import Text from '../Text'
import { ChevronLeftIcon, ChevronRightIcon } from '../../icons'
import { createComponentStory } from '../../../utils'

export default createComponentStory(Button, {
  caption: 'Allows users to take actions and make choices with a single tap.',
  description: `
    Use the Button to provide cues for actions and events.
    This fundamental component allows users to process actions or
    navigate an experience. Use a button when a person
    submits a form or starts a new task or action.
  `,
})

export const Basic = args => (
  <Button {...args}>{`${args.children || args.variant || 'Button'}`}</Button>
)

// eslint-disable-next-line no-unused-vars
export const WithColors = args => (
  <Stack align='left' space='sm'>
    <Button color='brand'>Brand</Button>
    <Button color='brand2'>Brand2</Button>
    <Button color='error'>Error</Button>
    <Button color='neutral'>Neutral</Button>
    <Button color='#FFA600'>Custom</Button>
  </Stack>
)

// eslint-disable-next-line no-unused-vars
export const WithVariants = args => (
  <Stack align='left' space='sm'>
    <Button variant='primary'>Primary</Button>
    <Button variant='secondary'>Secondary</Button>
    <Button variant='tertiary'>Tertiary</Button>
    <Button variant='text'>Text</Button>
  </Stack>
)

// eslint-disable-next-line no-unused-vars
export const WithShapes = args => (
  <Stack align='left' space='sm'>
    <Button shape='square'>Default Shape</Button>
    <Button shape='pill'>Pill Shape</Button>
  </Stack>
)

// eslint-disable-next-line no-unused-vars
export const WithStates = args => (
  <Stack align='left' space='sm'>
    <Button>No State</Button>
    <Button loading>Loading</Button>
    <Button disabled>Disabled</Button>
  </Stack>
)

// eslint-disable-next-line no-unused-vars
export const WithIcon = args => (
  <Stack align='left' space='sm'>
    <Button icon={<ChevronLeftIcon />}>Go Back</Button>
    <Button icon={<ChevronRightIcon />} iconPosition='end'>
      Continue
    </Button>
  </Stack>
)

export const WithHref = args => (
  <Button href={args.href || 'https://google.com'}>View Google Website</Button>
)

export const WithHierarchy = () => {
  const timeout = useRef(null)
  const [loading, setLoading] = useState(false)

  const handleCancel = () => {
    setLoading(false)

    if (timeout.current) {
      clearTimeout(timeout.current)
    }
  }

  const handleSubmit = () => {
    setLoading(true)
    timeout.current = setTimeout(() => {
      setLoading(false)
    }, 3000)
  }

  return (
    <Box maxWidth='460px'>
      <Card>
        <CardHeader
          title='Remove Vehicle'
          subtitle='Do you want to remove the following vehicle?'
        />
        <CardContent>
          <Box border='thin' padding='md' borderRadius='lg'>
            <Text>Acura TL - ABC123</Text>
          </Box>
        </CardContent>
        <CardActions align='end'>
          <Button color='neutral' onClick={handleCancel} variant='secondary'>
            Cancel
          </Button>
          <Space width='sm' />
          <Button color='error' loading={loading} onClick={handleSubmit}>
            Remove
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}
