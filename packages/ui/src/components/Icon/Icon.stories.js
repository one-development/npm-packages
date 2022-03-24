import React from 'react'
import Button from '../Button'
import Icon from './Icon'
import { CloseIcon, CheckIcon } from '../../icons'
import Stack from '../Stack'
import { createComponentStory } from '../../../utils'

export default createComponentStory(Icon, {
  caption: 'Visually indicate an action or option',
  description: `
    The Icon component renders an \`svg\` icon and provides built-in accessibility.
    Use an Icon component to convey semantic meaning or to reinforce visual style and branding.

    ###### Notes
    * Icon renders an \`svg\` element and expects \`path\` elements as children
    * Icon expects one \`path\` element for negative space (fill="none") and one for the icon's fill.
    * A *Decorative Icon* is used for visual or branding reinforcement. Decorative icons
    do not affect a user's ability to understand the page.
    * A *Semantic Icon* is used to convey meaning. A semantic icon may be used as a text
    alternative or as an interactive control, like a button, form element, or toggle.

    ###### Accessibility
    * Icon will automatically set \`role\` to \`img\` when \`title\` is defined.
    * Icon will automatically set \`aria-hidden=true\` when \`title\` is not defined.
    * For purely *decorative* icons used for visual or branding reinforcement,
    omit the \`title\` prop and the icon will not be visible to screen readers.
    * For *semantic* icons that convey meaning (icon buttons, toggles, etc.), define a \`title\`
    attribute so that your icon is properly accessible.
  `,
})

export const Basic = args => (
  <Icon {...args}>
    <path d='M0 0h24v24H0z' fill='none' />
    <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
  </Icon>
)

Basic.args = {
  size: 'lg',
}

// eslint-disable-next-line no-unused-vars
export const WithColors = args => (
  <Stack space='md'>
    <CloseIcon size='lg' color='inherit' />
    <CloseIcon size='lg' color='brand' />
    <CloseIcon size='lg' color='brand2' />
    <CloseIcon size='lg' color='error' />
    <CloseIcon size='lg' color='orange' />
  </Stack>
)

// eslint-disable-next-line no-unused-vars
export const WithSizes = args => (
  <Stack space='md'>
    <CloseIcon size='sm' />
    <CloseIcon size='md' />
    <CloseIcon size='lg' />
    <CloseIcon size='64px' />
  </Stack>
)

// eslint-disable-next-line no-unused-vars
export const WithButton = args => (
  <Button icon={<CheckIcon />} iconPosition='end'>
    Save Changes
  </Button>
)
