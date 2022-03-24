import React from 'react'
import createIcon from './utils/createIcon'

const Warning = createIcon(
  <>
    <path d='M0 0h24v24H0z' fill='none' />
    <path d='M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z' />
  </>,
  'Warning'
)

export default Warning
