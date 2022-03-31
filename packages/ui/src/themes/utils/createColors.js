/* eslint-disable max-lines */
import Color from 'color'
import _ from 'lodash'
import common from '../../colors/common'
import green from '../../colors/green'
import blue from '../../colors/blue'
import indigo from '../../colors/indigo'
import teal from '../../colors/teal'
import orange from '../../colors/orange'
import red from '../../colors/red'
import createSwatch from '../../colors/utils/createSwatch'

export const baseLightTheme = {
  background: '#f3f4fc',
  surface: common.white,
  // eslint-disable-next-line sort-keys
  brand: {
    dark: indigo[900],
    light: indigo[50],
    main: indigo[500],
    onLight: indigo[900],
  },
  brand2: {
    dark: teal[400],
    light: teal[50],
    main: teal[200],
    onLight: teal[900],
  },
  error: {
    dark: red[900],
    light: red[50],
    main: red[500],
    onLight: red[900],
  },
  highlight: indigo[500],
  info: {
    dark: blue[900],
    light: blue[50],
    main: blue[600],
    onLight: blue[900],
  },
  success: {
    dark: green[800],
    light: green[50],
    main: green[600],
    // onDark: common.white,
    onLight: green[900],
    // onMain: common.white,
  },
  warning: {
    dark: orange[800],
    light: orange[50],
    main: orange[300],
    onLight: orange[800],
  },
}

export const baseDarkTheme = {
  background: '#121212',
  surface: '#1b1b1b',
  // eslint-disable-next-line sort-keys
  brand: {
    dark: indigo[100],
    light: indigo[900],
    main: indigo[200],
    onLight: indigo[50],
  },
  brand2: {
    dark: teal[100],
    light: teal[900],
    main: teal[200],
    onLight: teal[50],
  },
  error: {
    dark: red[100],
    light: red[900],
    main: red[200],
    onLight: red[50],
  },
  highlight: indigo[200],
  info: {
    dark: blue[100],
    light: blue[900],
    main: blue[200],
    onLight: blue[50],
  },
  success: {
    dark: green[100],
    light: green[900],
    main: green[200],
    onLight: green[50],
  },
  warning: {
    dark: orange[100],
    light: orange[900],
    main: orange[200],
    onLight: orange[50],
  },
}

const baseThemes = {
  dark: baseDarkTheme,
  light: baseLightTheme,
}

function createPalette(color, contrastThreshold) {
  if (!_.isObject(color)) {
    throw new Error(`Expected "color" to be an object but received: ${color}`)
  }

  const { main } = color
  const swatch = !color.dark || !color.light ? createSwatch(main) : null
  const dark = color.dark || getDarkVariant(swatch)
  const light = color.light || getLightVariant(swatch)
  // The "onDark", "onLight", and "onMain" options take precedence over the "on" option
  const onDarkStrokeColor = color.onDark || color.on || null
  const onLightStrokeColor = color.onLight || color.on || null
  const onMainStrokeColor = color.onMain || color.on || null

  return {
    dark,
    light,
    main,
    onDark: calculateOnVariants(dark, contrastThreshold, onDarkStrokeColor),
    onLight: calculateOnVariants(light, contrastThreshold, onLightStrokeColor),
    onMain: calculateOnVariants(main, contrastThreshold, onMainStrokeColor),
  }
}

function getLightVariant(swatch) {
  const lighten = color =>
    Color(color)
      .lighten(0.1)
      .hex()
      .toString()
  if (swatch.closest === 50) return lighten(swatch[50])
  return swatch[50]
}

function getDarkVariant(swatch) {
  const darken = (color, x) =>
    Color(color)
      .darken(x)
      .hex()
      .toString()
  if (swatch.closest === 900) return darken(swatch[900], 0.35)
  return swatch[900]
}

