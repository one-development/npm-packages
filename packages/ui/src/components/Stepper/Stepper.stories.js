import React from 'react'
import ChevronRightIcon from '../../icons/ChevronRight'
import Text from '../Text'
import Stepper from './Stepper'
import { createComponentStory } from '../../../utils'

export default createComponentStory(Stepper, {
  caption: 'Steppers display progress through a set of steps',
  controls: {
    separator: 'text',
  },
  description: `
    Use the Stepper component to display progress through a series of steps.

    ###### Notes
    Stepper generally expects to receive \`<Text>\` components as children.

    ###### Accessibility
    The active step provided as a child should include the \`aria-current='step'\`
    attribute. See https://www.w3.org/TR/wai-aria-1.1/#aria-current for more information
  `,
})

export const Basic = args => (
  <Stepper {...args}>
    <Text>First Step</Text>
    <Text>Second Step</Text>
    <Text weight='boldest' aria-current='step'>
      Current Step
    </Text>
  </Stepper>
)

// eslint-disable-next-line no-unused-vars
export const WithCustomSeparator = args => (
  <Stepper separator={<ChevronRightIcon />}>
    <Text>Zone</Text>
    <Text>Duration</Text>
    <Text>Vehicle</Text>
    <Text weight='boldest' aria-current='step'>
      Payment
    </Text>
    <Text color='onBackground.hint'>Review</Text>
  </Stepper>
)
