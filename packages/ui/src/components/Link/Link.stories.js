import React from 'react'
/* eslint-disable import/no-extraneous-dependencies */
import { MemoryRouter as Router } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
/* eslint-enable import/no-extraneous-dependencies */
import Link from './Link'
import Box from '../Box'
import Card from '../Card'
import CardHeader from '../CardHeader'
import CardContent from '../CardContent'
import Space from '../Space'
import Stack from '../Stack'
import Text from '../Text'
import { createComponentStory } from '../../../utils'

export default createComponentStory(Link, {
  caption: 'Allows users to navigate between pages',
  description: `
    Use a Link inside of a [Text](/?path=/docs/components-text--basic) 
    component to create an anchor tag with appropriate styling and attributes. 
    A Link can be presented inline inside a paragraph or as standalone text.

    ###### Notes
    * Unlike the Text component, the Link component *does not* remove vertical
    whitespace caused by line-height. You should always render Links as children
    of a Text component to ensure proper text styling and whitespace clipping.
    * If the Link does not have a meaningful href,
    the \`as\` prop should be set to a different element, like a \`<button>\`. Screen readers and
    other keyboard-only users cannot detect anchor tags that lack an href.

    ###### Accessibility
    * When providing text content for links, use 
    [specific descriptions](https://www.w3.org/WAI/WCAG21/quickref/#link-purpose-link-only)
    * For the best user experience, links should stand out from text on the page
    * If a link doesn't have a meaningful href, it should be rendered using a \`<button>\` element (example below)

    ###### Security
    When you use \`target="_blank"\`, Link will set \`rel="noopener"\` by default to prevent
    [security issues](https://web.dev/external-anchors-use-rel-noopener/). 
    You can override this behavior, but is recommended to set \`rel="noopener"\` or \`rel="noreferrer"\`
    when linking to third party content.

    * \`rel="noopener"\` prevents the new page from being able to access the \`window.opener\` 
    property and ensures it runs in a separate process. Without this, the target page can potentially 
    redirect your page to a malicious URL.
    * \`rel="noreferrer"\` has the same effect, but additionally prevents the Referer header 
    from being sent to the new page. NOTE: Removing the referrer header will affect analytics.
  `,
})

export const Basic = args => (
  <Text>
    <Link {...args}>Link</Link>
  </Text>
)

// eslint-disable-next-line no-unused-vars
export const WithColors = args => (
  <Stack align='left' space='sm'>
    <Text>
      <Link color='brand'>Brand</Link>
    </Text>
    <Text>
      <Link color='brand2'>Brand 2</Link>
    </Text>
    <Text>
      <Link color='error'>Error</Link>
    </Text>
    <Text>
      <Link color='inherit'>Inherit</Link>
    </Text>
    <Text>
      <Link color='orange'>Custom</Link>
    </Text>
  </Stack>
)

// eslint-disable-next-line no-unused-vars
export const WithUnderline = args => (
  <Stack align='left' space='sm'>
    <Text>
      <Link underline='none'>None</Link>
    </Text>
    <Text>
      <Link underline='hover'>Hover</Link>
    </Text>
    <Text>
      <Link underline='always'>Always</Link>
    </Text>
  </Stack>
)

// eslint-disable-next-line no-unused-vars
export const WithRouter = args => (
  <Router>
    <Text>
      <Link as={RouterLink} to='/'>
        React Router Link
      </Link>
    </Text>
  </Router>
)

// eslint-disable-next-line no-unused-vars
export const WithButton = args => (
  <Text>
    <Link as='button' onClick={() => {}}>
      I am a button
    </Link>
  </Text>
)

// eslint-disable-next-line no-unused-vars
export const WithTypicalUsage = args => (
  <Box backgroundColor='background' padding='xl' maxWidth='420px'>
    <Card>
      <CardHeader title='Typical Usage' />
      <CardContent>
        <Text>Links are typically used in one of the following 3 ways:</Text>
      </CardContent>
      <CardContent>
        <Text variant='label'>Standalone</Text>
        <Space height='sm' />
        <Text>Use block elements, like Text, to create a standalone link.</Text>
        <Space height='md' />
        <Text>
          <Link href='https://acme.co'>Privacy Policy</Link>
        </Text>
      </CardContent>
      <CardContent>
        <Text variant='label'>Inline</Text>
        <Space height='sm' />
        <Text>
          Create an inline <Link href='https://acme.co'>link</Link> by adding it
          within a body of text.
        </Text>
      </CardContent>
      <CardContent>
        <Text variant='label'>Subtle</Text>
        <Space height='sm' />
        <Text>
          A subtle{' '}
          <Link href='https://acme.co' color='inherit'>
            link
          </Link>{' '}
          matches the style of the surrounding text. You can set the color prop
          to <i>inherit</i> to create a subtle link.
        </Text>
      </CardContent>
    </Card>
  </Box>
)