function calculateOnVariants(background, contrastThreshold, stroke) {
  const determineStrokeColor = backgroundColor => {
    if (stroke) return Color(stroke)
    const onDark = Color(common.white)
    const onLight = Color(common.black)
    const onDarkContrastRatio = backgroundColor.contrast(onDark)
    const onLightContrastRatio = backgroundColor.contrast(onLight)

    if (onDarkContrastRatio >= contrastThreshold) return onDark

    return onDarkContrastRatio >= onLightContrastRatio ? onDark : onLight
  }
  const isBlackish = color => color.luminosity() < 0.03
  const isWhiteish = color => color.luminosity() > 0.9

  try {
    const backgroundColor = Color(background)
    const strokeColor = determineStrokeColor(backgroundColor)
    const { r, g, b } = strokeColor.object()
    const alpha = a => `rgba(${r}, ${g}, ${b}, ${a})`
    const variantsPrototype = {
      toString() {
        return this.primary
      },
    }

    // eslint-disable-next-line fp/no-mutating-assign
    const lowOpacityVariants = Object.assign(Object.create(variantsPrototype), {
      disabled: alpha(0.38),
      divider: alpha(0.12),
      hint: alpha(0.38),
      primary: alpha(0.87),
      secondary: alpha(0.6),
    })

    // eslint-disable-next-line fp/no-mutating-assign
    const highOpacityVariants = Object.assign(
      Object.create(variantsPrototype),
      {
        disabled: alpha(0.5),
        divider: alpha(0.2),
        hint: alpha(0.5),
        primary: alpha(1),
        secondary: alpha(0.7),
      }
    )

    if (isBlackish(strokeColor) && isWhiteish(backgroundColor))
      return lowOpacityVariants
    if (isWhiteish(strokeColor) && isBlackish(backgroundColor))
      return lowOpacityVariants
    return highOpacityVariants
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(`Encountered an error determining "on" variants: ${e.message}`)
    return null
  }
}

function calculateStateOpacities(background, stroke) {
  try {
    const backgroundColor = Color(background)
    const strokeColor = Color(stroke)

    const lowOpacityVariants = {
      activated: 0.12,
      disabled: 0.2,
      dragged: 0.08,
      focused: 0.12,
      hovered: 0.05,
      pressed: 0.2,
      selected: 0.08,
    }

    const highOpacityVariants = {
      activated: 0.24,
      disabled: 0.4,
      dragged: 0.16,
      focused: 0.24,
      hovered: 0.1,
      pressed: 0.32,
      selected: 0.16,
    }

    if (backgroundColor.isDark()) return highOpacityVariants

    const highContrastThreshold = 6.5
    const contrastRatio = backgroundColor.contrast(strokeColor)
    const isHighContrast = contrastRatio >= highContrastThreshold
    return isHighContrast ? lowOpacityVariants : highOpacityVariants
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(
      `Encountered an error determining state opacities: ${e.message}`
    )
    return null
  }
}

function calculateStateVariants(background, stroke) {
  try {
    const strokeColor = Color(stroke)
    const { r, g, b } = strokeColor.object()
    const alpha = a => `rgba(${r}, ${g}, ${b}, ${a})`
    const opacities = calculateStateOpacities(background, stroke)
    return _.mapValues(opacities, alpha)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(
      `Encountered an error determining state variants: ${e.message}`
    )
    return null
  }
}

function formatColorInput(input, defaultColor) {
  const toHex = color =>
    Color(color)
      .hex()
      .toString()
  const format = obj =>
    Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [key]: toHex(obj[key]),
      }),
      {}
    )

  const fallback = format(
    _.isObject(defaultColor) ? defaultColor : { main: defaultColor }
  )

  if (!input) return fallback
  if (_.isString(input)) return format({ main: input })
  if (_.isObject(input)) {
    const fields = _.pickBy(input, Boolean)

    if (fields.main) return format(fields)

    return fallback
  }
  return fallback
}

