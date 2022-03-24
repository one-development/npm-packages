import partition from '../partition'

describe('partition', () => {
  it('should return an array with two empty objects when collection is an empty object', () => {
    expect(partition({}, () => true)).toEqual([{}, {}])
  })

  it('should return an array with two empty arrays when collection is an empty array', () => {
    expect(partition([], () => true)).toEqual([[], []])
  })

  it('should correctly separate an array with even and odd numbers', () => {
    const isEven = x => x % 2 === 0
    const [evens, odds] = partition([1, 4, 5, 2], isEven)
    expect(evens).toEqual([4, 2])
    expect(odds).toEqual([1, 5])
  })

  it('should correctly separate HTML props', () => {
    const isHtmlProp = (value, prop) => ['htmlFor', 'id', 'name'].includes(prop)
    const [props, rest] = partition({ foo: 'bar', id: '123' }, isHtmlProp)
    expect(props).toEqual({ id: '123' })
    expect(rest).toEqual({ foo: 'bar' })
  })
})
