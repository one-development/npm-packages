import React from 'react'
import createIcon from './utils/createIcon'

const ChevronUp = createIcon(
  <>
    <path d='M0 0h24v24H0z' fill='none' />
    <path d='M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z' />
  </>,
  'ChevronUp'
)

export default ChevronUp