export default function createColors({
  type = 'light',
  background: backgroundInput,
  brand: brandInput,
  brand2: brand2Input,
  contrastThreshold = 4.5,
  error: errorInput,
  highlight: highlightInput,
  info: infoInput,
  success: successInput,
  surface: surfaceInput,
  warning: warningInput,
  ...extraColorInputs
} = {}) {
  // Determine the base theme from type
  const baseTheme = _.get(baseThemes, type)
  const colors = {
    add(name, input) {
      if (_.has(colors, name)) {
        throw new Error(`A color with name "${name}" already exists`)
      }

      // Check for a built-in fallback (i.e. brand, brand2, or error)
      const fallback = _.get(baseTheme, name) || baseTheme.brand
      const color = formatColorInput(input, fallback)
      const palette = createPalette(color, contrastThreshold)

      // eslint-disable-next-line fp/no-mutating-assign
      Object.assign(colors, {
        [_.camelCase(name)]: palette.main,
        [_.camelCase(`${name}-dark`)]: palette.dark,
        [_.camelCase(`${name}-light`)]: palette.light,
        [_.camelCase(`on-${name}`)]: palette.onMain,
        [_.camelCase(`on-${name}-dark`)]: palette.onDark,
        [_.camelCase(`on-${name}-light`)]: palette.onLight,
      })
    },
    create(input) {
      const color = formatColorInput(input)
      return createPalette(color, contrastThreshold)
    },
    on(nameOrValue, variant = 'primary') {
      if (!_.has(colors, ['onBackground', variant])) {
        throw new Error(`"${variant}" is not a valid on color variant`)
      }

      try {
        const isName = _.has(colors, nameOrValue)
        const onColorVariants = isName
          ? _.get(colors, _.camelCase(`on-${nameOrValue}`))
          : calculateOnVariants(nameOrValue, contrastThreshold)

        return _.get(onColorVariants, variant)
      } catch (e) {
        throw new Error(`"${nameOrValue}" is not a valid color input`)
      }
    },
    state(variant, { on = 'surface', stroke = 'onSurface' } = {}) {
      const strokeColor = _.has(colors, stroke) ? `${colors[stroke]}` : stroke
      const backgroundColor = _.has(colors, on) ? `${colors[on]}` : on
      const stateVariants = calculateStateVariants(backgroundColor, strokeColor)
      const result = _.get(stateVariants, variant)

      if (!result) throw new Error(`"${variant}" is not a valid state variant`)

      return result
    },
    stateOpacity(variant, { on = 'surface', stroke = 'onSurface' } = {}) {
      const strokeColor = _.has(colors, stroke) ? `${colors[stroke]}` : stroke
      const backgroundColor = _.has(colors, on) ? `${colors[on]}` : on
      const stateOpacities = calculateStateOpacities(
        backgroundColor,
        strokeColor
      )
      const result = _.get(stateOpacities, variant)

      if (!result) throw new Error(`"${variant}" is not a valid state variant`)

      return result
    },
    use(name, variant = 'primary') {
      if (!_.has(colors, name)) {
        throw new Error(`"${name}" is not a valid palette`)
      }

      const palette = _.get(colors, name)
      const color = _.isObject(palette) ? _.get(palette, variant) : palette

      if (!color)
        throw new Error(`"${variant}" is not a valid variant for ${name}`)

      return color
    },
  }

  // Collect built-in color inputs
  const builtIns = [
    ['background', backgroundInput],
    ['surface', surfaceInput],
    ['brand', brandInput],
    ['brand2', brand2Input],
    ['highlight', highlightInput],
    ['error', errorInput],
    ['warning', warningInput],
    ['success', successInput],
    ['info', infoInput],
  ]

  // Collect extra color inputs
  const extras = Object.keys(extraColorInputs).map(key => [
    key,
    extraColorInputs[key],
  ])

  // Add all colors
  const allPairs = [...builtIns, ...extras]
  allPairs.forEach(([name, input]) => {
    colors.add(name, input)
  })

  // Remove unused variants for background and surface colors
  /* eslint-disable fp/no-delete */
  delete colors.backgroundDark
  delete colors.backgroundLight
  delete colors.highlightDark
  delete colors.highlightLight
  delete colors.onHighlightLight
  delete colors.onHighlightDark
  delete colors.surfaceDark
  delete colors.surfaceLight
  delete colors.onBackgroundLight
  delete colors.onBackgroundDark
  delete colors.onSurfaceLight
  delete colors.onSurfaceDark
  /* eslint-enable fp/no-delete */

  colors.contrastThreshold = contrastThreshold
  colors.stateOpacities = calculateStateOpacities(
    colors.surface,
    colors.onSurface.primary
  )

  return colors
}
