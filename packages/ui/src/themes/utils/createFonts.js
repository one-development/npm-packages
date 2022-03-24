/**
 * If you are unfamiliar with terms like capHeight or ascender, please read:
 * https://material.io/design/typography/understanding-typography.html
 *
 * Font metrics should be determined using FontForge
 * https://fontforge.org/en-US/downloads/mac-dl/
 *
 * NOTE: FontForge measures ascender from the baseline instead of the
 * cap height, so you need to subtract cap height from ascent to get the value
 */
const createFont = ({ family, metrics }) => {
  const { capitalHeight, emSize, hHeadAscent, hHeadDescent } = metrics
  const ascenderScale = (hHeadAscent - capitalHeight) / emSize
  const capHeightScale = capitalHeight / emSize
  const descenderScale = hHeadDescent / emSize

  return {
    family,
    metrics: {
      ascenderScale,
      capHeightScale,
      descenderScale,
    },
  }
}

export const neueHaasDisplayFont = createFont({
  family: 'neue-haas-grotesk-display, Helvetica, "Open Sans", sans-serif',
  metrics: {
    capitalHeight: 715,
    emSize: 1000,
    hHeadAscent: 916,
    hHeadDescent: 228,
  },
})

export const neueHaasTextFont = createFont({
  family: 'neue-haas-grotesk-text, Helvetica, "Open Sans", sans-serif',
  metrics: {
    capitalHeight: 727,
    emSize: 1000,
    hHeadAscent: 916,
    hHeadDescent: 228,
  },
})

export const robotoFont = createFont({
  family:
    'Roboto, "Helvetica Neue", HelveticaNeue, Helvetica, Arial, sans-serif',
  metrics: {
    capitalHeight: 1456,
    emSize: 2048,
    hHeadAscent: 1900,
    hHeadDescent: 500,
  },
})

export default function createFonts() {
  const fonts = {
    display: neueHaasDisplayFont,
    text: neueHaasTextFont,
  }

  fonts.metrics = type => {
    if (!fonts[type]) throw new Error(`${type} is not a valid font type`)
    return fonts[type].metrics
  }

  fonts.family = type => {
    if (!fonts[type]) throw new Error(`${type} is not a valid font type`)
    return fonts[type].family
  }

  return fonts
}
