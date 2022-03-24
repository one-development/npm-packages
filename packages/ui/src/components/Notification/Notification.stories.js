import React, { useState } from 'react'
import Box from '../Box'
import Button from '../Button'
import Link from '../Link'
import Stack from '../Stack'
import Text from '../Text'
import { createComponentStory } from '../../../utils'
import Notification from './Notification'

export default createComponentStory(Notification, {
  caption: 'Provides brief messages about app processes.',
  description: `
    Use a Notification to inform users of a process that an app has performed or will perform.
    Notifications shouldn’t interrupt the user experience, and they should never require user input to continue.

    ###### Accessibility
    * By default, Notification sets \`role='alert'\`, but this can be changed when necessary. 
    Learn more about the ARIA [alert role](https://www.w3.org/TR/wai-aria-practices/#alert).
  `,
})

export const Basic = args => (
  <Notification {...args}>
    <Text>{args.children}</Text>
  </Notification>
)

Basic.args = {
  children: 'This is a basic notification',
}

// eslint-disable-next-line no-unused-vars
export const WithVariants = args => (
  <Stack>
    <Notification variant='info'>
      <Text>Info notification</Text>
    </Notification>
    <Notification variant='success'>
      <Text>Success notification</Text>
    </Notification>
    <Notification variant='warning'>
      <Text>Warning notification</Text>
    </Notification>
    <Notification variant='error'>
      <Text>Error notification</Text>
    </Notification>
  </Stack>
)

export const WithManualDismiss = () => {
  const [isDismissed, setIsDismissed] = useState(false)

  const handleDismiss = () => {
    setIsDismissed(true)
  }

  const handleReset = () => {
    setIsDismissed(false)
  }

  if (isDismissed) {
    return (
      <Button variant='tertiary' color='neutral' onClick={handleReset}>
        Reset
      </Button>
    )
  }

  return (
    <Notification dismissable onDismiss={handleDismiss}>
      <Text>Click the close button to dismiss this notification</Text>
    </Notification>
  )
}

export const WithAutoDismiss = () => {
  const [isDismissed, setIsDismissed] = useState(false)

  const handleDismiss = () => {
    setIsDismissed(true)
  }

  const handleReset = () => {
    setIsDismissed(false)
  }

  if (isDismissed) {
    return (
      <Button variant='tertiary' color='neutral' onClick={handleReset}>
        Reset
      </Button>
    )
  }

  return (
    <Notification
      autoDismissDuration={3000}
      dismissable
      onDismiss={handleDismiss}
    >
      <Text>This notification will be dismissed automatically...</Text>
    </Notification>
  )
}

// eslint-disable-next-line no-unused-vars
export const WithTypicalUsage = args => (
  <Box maxWidth='500px'>
    <Notification variant='info'>
      <Stack>
        <Text>
          <b>Something happened.</b> This notification is informing you about
          something. If you want to fix it, click the link below.
        </Text>
        <Text>
          <Link href='/' color='inherit'>
            Learn more
          </Link>
        </Text>
      </Stack>
    </Notification>
  </Box>
)
