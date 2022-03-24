import _ from 'lodash'
import applyMask from './applyMask'
import createPropType from './createPropType'
import isColor from './isColor'

const ExtraPropTypes = {}

if (process.env.NODE_ENV !== 'production') {
  ExtraPropTypes.color = createPropType('color', isColor)
  ExtraPropTypes.mask = createPropType('mask', mask => {
    try {
      applyMask(mask, '')
      return true
    } catch (e) {
      return false
    }
  })
  ExtraPropTypes.regex = createPropType('regex', _.isRegExp)
}

export default ExtraPropTypes
