import applyMask from '../applyMask'

describe('applyMask', () => {
  it('should throw an error when receiving an invalid mask format', () => {
    expect(() => applyMask('AA AA')).toThrow()
    expect(() => applyMask('AAAA')).toThrow()
    expect(() => applyMask('abcd')).toThrow()
  })

  it('should not throw an error when receiving a valid mask format', () => {
    expect(() => applyMask('### ##')).not.toThrow()
    expect(() => applyMask('####')).not.toThrow()
    expect(() => applyMask('###-###')).not.toThrow()
    expect(() => applyMask('$##.##')).not.toThrow()
    expect(() => applyMask('#')).not.toThrow()
  })

  it('should restrict the max number of characters', () => {
    expect(applyMask('###', '1234')).toBe('123')
  })

  it('should add placeholders', () => {
    expect(applyMask('### ### ####', '123')).toBe('123 ___ ____')
    expect(applyMask('## ##', '12')).toBe('12 __')
    expect(applyMask('###-###-####', '256-694')).toBe('256-694-____')
  })

  it('should add space between groups', () => {
    expect(applyMask('## ##', '1234')).toBe('12 34')
  })

  it('should add other characters between groups', () => {
    expect(applyMask('##-##', '1234')).toBe('12-34')
    expect(applyMask('###,###', '123456')).toBe('123,456')
  })

  it('should allow a mask character to be first', () => {
    expect(applyMask('$##.##', '1200')).toBe('$12.00')
  })

  it('should work with phone numbers', () => {
    const mask = '(###) ###-####'
    expect(applyMask(mask, '')).toBe('(___) ___-____')
    expect(applyMask(mask, '5')).toBe('(5__) ___-____')
    expect(applyMask(mask, '555')).toBe('(555) ___-____')
    expect(applyMask(mask, '5555')).toBe('(555) 5__-____')
    expect(applyMask(mask, '55555')).toBe('(555) 55_-____')
    expect(applyMask(mask, '5555555555')).toBe('(555) 555-5555')
  })

  it('should not allow a mask character to be last', () => {
    expect(() => applyMask('##.00', '12')).toThrow()
  })

  it('should not duplicate space between groups', () => {
    expect(applyMask('## ##', '12 34')).toBe('12 34')
  })

  it('should accept mask characters', () => {
    expect(applyMask('###-###-####', '555-555-5555')).toBe('555-555-5555')
    expect(applyMask('(###) ###-####', '555 555-5555')).toBe('(555) 555-5555')
  })

  it('should ignore invalid characters', () => {
    expect(applyMask('###-###', '(245)245')).toBe('245-245')
  })
})
