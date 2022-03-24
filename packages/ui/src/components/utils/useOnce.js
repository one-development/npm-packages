import { useEffect, useRef } from 'react'

export default function useOnce(cb) {
  const cachedCb = useRef(cb)
  // technically this could be accomplished with an empty deps array,
  // but it is more canonical to use a ref to prevent the cb from changing.
  useEffect(cachedCb.current, [cachedCb])
}
