import React from 'react'
import Box from '../Box'
import Card from '../Card'
import CardContent from '../CardContent'
import Radio from '../Radio'
import RadioDetails from './RadioDetails'
import RadioGroup from '../RadioGroup'
import Text from '../Text'
import { createComponentStory } from '../../../utils'

export default createComponentStory(RadioDetails, {
  caption:
    'Displays additional fields or context underneath a selected Radio input',
  description: `
    Use a RadioDetails inside of a [RadioGroup](/?path=/docs/components-radiogroup--basic)
    or as a standalone component for special use cases.

    ###### Notes
    * A RadioDetails is expected to be rendered inside a RadioGroup *after* a Radio component
    * The RadioDetails will automatically be shown/hidden when used inside a RadioGroup apropriately

    ###### Accessibility
    * Always define an \`id\` for RadioDetails components
    * RadioGroup will set \`aria-controls\` and \`aria-expanded\` on the preceeding Radio component
  `,
})

export const Basic = args => (
  <RadioDetails id='radio-details-basic' {...args}>
    <Text>Radio details go here</Text>
  </RadioDetails>
)

// eslint-disable-next-line no-unused-vars
export const WithRadioGroup = args => (
  <Box maxWidth='420px'>
    <Card>
      <CardContent>
        <form>
          <RadioGroup id='color' name='color' defaultValue='blue'>
            <Radio id='blue' value='blue' label='Blue' />
            <RadioDetails id='blue-details'>
              <Text>Your app will be themed blue</Text>
            </RadioDetails>
            <Radio id='red' value='red' label='Red' />
            <RadioDetails id='red-details'>
              <Text>Your app will be themed red</Text>
            </RadioDetails>
          </RadioGroup>
        </form>
      </CardContent>
    </Card>
  </Box>
)
