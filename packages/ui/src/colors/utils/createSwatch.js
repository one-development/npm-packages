/*
 * This code is based on implementations from the following sources:
 * https://github.com/bustle/coloring-palette
 * https://github.com/lyft/coloralgorithm
 */
import bezier from 'bezier-easing'
import Color from 'color'
import _ from 'lodash'

// prettier-ignore
const {
  abs,
  ceil,
  round,
  sqrt,
  cos,
  log10,
} = Math

const muiHueCurve = bezier(0.34, 0.1, 0.68, 1)
const muiSatCurve = bezier(0.48, 0.78, 0.31, 0.99)
const muiValCurve = bezier(0.4, 0.55, 0.66, 1)

const atMost100 = num => _.min([num, 100])

const generateValStart = v => {
  // given a value between 0 and 100 it returns a value from 50 - 100
  return round(
    100 - (100 - v / 100 - sqrt(v) + v * cos(2.65)) / (2 * log10(v + 1) + 1.25)
  )
}

const calcShortestDistance = (a, b) => {
  const difference = abs(a - b) % 360
  return difference > 180 ? 360 - difference : difference
}

export const calcHueDistance = (start, end) => {
  const hue = value => {
    const rounded = round(value)
    return rounded === 0 ? 360 : rounded
  }
  const startHue = hue(start)
  const endHue = hue(end)
  const hueDistance = calcShortestDistance(startHue, endHue)

  if ((startHue + hueDistance) % 360 === endHue) {
    return [startHue, startHue + hueDistance]
  }

  if ((startHue - hueDistance) % 360 === endHue) {
    return [startHue, startHue - hueDistance]
  }

  if ((endHue + hueDistance) % 360 === startHue) {
    return [endHue + hueDistance, endHue]
  }

  return [endHue - hueDistance, endHue]
}

function distribute(value, rangeA, rangeB) {
  const [fromLow, fromHigh] = rangeA
  const [toLow, toHigh] = rangeB

  const result =
    toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow)

  if (toLow < toHigh) {
    if (result < toLow) {
      return toLow
    }
    if (result > toHigh) {
      return toHigh
    }
  } else {
    if (result > toLow) {
      return toLow
    }
    if (result < toHigh) {
      return toHigh
    }
  }

  return result
}

function generatePointsOnCurve(curve, steps) {
  return _.range(steps).map(step => curve(step / (steps - 1)))
}

export function generatePalette({
  hueStart,
  hueEnd,
  hueCurve = muiHueCurve,
  satStart,
  satEnd,
  satCurve = muiSatCurve,
  satRate = 100,
  valStart,
  valEnd,
  valCurve = muiValCurve,
}) {
  const steps = 10
  const hueArray = generatePointsOnCurve(hueCurve, steps)
  const satArray = generatePointsOnCurve(satCurve, steps)
  const valArray = generatePointsOnCurve(valCurve, steps).reverse()

  const shades = _.range(steps).map(index => {
    const hueStep = distribute(
      hueArray[index],
      [0, 1],
      calcHueDistance(hueStart, hueEnd)
    )
    const satStep =
      distribute(satArray[index], [0, 1], [satStart, satEnd]) * (satRate * 0.01)
    const valStep = distribute(valArray[index], [0, 1], [valEnd, valStart])

    const color = Color({
      h: (ceil(hueStep) + 360) % 360,
      s: atMost100(ceil(satStep)),
      v: atMost100(ceil(valStep)),
    })

    return color.hex().toString()
  })

  return {
    50: shades[0],
    100: shades[1],
    200: shades[2],
    300: shades[3],
    400: shades[4],
    500: shades[5],
    600: shades[6],
    700: shades[7],
    800: shades[8],
    900: shades[9],
  }
}

export default function createSwatch(color) {
  const mainColor = Color(color)
  const { h, ...sv } = mainColor.hsv().object()
  const s = sv.s / 100
  const v = sv.v / 100

  const hueStart = h
  const satStart = round(s * 10)
  const valStart = generateValStart(v * 100)
  const hueEnd = (h + 354) % 360
  const satEnd = round(atMost100(s * 108))
  const valEnd = round(v * 66)

  const palette = generatePalette({
    hueEnd,
    hueStart,
    satEnd,
    satStart,
    valEnd,
    valStart,
  })

  const closestShade = Object.keys(palette).reduce((result, key) => {
    const distance = shade => Color(shade).contrast(mainColor)
    return distance(palette[key]) < distance(palette[result])
      ? _.toNumber(key)
      : result
  }, 900)

  palette[closestShade] = mainColor.hex().toString()
  palette.closest = closestShade

  return palette
}
