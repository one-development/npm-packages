import _ from 'lodash'

export default function px(value) {
  if (value === null || typeof value === 'undefined') return ''
  return `${value}`.includes('px') ? value : `${value}px`
}

px.toNumber = value => {
  return _.toNumber(`${value}`.replace('px', ''))
}

px.toRem = value => `${px.toNumber(value) / 16}rem`
