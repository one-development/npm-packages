import _ from 'lodash'

export default function createSizes() {
  const sizes = {
    appbarHeight: '64px',
    badgeHeight: '34px',
    componentHeight: '48px',
    containerWidth: '1280px',
    inputHeight: '44px',
    use(type) {
      if (!_.has(sizes, type)) {
        throw new Error(`"${type}" is not a valid size`)
      }

      return _.get(sizes, type)
    },
  }

  return sizes
}
