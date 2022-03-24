import React, { useState } from 'react'
import Box from '../Box'
import Button from '../Button'
import Text from '../Text'
import { createComponentStory, delay } from '../../../utils'
import Spinner from './Spinner'

export default createComponentStory(Spinner, {
  caption:
    'Expresses an unspecified wait time or display the length of a process',
  description: `
    Use a Spinner to inform users about the status of ongoing processes, such as loading an app,
    submitting a form, or saving updates. Spinner's communicate an app’s state and indicate available
    actions, such as whether users can navigate away from the current screen.

    ###### Accessibility
    * use \`role="progressbar"\` (default prop) for spinners that are already visible when page content is loading
    * if the spinner is describing the loading progress of a particular region of a page, use \`aria-describedby\` to point
    to the spinner, and set \`aria-busy="true"\` on that region until it has finished loading
    * use \`role='status'\` and \`aria-live='polite'\` for spinners that should inform users about the status of a recent action
    (i.e. form submission)
    * read more about about using status messages [here](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA22.html)
  `,
})

export const Basic = args => <Spinner {...args} />

export const WithCustomColor = () => <Spinner color='brand2' />

export const WithTypicalUsage = () => {
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const simulateLoading = async () => {
    setLoaded(false)
    setLoading(true)
    await delay(1500)
    setLoading(false)
    setLoaded(true)
  }

  return (
    <Box aria-busy={loading}>
      <Box marginY='md' role='status' aria-live='polite'>
        {loading && <Spinner aria-label='Loading content' />}
        {loaded && <Text>Loading complete</Text>}
      </Box>
      <Button onClick={simulateLoading}>Simulate Loading</Button>
    </Box>
  )
}
