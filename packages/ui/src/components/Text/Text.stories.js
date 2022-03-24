import React from 'react'
import Stack from '../Stack'
import Card from '../Card'
import CardContent from '../CardContent'
import Box from '../Box'
import Text from './Text'
import { createComponentStory } from '../../../utils'

export default createComponentStory(Text, {
  args: {
    align: Text.defaultProps.align,
    children: 'This is some text',
    color: Text.defaultProps.color,
    transform: 'none',
    truncate: Text.defaultProps.truncate,
    variantMapping: undefined,
  },
  caption: 'Applies typography styles to flow content',
  controls: {
    align: 'text',
    backgroundColor: 'text',
    children: 'text',
    color: 'text',
    decoration: 'text',
    opacity: {
      max: 1,
      min: 0,
      step: 0.1,
      type: 'range',
    },
    transform: {
      options: ['uppercase', 'lowercase', 'capitalize', 'none'],
      type: 'radio',
    },
    truncate: 'boolean',
    variant: {
      options: [
        'body',
        'button',
        'caption',
        'display1',
        'display2',
        'display3',
        'h1',
        'h2',
        'subtitle',
        'overline',
        'label',
      ],
      type: 'select',
    },
    weight: {
      options: ['regular', 'bolder', 'boldest'],
      type: 'radio',
    },
  },
  description: `
    Use Text to apply typography styles and trim vertical white-space caused by line-height.

    ###### Notes
    * Text is designed to behave like a
    [block-level](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements) element in the
    [flow content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Flow_content)
    category (p, h1, h2, etc.).
    * Text components should *never* be nested within one another
    and should generally restrict children to plain text or
    [phrasing content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content).
    * If you need to emphasize certain text, consider using an \`<i>\`, \`<b>\`, or \`<em>\` element alongside plain text.
    * If you need to render two different typography styles side-by-side, consider using use two Text
    components within a flexbox parent container.
  `,
})

