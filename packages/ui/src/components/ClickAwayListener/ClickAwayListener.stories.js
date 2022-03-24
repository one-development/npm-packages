import React, { useState } from 'react'
import Box from '../Box'
import Button from '../Button'
import Space from '../Space'
import Stack from '../Stack'
import Text from '../Text'
import { createComponentStory } from '../../../utils'
import ClickAwayListener from './ClickAwayListener'

export default createComponentStory(ClickAwayListener, {
  caption: 'Detect if a click event happened outside of an element.',
  description: `
    Use ClickAwayListener to detect clicks that occur outside of the child element
    and somewhere else in the parent document. ClickAwayListener also supports iframes.

    ###### Notes
    * The child element must accept refs via \`React.forwardRef\` or as a native element.
  `,
  title: 'Utils/ClickAwayListener',
})

export const Basic = () => {
  const [isMenuOpen, toggleMenu] = useState(true)
  const handleMenuButtonClick = () => {
    toggleMenu(true)
  }
  const handleClickAway = () => {
    toggleMenu(false)
  }

  return (
    <Box position='relative' height={isMenuOpen ? '250px' : 'auto'}>
      <Button onClick={handleMenuButtonClick}>Open Menu</Button>
      {isMenuOpen && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box
            backgroundColor='surface'
            borderRadius='sm'
            paddingY='lg'
            paddingX='md'
            boxShadow='xl'
            position='absolute'
            left='0'
            top='0'
            width='320px'
          >
            <Stack dividers>
              <Text>Item 1</Text>
              <Text>Item 2</Text>
              <Text>Item 3</Text>
            </Stack>
            <Space height='xl' />
            <Text variant='caption' color='onSurface.hint'>
              Note: Click outside this menu to close
            </Text>
          </Box>
        </ClickAwayListener>
      )}
    </Box>
  )
}
