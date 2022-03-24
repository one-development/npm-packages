import { useRef, useState } from 'react'

/**
 * Tracks HTML validation state
 * @param {Object} options options to configure behavior
 * @param {string} options.mode can be onChange or onSubmit. set to onChange to validate immediately onChange.
 * @return {Object} an object including state, fns to create handlers, and register
 */
export default function useValidation({ mode = 'onChange' } = {}) {
  const ref = useRef(null)
  const [hasError, setHasError] = useState(false)
  const [hasValidated, setHasValidated] = useState(false)

  const createChangeHandler = callback => e => {
    if (mode === 'onChange' || hasValidated) {
      const willHaveError = !ref.current.reportValidity()

      if (hasError !== willHaveError) {
        setHasError(willHaveError)
      }
    }

    if (callback) {
      callback(e)
    }
  }

  const createInvalidHandler = callback => e => {
    setHasValidated(true)
    setHasError(true)

    if (callback) {
      callback(e)
    }
  }

  return {
    createChangeHandler,
    createInvalidHandler,
    isInvalid: hasError,
    register: ref,
  }
}
