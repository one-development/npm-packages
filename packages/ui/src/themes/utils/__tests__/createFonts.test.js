import createFonts, {
  neueHaasDisplayFont,
  neueHaasTextFont,
} from '../createFonts'

describe('createFonts', () => {
  it('should not throw when receiving empty optins', () => {
    expect(() => createFonts()).not.toThrow()
  })

  it('should define the correct default properties', () => {
    const fonts = createFonts()

    expect(typeof fonts.display).toBe('object')
    expect(typeof fonts.text).toBe('object')
    expect(fonts.display).toBe(neueHaasDisplayFont)
    expect(fonts.text).toBe(neueHaasTextFont)
  })
})
