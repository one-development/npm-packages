import React from 'react'
import Box from '../Box'
import BoxStory from '../Box/Box.stories'
import Container from './Container'
import Card from '../Card'
import CardContent from '../CardContent'
import CardHeader from '../CardHeader'
import Link from '../Link'
import Space from '../Space'
import Text from '../Text'
import { createComponentStory } from '../../../utils'

const story = createComponentStory(Container, {
  caption: 'The most basic layout element',
  description: `
    Use a Container as the root of your main content. Semantically, Container
    can be thought of as equivalent to \`<main>\`. 
    It will center your content horizontally and apply the correct
    max-width and gutters.
    
    ###### Notes
    * Container is built with [Box](/?path=/docs/components-box--basic) and supports all of its props

    ###### Accessibility
    * When using container as the root element for your content, set \`as='main'\`
    or \`role='main'\`
    and provide an id
    * A page should only have *one* \`main\` element
  `,
})

story.argTypes = BoxStory.argTypes

export default story

export const Basic = args => (
  <Container {...args}>
    <Box border='thin' height='250px' />
  </Container>
)

// eslint-disable-next-line no-unused-vars
export const WithNoGutters = args => (
  <Container disableGutters>
    <Box border='thin' height='250px' />
  </Container>
)

// eslint-disable-next-line no-unused-vars
export const WithNoMaxWidth = args => (
  <Container disableMaxWidth>
    <Box border='thin' height='250px' />
  </Container>
)

// eslint-disable-next-line no-unused-vars
export const WithAppLayout = args => (
  <Box backgroundColor='background' border='thin'>
    <Box
      alignItems='center'
      borderBottom='thin'
      backgroundColor='surface'
      display='flex'
      height='appbarHeight'
      paddingX='md'
    >
      <Text variant='h1'>ACME</Text>
      <Box as='nav' marginLeft='auto'>
        <Box display='flex' role='list'>
          <Text role='listitem'>
            <Link href='/home'>Home</Link>
          </Text>
          <Space width='md' />
          <Text role='listitem'>
            <Link href='/products'>Products</Link>
          </Text>
          <Space width='md' />
          <Text role='listitem'>
            <Link href='/account'>Account</Link>
          </Text>
        </Box>
      </Box>
    </Box>
    <Container as='main' marginX='auto' paddingY='lg'>
      <Card>
        <CardHeader title='About ACME' />
        <CardContent>Here is some text about ACME corp</CardContent>
      </Card>
    </Container>
  </Box>
)
