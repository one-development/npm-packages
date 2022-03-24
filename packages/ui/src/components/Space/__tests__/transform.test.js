import { transform } from '../Space'
import createSpace from '../../../themes/utils/createSpace'

describe('transform', () => {
  const grid = 8
  const space = createSpace({ grid })

  it('should get the value from the space scale if the key is not a multiplication', () => {
    expect(transform('md', space)).toBe('16px')
  })

  it(`should return the key if it does not return a value from the space scale
  and if it is not a multiplication`, () => {
    expect(transform(24, space)).toBe(24)
  })

  it('should return the key multiplied by the grid in pixels if the key is a multiplication', () => {
    expect(transform('*21', space)).toBe(`${grid * 21}px`)
  })
})
