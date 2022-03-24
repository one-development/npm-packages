import { useEffect } from 'react'
import usePrevious from './usePrevious'

/**
 * Watches a value and invokes a callback whenever it changes
 *
 * @param   {*}  value     any value that can be compared via referential or strict equality
 * @param   {Function}  callback  a callback to invoke when value changes
 */
export default function useWatcher(value, callback) {
  const previousValue = usePrevious(value)

  useEffect(() => {
    if (callback && previousValue !== value) {
      callback(value)
    }
  }, [callback, previousValue, value])
}