export const Basic = args => (
  <Box maxWidth='300px'>
    <Text {...args}>{args.children}</Text>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithVariants = args => (
  <Stack>
    <Text variant='display1'>display1</Text>
    <Text variant='display2'>display2</Text>
    <Text variant='display3'>display3</Text>
    <Text variant='h1'>h1</Text>
    <Text variant='h2'>h2</Text>
    <Text variant='subtitle'>subtitle</Text>
    <Text variant='button'>button</Text>
    <Text variant='body'>body</Text>
    <Text variant='label'>label</Text>
    <Text variant='overline'>overline</Text>
    <Text variant='caption'>caption</Text>
  </Stack>
)

// eslint-disable-next-line no-unused-vars
export const WithColors = args => (
  <Box display='flex'>
    <Box padding='md' border='thin'>
      <Stack>
        <Text color='onSurface.primary'>Primary</Text>
        <Text color='onSurface.secondary'>Secondary</Text>
        <Text color='onSurface.hint'>Hint</Text>
        <Text color='onSurface.disabled'>Disabled</Text>
        <Text color='green'>Custom</Text>
      </Stack>
    </Box>
    <Box marginLeft='lg' padding='md' backgroundColor='brand'>
      <Stack>
        <Text color='onBrand.primary'>Primary</Text>
        <Text color='onBrand.secondary'>Secondary</Text>
        <Text color='onBrand.hint'>Hint</Text>
        <Text color='onBrand.disabled'>Disabled</Text>
        <Text color='orange'>Custom</Text>
      </Stack>
    </Box>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithWeights = args => (
  <Stack>
    <Text>Normal</Text>
    <Text weight='bolder'>Bolder</Text>
    <Text weight='boldest'>Boldest</Text>
  </Stack>
)

// eslint-disable-next-line no-unused-vars
export const WithEmphasis = args => (
  <Box maxWidth='420px'>
    <Card>
      <CardContent>
        <Text>
          You can easily create <b>bold</b> or <i>italicized</i> words within
          blocks of text. Just render a `b` or `i` element as a child of a Text
          component. Additionally, Text supports a <i>weight</i> property that
          can be used to bold entire blocks of text.
        </Text>
      </CardContent>
    </Card>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithTruncation = args => (
  <Box maxWidth='420px'>
    <Card>
      <CardContent>
        <Text truncate>
          This text will be clipped because `truncate=true` and the text is long
          enough to fill the entire card.
        </Text>
      </CardContent>
    </Card>
  </Box>
)

// eslint-disable-next-line no-unused-vars
export const WithWrapping = args => {
  return (
    <Box maxWidth='420px'>
      <Card>
        <CardContent>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam
            vestibulum morbi blandit cursus risus. Arcu bibendum at varius vel.
            Tristique senectus et netus et malesuada fames ac turpis egestas. A
            pellentesque sit amet porttitor. Amet tellus cras adipiscing enim
            eu. Urna et pharetra pharetra massa massa ultricies. Volutpat lacus
            laoreet non curabitur gravida arcu ac tortor. Aliquam malesuada
            bibendum arcu vitae elementum curabitur vitae. Rhoncus mattis
            rhoncus urna neque viverra justo nec. Amet est placerat in egestas
            erat. Aliquet porttitor lacus luctus accumsan tortor. Sed libero
            enim sed faucibus turpis. Aliquam vestibulum morbi blandit cursus
            risus at.
          </Text>
        </CardContent>
        <CardContent>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </CardContent>
      </Card>
    </Box>
  )
}

// eslint-disable-next-line no-unused-vars
export const WithStacking = args => (
  <Box maxWidth='420px'>
    <Stack>
      <Card>
        <CardContent>
          <Text>
            This example illustrates the whiteSpace clipping that is built into
            the Text component. The Text component strips unnecessary whiteSpace
            caused by line-height. This means that space between text components
            will be exact.
          </Text>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Text variant='overline'>HIIIIIIIIIII</Text>
          <Text variant='caption'>HIIIIIIIIIII</Text>
          <Text variant='label' variantMapping={{ label: 'p' }}>
            HIIIIIIIIIII
          </Text>
          <Text variant='button' variantMapping={{ button: 'p' }}>
            HIIIIIIIIIII
          </Text>
          <Text variant='body'>HIIIIIIIIIII</Text>
          <Text variant='subtitle'>HIIIIIIIIIII</Text>
          <Text variant='h2'>HIIIIIIIIIII</Text>
          <Text variant='h1'>HIIIIIIIIIII</Text>
          <Text variant='display3'>HIIIIIIIIIII</Text>
          <Text variant='display2'>HIIIIIIIIIII</Text>
          <Text variant='display1'>HIIIIIIIIIII</Text>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Text variant='body'>HIIIIIIIIIII</Text>
          <Text variant='body'>HIIIIIIIIIII</Text>
          <Text variant='body'>HIIIIIIIIIII</Text>
          <Text variant='body'>HIIIIIIIIIII</Text>
          <Text variant='body'>HIIIIIIIIIII</Text>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Text variant='body'>HIIIIIIIIIII</Text>
          <Text variant='body'>HIIIIIIIIIII</Text>
          <Text variant='body'>HIIIIIIIIIII</Text>
          <Text variant='body'>HIIIIIIIIIII</Text>
          <Text variant='body'>HIIIIIIIIIII</Text>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Text variant='h1'>HIIIIIIIIIII</Text>
          <Text variant='h1'>HIIIIIIIIIII</Text>
          <Text variant='h1'>HIIIIIIIIIII</Text>
          <Text variant='h1'>HIIIIIIIIIII</Text>
          <Text variant='h1'>HIIIIIIIIIII</Text>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Text variant='display1'>HIIIIIIIIIII</Text>
          <Text variant='display1'>HIIIIIIIIIII</Text>
          <Text variant='display1'>HIIIIIIIIIII</Text>
          <Text variant='display1'>HIIIIIIIIIII</Text>
          <Text variant='display1'>HIIIIIIIIIII</Text>
        </CardContent>
      </Card>
    </Stack>
  </Box>
)
