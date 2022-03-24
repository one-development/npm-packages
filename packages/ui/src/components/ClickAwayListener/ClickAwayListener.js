import PropTypes from 'prop-types'
import React, { forwardRef, useCallback, useEffect, useRef } from 'react'
import ownerDocument from '../utils/ownerDocument'
import useEventCallback from '../utils/useEventCallback'
import useForkRef from '../utils/useForkRef'

const mapEventPropToEvent = eventProp => eventProp.substring(2).toLowerCase()

const ClickAwayListener = forwardRef(function ClickAwayListener(props, ref) {
  const { children, mouseEvent, touchEvent, onClickAway } = props
  const movedRef = useRef(false)
  const nodeRef = useRef(null)
  const handleRef = useForkRef(nodeRef, ref)

  const handleTouchMove = useCallback(() => {
    movedRef.current = true
  }, [])

  const handleClickAway = useEventCallback(event => {
    // The handler doesn't take event.defaultPrevented into account:
    //
    // event.preventDefault() is meant to stop default behaviours like
    // clicking a checkbox to check it, hitting a button to submit a form,
    // and hitting left arrow to move the cursor in a text input etc.
    // Only special HTML elements have these default behaviors.

    // Do not act if user performed touchmove
    if (movedRef.current) {
      movedRef.current = false
      return
    }

    // The child might render null.
    if (!nodeRef.current) {
      return
    }

    // Multi window support
    const doc = ownerDocument(nodeRef.current)
    const didClickAway =
      doc.documentElement &&
      doc.documentElement.contains(event.target) &&
      !nodeRef.current.contains(event.target)

    if (didClickAway) {
      onClickAway(event)
    }
  })

  // Register event listeners to document
  useEffect(() => {
    const doc = ownerDocument(nodeRef.current)
    const listeners = [
      mouseEvent ? [mapEventPropToEvent(mouseEvent), handleClickAway] : null,
      touchEvent ? [mapEventPropToEvent(touchEvent), handleClickAway] : null,
      touchEvent ? ['touchmove', handleTouchMove] : null,
    ].filter(Boolean)

    if (listeners.length > 0) {
      listeners.forEach(([eventName, eventHandler]) => {
        doc.addEventListener(eventName, eventHandler)
      })

      return () => {
        listeners.forEach(([eventName, eventHandler]) => {
          doc.removeEventListener(eventName, eventHandler)
        })
      }
    }

    return undefined
  }, [handleClickAway, handleTouchMove, mouseEvent, touchEvent])

  return (
    <React.Fragment>
      {React.cloneElement(children, { ref: handleRef })}
    </React.Fragment>
  )
})

ClickAwayListener.displayName = 'ClickAwayListener'
ClickAwayListener.defaultProps = {
  mouseEvent: 'onClick',
  touchEvent: 'onTouchEnd',
}

ClickAwayListener.propTypes = {
  /**
   * The wrapped element. The element must accept ref.
   */
  children: PropTypes.element.isRequired,
  /**
   * The mouse event to listen to. You can disable the listener by providing `false`.
   */
  mouseEvent: PropTypes.oneOf(['onClick', 'onMouseDown', 'onMouseUp', false]),
  /**
   * Callback fired when a "click away" event is detected.
   */
  onClickAway: PropTypes.func.isRequired,
  /**
   * The touch event to listen to. You can disable the listener by providing `false`.
   */
  touchEvent: PropTypes.oneOf(['onTouchStart', 'onTouchEnd', false]),
}

export default ClickAwayListener
