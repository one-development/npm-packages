import React, { forwardRef, memo } from 'react'
import Icon from '../../components/Icon'

/**
 * Private module reserved for Core-UI use.
 */
export default function createIcon(path, displayName) {
  const Component = memo(
    forwardRef((props, ref) => (
      <Icon ref={ref} {...props}>
        {path}
      </Icon>
    ))
  )

  Component.displayName = `${displayName}Icon`

  return Component
}
