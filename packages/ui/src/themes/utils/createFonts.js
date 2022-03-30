import interMetrics from '@capsizecss/metrics/inter'
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

export const interFont = createFont({
  family: '"Inter", sans-serif',
  metrics: {
    capitalHeight: interMetrics.capHeight,
    emSize: interMetrics.unitsPerEm,
    hHeadAscent: interMetrics.ascent,
    hHeadDescent: -1 * interMetrics.descent,
  },
})

export default function createFonts() {
  const fonts = {
    display: interFont,
    text: interFont,
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
