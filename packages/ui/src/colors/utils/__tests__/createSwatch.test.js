import Color from 'color'
import _ from 'lodash'
import createSwatch, { calcHueDistance } from '../createSwatch'

const { abs, round } = Math

describe('createSwatch', () => {
  it('should create the correct palette for teal', () => {
    const teal = {
      50: '#e0f2f1',
      100: '#b2dfdb',
      200: '#80cbc4',
      300: '#4db6ac',
      400: '#26a69a',
      500: '#009688',
      600: '#00897b',
      700: '#00796b',
      800: '#00695c',
      900: '#004d40',
    }
    const swatch = createSwatch(teal[500], null)
    const shades = Object.keys(swatch).filter(key => key !== 'closest')

    shades.forEach(shade => {
      if (swatch.closest !== _.toNumber(shade)) {
        const swatchHsv = Color(swatch[shade])
          .hsv()
          .object()
        const materialHsv = Color(teal[shade])
          .hsv()
          .object()
        const diff = (a, b) => round(abs(a - b))

        expect(diff(swatchHsv.h, materialHsv.h)).toBeLessThanOrEqual(5)
        expect(diff(swatchHsv.s, materialHsv.s)).toBeLessThanOrEqual(15)
        expect(diff(swatchHsv.v, materialHsv.v)).toBeLessThanOrEqual(15)
      }
    })
  })

  it('should create the correct palette for pink', () => {
    const pink = {
      50: '#FCE4EC',
      100: '#F8BBD0',
      200: '#F48FB1',
      300: '#F06292',
      400: '#EC407A',
      500: '#E91E63',
      600: '#D81B60',
      700: '#C2185B',
      800: '#AD1457',
      900: '#880E4F',
    }
    const swatch = createSwatch(pink[500], null)
    const shades = Object.keys(swatch).filter(key => key !== 'closest')

    shades.forEach(shade => {
      if (swatch.closest !== _.toNumber(shade)) {
        const swatchHsv = Color(swatch[shade])
          .hsv()
          .object()
        const materialHsv = Color(pink[shade])
          .hsv()
          .object()
        const diff = (a, b) => round(abs(a - b))

        expect(diff(swatchHsv.h, materialHsv.h)).toBeLessThanOrEqual(10)
        expect(diff(swatchHsv.s, materialHsv.s)).toBeLessThanOrEqual(15)
        expect(diff(swatchHsv.v, materialHsv.v)).toBeLessThanOrEqual(15)
      }
    })
  })

  describe('calculateHueDistance', () => {
    it('should calculate hue distance for (45, 60)', () => {
      expect(calcHueDistance(45, 60)).toEqual([45, 60])
      expect(calcHueDistance(45, 60)).toEqual([45, 60])
      expect(calcHueDistance(60, 45)).toEqual([60, 45])
    })

    it('should calculate hue distance for (170, 190)', () => {
      expect(calcHueDistance(170, 190)).toEqual([170, 190])
      expect(calcHueDistance(190, 170)).toEqual([190, 170])
    })

    it('should calculate hue distance for (0, 10)', () => {
      expect(calcHueDistance(0, 10)).toEqual([360, 370])
      expect(calcHueDistance(10, 0)).toEqual([370, 360])
    })

    it('should calculate hue distance for (25, 250)', () => {
      expect(calcHueDistance(25, 250)).toEqual([385, 250])
      expect(calcHueDistance(250, 25)).toEqual([250, 385])
    })

    it('should calculate hue distance for (0, 355)', () => {
      expect(calcHueDistance(0, 355)).toEqual([360, 355])
      expect(calcHueDistance(355, 0)).toEqual([355, 360])
    })

    it('should calculate hue distance for (4.1, 355)', () => {
      expect(calcHueDistance(4.1, 355)).toEqual([364, 355])
      expect(calcHueDistance(355, 4.1)).toEqual([355, 364])
    })

    it('should calculate hue distance for (4, 0)', () => {
      expect(calcHueDistance(4, 0)).toEqual([364, 360])
      expect(calcHueDistance(0, 4)).toEqual([360, 364])
    })
  })
})
