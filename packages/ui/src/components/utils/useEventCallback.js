import React from 'react'
import useEnhancedEffect from './useEnhancedEffect'

/**
 * In some rare cases you might need to memoize a callback with useCallback,
 * but the memoization doesn’t work very well because the inner function has
 * to be re-created too often. If the function you’re memoizing is an event handler
 * and isn’t used during rendering, you can use ref as an instance variable,
 * and save the last committed value into it manually. This function addresses
 * the issue, which is documented in more detail here:
 * https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
 * and here:
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 */
export default function useEventCallback(fn = () => {}) {
  const ref = React.useRef(fn)
  useEnhancedEffect(() => {
    ref.current = fn
  })
  return React.useCallback((...args) => (0, ref.current)(...args), [])
}
