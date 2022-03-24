/* eslint-disable no-console, import/no-mutable-exports, fp/no-let */
import { useEffect } from 'react'

let useInvariant = () => {}

if (process.env.NODE_ENV === 'development') {
  useInvariant = (condition, message) => {
    useEffect(() => {
      if (!condition) {
        console.error(message)
      }
    }, [condition, message])
  }
}

export default useInvariant
