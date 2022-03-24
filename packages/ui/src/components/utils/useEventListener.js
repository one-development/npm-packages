import { useRef, useEffect } from 'react'

/**
 * A React hook used to register an event listener on any EventTarget
 *
 * @param {string} eventName  A valid event type. See list [here](https://developer.mozilla.org/en-US/docs/Web/Events).
 * @param {Function} handler  The event listener function to register
 * @param {EventTarget} [target=window] An element supporting the addEventListener method.
 * @param {Object} options Options supported by addEventListener method
 * @param {boolean} options.capture Capture option supported by addEventListener method
 * @param {boolean} options.once Once option supported by addEventListener method
 * @param {boolean} options.passive Passive option supported by addEventListener method
 */
export default function useEventListener(
  eventName,
  handler,
  target = window,
  options = {}
) {
  const { capture, passive, once } = options
  const callback = useRef()
  /**
   * Update callback.current value if the handler changes.
   * This allows our effect to receive the latest handler without
   * including it in the deps array, which could cause it to
   * re-run on every render.
   */
  useEffect(() => {
    callback.current = handler
  }, [handler])

  useEffect(() => {
    // Make sure the target supports the addEventListener method
    const isSupported = target && target.addEventListener

    if (isSupported) {
      // Create an event listener that calls callback function stored in ref
      const eventListener = event => callback.current(event)
      const eventListenerOpts = { capture, once, passive }

      // Add event listener
      target.addEventListener(eventName, eventListener, eventListenerOpts)

      // Remove event listener on cleanup
      return () => {
        target.removeEventListener(eventName, eventListener, eventListenerOpts)
      }
    }

    return () => {}
    // Re-run our effect if any of the dependencies change
  }, [eventName, target, capture, once, passive])
}
