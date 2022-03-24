/* eslint-disable max-lines */
import createColors from '../createColors'

describe('createColors', () => {
  it('should throw an error when receiving an empty argument', () => {
    expect(() => createColors()).not.toThrow()
  })

  it('should define a use function that returns the correct color', () => {
    const colors = createColors({
      brand: {
        dark: '#000',
        light: '#fff',
        main: '#fafafa',
      },
    })
    expect(colors.use('brand')).toBe('#FAFAFA')
    expect(colors.use('brandDark')).toBe('#000000')
    expect(colors.use('brandLight')).toBe('#FFFFFF')
  })

  it('should define a use function that returns the correct color and variant', () => {
    const colors = createColors()
    expect(colors.use('onSurface', 'primary')).toBe('rgba(0, 0, 0, 0.87)')
  })

  it('should define a use function that throws when the variant is invalid', () => {
    const colors = createColors()
    expect(() => colors.use('onSurface', 'red')).toThrow()
  })

  it('should return a function that provides default values for all properties', () => {
    const colors = createColors()
    expect(typeof colors).toBe('object')
    expect(typeof colors.add).toBe('function')
    expect(typeof colors.on).toBe('function')
    expect(typeof colors.state).toBe('function')
    expect(typeof colors.use).toBe('function')

    // Surfaces
    expect(colors.background).toBeTruthy()
    expect(colors.surface).toBeTruthy()
    expect(colors.onBackground).toBeTruthy()
    expect(colors.onSurface).toBeTruthy()

    // Branding
    expect(colors.brand).toBeTruthy()
    expect(colors.brandDark).toBeTruthy()
    expect(colors.brandLight).toBeTruthy()
    expect(colors.onBrand).toBeTruthy()
    expect(colors.onBrandDark).toBeTruthy()
    expect(colors.onBrandLight).toBeTruthy()

    expect(colors.brand2).toBeTruthy()
    expect(colors.brand2Dark).toBeTruthy()
    expect(colors.brand2Light).toBeTruthy()
    expect(colors.onBrand2).toBeTruthy()
    expect(colors.onBrand2Dark).toBeTruthy()
    expect(colors.onBrand2Light).toBeTruthy()

    // Feedback
    expect(colors.highlight).toBeTruthy()
    expect(colors.onHighlight).toBeTruthy()

    expect(colors.success).toBeTruthy()
    expect(colors.successDark).toBeTruthy()
    expect(colors.successLight).toBeTruthy()
    expect(colors.onSuccess).toBeTruthy()
    expect(colors.onSuccessDark).toBeTruthy()
    expect(colors.onSuccessLight).toBeTruthy()

    expect(colors.error).toBeTruthy()
    expect(colors.errorDark).toBeTruthy()
    expect(colors.errorLight).toBeTruthy()
    expect(colors.onError).toBeTruthy()
    expect(colors.onErrorDark).toBeTruthy()
    expect(colors.onErrorLight).toBeTruthy()

    expect(colors.warning).toBeTruthy()
    expect(colors.warningDark).toBeTruthy()
    expect(colors.warningLight).toBeTruthy()
    expect(colors.onWarning).toBeTruthy()
    expect(colors.onWarningDark).toBeTruthy()
    expect(colors.onWarningLight).toBeTruthy()

    expect(colors.info).toBeTruthy()
    expect(colors.infoDark).toBeTruthy()
    expect(colors.infoLight).toBeTruthy()
    expect(colors.onInfo).toBeTruthy()
    expect(colors.onInfoDark).toBeTruthy()
    expect(colors.onInfoLight).toBeTruthy()
  })

  it('should return a function with the colors defined as properties', () => {
    const colorInput = {
      background: '#F3F4FC',
      brand: {
        dark: '#007A00',
        light: '#ECFBE7',
        main: '#009D00',
        on: '#FFFFFF',
      },
      brand2: {
        dark: '#08167A',
        light: '#E7EAFE',
        main: '#0E24C4',
      },
      error: {
        dark: '#940011',
        light: '#FFE5E5',
        main: '#F03D3D',
      },
      highlight: '#0E24C4',
      info: {
        dark: '#08167A',
        light: '#E7EAFE',
        main: '#0E24C4',
      },
      success: {
        dark: '#007A00',
        light: '#ECFBE7',
        main: '#009D00',
        on: '#FFFFFF',
      },
      surface: '#FFFFFF',
      warning: {
        dark: '#BD5200',
        light: '#FFF8E1',
        main: '#FFCA28',
      },
    }
    const colors = createColors(colorInput)

    // API
    expect(typeof colors).toBe('object')
    expect(typeof colors.add).toBe('function')
    expect(typeof colors.on).toBe('function')
    expect(typeof colors.state).toBe('function')
    expect(typeof colors.use).toBe('function')

    // Common colors
    expect(colors.background).toBeTruthy()
    expect(colors.background).toEqual(colorInput.background)
    expect(colors.surface).toBeTruthy()
    expect(colors.surface).toEqual(colorInput.surface)
    expect(colors.onBackground).toBeTruthy()
    expect(colors.onBackground.primary).toEqual('rgba(0, 0, 0, 0.87)')
    expect(colors.onBackground.secondary).toEqual('rgba(0, 0, 0, 0.6)')
    expect(colors.onBackground.hint).toEqual('rgba(0, 0, 0, 0.38)')
    expect(colors.onBackground.disabled).toEqual('rgba(0, 0, 0, 0.38)')
    expect(colors.onBackground.divider).toEqual('rgba(0, 0, 0, 0.12)')
    expect(colors.onSurface).toBeTruthy()
    expect(colors.onSurface.primary).toBe('rgba(0, 0, 0, 0.87)')
    expect(colors.onSurface.secondary).toEqual('rgba(0, 0, 0, 0.6)')
    expect(colors.onSurface.hint).toEqual('rgba(0, 0, 0, 0.38)')
    expect(colors.onSurface.disabled).toEqual('rgba(0, 0, 0, 0.38)')
    expect(colors.onSurface.divider).toEqual('rgba(0, 0, 0, 0.12)')

    // Brand colors
    expect(colors.brand).toBeTruthy()
    expect(colors.brand).toEqual(colorInput.brand.main)
    expect(colors.brandDark).toBeTruthy()
    expect(colors.brandDark).toEqual(colorInput.brand.dark)
    expect(colors.brandLight).toBeTruthy()
    expect(colors.brandLight).toEqual(colorInput.brand.light)
    expect(colors.onBrand).toBeTruthy()
    expect(colors.onBrand.primary).toBe('rgba(255, 255, 255, 1)')
    expect(colors.onBrand.secondary).toEqual('rgba(255, 255, 255, 0.7)')
    expect(colors.onBrand.hint).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onBrand.disabled).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onBrand.divider).toEqual('rgba(255, 255, 255, 0.2)')
    expect(colors.onBrandDark).toBeTruthy()
    expect(colors.onBrandDark.primary).toBe('rgba(255, 255, 255, 1)')
    expect(colors.onBrandDark.secondary).toEqual('rgba(255, 255, 255, 0.7)')
    expect(colors.onBrandDark.hint).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onBrandDark.disabled).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onBrandDark.divider).toEqual('rgba(255, 255, 255, 0.2)')
    expect(colors.onBrandLight).toBeTruthy()
    expect(colors.onBrandLight.primary).toBe('rgba(255, 255, 255, 1)')
    expect(colors.onBrandLight.secondary).toEqual('rgba(255, 255, 255, 0.7)')
    expect(colors.onBrandLight.hint).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onBrandLight.disabled).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onBrandLight.divider).toEqual('rgba(255, 255, 255, 0.2)')

    // Brand2 colors
    expect(colors.brand2).toBeTruthy()
    expect(colors.brand2).toBe(colorInput.brand2.main)
    expect(colors.brand2Dark).toBeTruthy()
    expect(colors.brand2Dark).toBe(colorInput.brand2.dark)
    expect(colors.brand2Light).toBeTruthy()
    expect(colors.brand2Light).toBe('#E7EAFE')
    expect(colors.onBrand2).toBeTruthy()
    expect(colors.onBrand2.primary).toBe('rgba(255, 255, 255, 1)')
    expect(colors.onBrand2.secondary).toEqual('rgba(255, 255, 255, 0.7)')
    expect(colors.onBrand2.hint).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onBrand2.disabled).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onBrand2.divider).toEqual('rgba(255, 255, 255, 0.2)')
    expect(colors.onBrand2Dark).toBeTruthy()
    expect(colors.onBrand2Dark.primary).toBe('rgba(255, 255, 255, 0.87)')
    expect(colors.onBrand2Dark.secondary).toEqual('rgba(255, 255, 255, 0.6)')
    expect(colors.onBrand2Dark.hint).toEqual('rgba(255, 255, 255, 0.38)')
    expect(colors.onBrand2Dark.disabled).toEqual('rgba(255, 255, 255, 0.38)')
    expect(colors.onBrand2Dark.divider).toEqual('rgba(255, 255, 255, 0.12)')
    expect(colors.onBrand2Light).toBeTruthy()
    expect(colors.onBrand2Light.primary).toBe('rgba(0, 0, 0, 1)')
    expect(colors.onBrand2Light.secondary).toEqual('rgba(0, 0, 0, 0.7)')
    expect(colors.onBrand2Light.hint).toEqual('rgba(0, 0, 0, 0.5)')
    expect(colors.onBrand2Light.disabled).toEqual('rgba(0, 0, 0, 0.5)')
    expect(colors.onBrand2Light.divider).toEqual('rgba(0, 0, 0, 0.2)')

    // Highlight colors
    expect(colors.highlight).toBeTruthy()
    expect(colors.highlight).toBe(colorInput.highlight)
    expect(colors.onHighlight).toBeTruthy()
    expect(colors.onHighlight.primary).toBe('rgba(255, 255, 255, 1)')
    expect(colors.onHighlight.secondary).toEqual('rgba(255, 255, 255, 0.7)')
    expect(colors.onHighlight.hint).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onHighlight.disabled).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onHighlight.divider).toEqual('rgba(255, 255, 255, 0.2)')

    // Success colors
    expect(colors.success).toBeTruthy()
    expect(colors.success).toEqual(colorInput.success.main)
    expect(colors.successDark).toBeTruthy()
    expect(colors.successDark).toEqual(colorInput.success.dark)
    expect(colors.successLight).toBeTruthy()
    expect(colors.successLight).toEqual(colorInput.success.light)
    expect(colors.onSuccess).toBeTruthy()
    expect(colors.onSuccess.primary).toBe('rgba(255, 255, 255, 1)')
    expect(colors.onSuccess.secondary).toEqual('rgba(255, 255, 255, 0.7)')
    expect(colors.onSuccess.hint).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onSuccess.disabled).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onSuccess.divider).toEqual('rgba(255, 255, 255, 0.2)')
    expect(colors.onSuccessDark).toBeTruthy()
    expect(colors.onSuccessDark.primary).toBe('rgba(255, 255, 255, 1)')
    expect(colors.onSuccessDark.secondary).toEqual('rgba(255, 255, 255, 0.7)')
    expect(colors.onSuccessDark.hint).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onSuccessDark.disabled).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onSuccessDark.divider).toEqual('rgba(255, 255, 255, 0.2)')
    expect(colors.onSuccessLight).toBeTruthy()
    expect(colors.onSuccessLight.primary).toBe('rgba(255, 255, 255, 1)')
    expect(colors.onSuccessLight.secondary).toEqual('rgba(255, 255, 255, 0.7)')
    expect(colors.onSuccessLight.hint).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onSuccessLight.disabled).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onSuccessLight.divider).toEqual('rgba(255, 255, 255, 0.2)')

    // Error colors
    expect(colors.error).toBeTruthy()
    expect(colors.error).toBe(colorInput.error.main)
    expect(colors.errorDark).toBeTruthy()
    expect(colors.errorDark).toBe(colorInput.error.dark)
    expect(colors.errorLight).toBeTruthy()
    expect(colors.errorLight).toBe(colorInput.error.light)
    expect(colors.onError).toBeTruthy()
    expect(colors.onError.primary).toBe('rgba(0, 0, 0, 1)')
    expect(colors.onError.secondary).toEqual('rgba(0, 0, 0, 0.7)')
    expect(colors.onError.hint).toEqual('rgba(0, 0, 0, 0.5)')
    expect(colors.onError.disabled).toEqual('rgba(0, 0, 0, 0.5)')
    expect(colors.onError.divider).toEqual('rgba(0, 0, 0, 0.2)')
    expect(colors.onErrorDark).toBeTruthy()
    expect(colors.onErrorDark.primary).toBe('rgba(255, 255, 255, 1)')
    expect(colors.onErrorDark.secondary).toEqual('rgba(255, 255, 255, 0.7)')
    expect(colors.onErrorDark.hint).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onErrorDark.disabled).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onErrorDark.divider).toEqual('rgba(255, 255, 255, 0.2)')
    expect(colors.onErrorLight).toBeTruthy()
    expect(colors.onErrorLight.primary).toBe('rgba(0, 0, 0, 1)')
    expect(colors.onErrorLight.secondary).toEqual('rgba(0, 0, 0, 0.7)')
    expect(colors.onErrorLight.hint).toEqual('rgba(0, 0, 0, 0.5)')
    expect(colors.onErrorLight.disabled).toEqual('rgba(0, 0, 0, 0.5)')
    expect(colors.onErrorLight.divider).toEqual('rgba(0, 0, 0, 0.2)')

    // Warning colors
    expect(colors.warning).toBeTruthy()
    expect(colors.warning).toBe(colorInput.warning.main)
    expect(colors.warningDark).toBeTruthy()
    expect(colors.warningDark).toBe(colorInput.warning.dark)
    expect(colors.warningLight).toBeTruthy()
    expect(colors.warningLight).toBe(colorInput.warning.light)
    expect(colors.onWarning).toBeTruthy()
    expect(colors.onWarning.primary).toBe('rgba(0, 0, 0, 1)')
    expect(colors.onWarning.secondary).toEqual('rgba(0, 0, 0, 0.7)')
    expect(colors.onWarning.hint).toEqual('rgba(0, 0, 0, 0.5)')
    expect(colors.onWarning.disabled).toEqual('rgba(0, 0, 0, 0.5)')
    expect(colors.onWarning.divider).toEqual('rgba(0, 0, 0, 0.2)')
    expect(colors.onWarningDark).toBeTruthy()
    expect(colors.onWarningDark.primary).toBe('rgba(255, 255, 255, 1)')
    expect(colors.onWarningDark.secondary).toEqual('rgba(255, 255, 255, 0.7)')
    expect(colors.onWarningDark.hint).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onWarningDark.disabled).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onWarningDark.divider).toEqual('rgba(255, 255, 255, 0.2)')
    expect(colors.onWarningLight).toBeTruthy()
    expect(colors.onWarningLight.primary).toBe('rgba(0, 0, 0, 0.87)')
    expect(colors.onWarningLight.secondary).toEqual('rgba(0, 0, 0, 0.6)')
    expect(colors.onWarningLight.hint).toEqual('rgba(0, 0, 0, 0.38)')
    expect(colors.onWarningLight.disabled).toEqual('rgba(0, 0, 0, 0.38)')
    expect(colors.onWarningLight.divider).toEqual('rgba(0, 0, 0, 0.12)')

    // Info colors
    expect(colors.info).toBeTruthy()
    expect(colors.info).toBe(colorInput.info.main)
    expect(colors.infoDark).toBeTruthy()
    expect(colors.infoDark).toBe(colorInput.info.dark)
    expect(colors.infoLight).toBeTruthy()
    expect(colors.infoLight).toBe('#E7EAFE')
    expect(colors.onInfo).toBeTruthy()
    expect(colors.onInfo.primary).toBe('rgba(255, 255, 255, 1)')
    expect(colors.onInfo.secondary).toEqual('rgba(255, 255, 255, 0.7)')
    expect(colors.onInfo.hint).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onInfo.disabled).toEqual('rgba(255, 255, 255, 0.5)')
    expect(colors.onInfo.divider).toEqual('rgba(255, 255, 255, 0.2)')
    expect(colors.onInfoDark).toBeTruthy()
    expect(colors.onInfoDark.primary).toBe('rgba(255, 255, 255, 0.87)')
    expect(colors.onInfoDark.secondary).toEqual('rgba(255, 255, 255, 0.6)')
    expect(colors.onInfoDark.hint).toEqual('rgba(255, 255, 255, 0.38)')
    expect(colors.onInfoDark.disabled).toEqual('rgba(255, 255, 255, 0.38)')
    expect(colors.onInfoDark.divider).toEqual('rgba(255, 255, 255, 0.12)')
    expect(colors.onInfoLight).toBeTruthy()
    expect(colors.onInfoLight.primary).toBe('rgba(0, 0, 0, 1)')
    expect(colors.onInfoLight.secondary).toEqual('rgba(0, 0, 0, 0.7)')
    expect(colors.onInfoLight.hint).toEqual('rgba(0, 0, 0, 0.5)')
    expect(colors.onInfoLight.disabled).toEqual('rgba(0, 0, 0, 0.5)')
    expect(colors.onInfoLight.divider).toEqual('rgba(0, 0, 0, 0.2)')
  })

  it('should accept a string as a color input', () => {
    const colors = createColors({
      brand: '#7dcfd6',
    })

    expect(colors.brand).toBe('#7DCFD6')
    expect(colors.brandDark).toBe('#4D8C8B')
    expect(colors.brandLight).toBe('#EDF7F7')
    expect(`${colors.onBrand}`).toBe('rgba(0, 0, 0, 1)')
    expect(colors.onBrand.primary).toBe('rgba(0, 0, 0, 1)')
  })

  it('should calculate the correct "on" colors', () => {
    const colors = createColors({
      black: {
        dark: '#000',
        light: '#444242',
        main: '#2f2b2b',
      },
      blue: {
        dark: '#212d3f',
        light: '#037ba2',
        main: '#003b66',
      },
      green: {
        dark: '#006c00',
        light: '#66ce41',
        main: '#2b9c00',
      },
      pink: {
        dark: '#a0006b',
        light: '#ff7bca',
        main: '#d54799',
      },
      purple: {
        dark: '#0100b9',
        light: '#9d47ff',
        main: '#6100ed',
      },
      yellow: {
        dark: '#c7be00',
        light: '#ffff57',
        main: '#fff000',
      },
    })

    expect(colors.onBlack.primary).toBe('rgba(255, 255, 255, 0.87)')
    expect(colors.onBlackDark.primary).toBe('rgba(255, 255, 255, 0.87)')
    expect(colors.onBlackLight.primary).toBe('rgba(255, 255, 255, 1)')

    expect(colors.onBlue.primary).toBe('rgba(255, 255, 255, 1)')
    expect(colors.onBlueDark.primary).toBe('rgba(255, 255, 255, 0.87)')
    expect(colors.onBlueLight.primary).toBe('rgba(255, 255, 255, 1)')

    expect(colors.onPink.primary).toBe('rgba(0, 0, 0, 1)')
    expect(colors.onPinkDark.primary).toBe('rgba(255, 255, 255, 1)')
    expect(colors.onPinkLight.primary).toBe('rgba(0, 0, 0, 1)')

    expect(colors.onPurple.primary).toBe('rgba(255, 255, 255, 1)')
    expect(colors.onPurpleDark.primary).toBe('rgba(255, 255, 255, 1)')
    expect(colors.onPurpleLight.primary).toBe('rgba(0, 0, 0, 1)')

    expect(colors.onGreen.primary).toBe('rgba(0, 0, 0, 1)')
    expect(colors.onGreenDark.primary).toBe('rgba(255, 255, 255, 1)')
    expect(colors.onGreenLight.primary).toBe('rgba(0, 0, 0, 1)')

    expect(colors.onYellow.primary).toBe('rgba(0, 0, 0, 1)')
    expect(colors.onYellowDark.primary).toBe('rgba(0, 0, 0, 1)')
    expect(colors.onYellowLight.primary).toBe('rgba(0, 0, 0, 0.87)')
  })

  it('should calculate the correct state colors', () => {
    const colors = createColors({
      brand2: '#000',
      grey: {
        dark: '#000',
        light: '#fff',
        main: 'rgb(125, 125, 125)',
      },
      purple: '#6200ee',
      surface: '#fff',
      yellow: '#e7ee00',
    })

    // Default values
    expect(colors.state('activated')).toBe('rgba(0, 0, 0, 0.12)')
    expect(colors.state('disabled')).toBe('rgba(0, 0, 0, 0.2)')
    expect(colors.state('dragged')).toBe('rgba(0, 0, 0, 0.08)')
    expect(colors.state('focused')).toBe('rgba(0, 0, 0, 0.12)')
    expect(colors.state('hovered')).toBe('rgba(0, 0, 0, 0.05)')
    expect(colors.state('pressed')).toBe('rgba(0, 0, 0, 0.2)')
    expect(colors.state('selected')).toBe('rgba(0, 0, 0, 0.08)')

    // High contrast colors
    expect(colors.state('activated', { on: 'surface', stroke: 'purple' })).toBe(
      'rgba(98, 0, 238, 0.12)'
    )
    expect(colors.state('disabled', { on: 'surface', stroke: 'purple' })).toBe(
      'rgba(98, 0, 238, 0.2)'
    )
    expect(colors.state('dragged', { on: 'surface', stroke: 'purple' })).toBe(
      'rgba(98, 0, 238, 0.08)'
    )
    expect(colors.state('focused', { on: 'surface', stroke: 'purple' })).toBe(
      'rgba(98, 0, 238, 0.12)'
    )
    expect(colors.state('hovered', { on: 'surface', stroke: 'purple' })).toBe(
      'rgba(98, 0, 238, 0.05)'
    )
    expect(colors.state('pressed', { on: 'surface', stroke: 'purple' })).toBe(
      'rgba(98, 0, 238, 0.2)'
    )
    expect(colors.state('selected', { on: 'surface', stroke: 'purple' })).toBe(
      'rgba(98, 0, 238, 0.08)'
    )

    // Low contrast colors
    expect(colors.state('activated', { on: 'surface', stroke: 'yellow' })).toBe(
      'rgba(231, 238, 0, 0.24)'
    )
    expect(colors.state('disabled', { on: 'surface', stroke: 'yellow' })).toBe(
      'rgba(231, 238, 0, 0.4)'
    )
    expect(colors.state('dragged', { on: 'surface', stroke: 'yellow' })).toBe(
      'rgba(231, 238, 0, 0.16)'
    )
    expect(colors.state('focused', { on: 'surface', stroke: 'yellow' })).toBe(
      'rgba(231, 238, 0, 0.24)'
    )
    expect(colors.state('hovered', { on: 'surface', stroke: 'yellow' })).toBe(
      'rgba(231, 238, 0, 0.1)'
    )
    expect(colors.state('pressed', { on: 'surface', stroke: 'yellow' })).toBe(
      'rgba(231, 238, 0, 0.32)'
    )
    expect(colors.state('selected', { on: 'surface', stroke: 'yellow' })).toBe(
      'rgba(231, 238, 0, 0.16)'
    )
  })

  it('should accept an object for colors', () => {
    const colors = createColors({
      brand: {
        dark: '#39abb4',
        light: '#b1e2e6',
        main: '#7dcfd6',
      },
    })

    expect(colors.brand).toBe('#7DCFD6')
    expect(colors.brandDark).toBe('#39ABB4')
    expect(colors.brandLight).toBe('#B1E2E6')
    expect(`${colors.onBrand}`).toBe('rgba(0, 0, 0, 1)')
    expect(colors.onBrand.primary).toBe('rgba(0, 0, 0, 1)')
  })

  it('should allow color objects to override "on" shade', () => {
    const colors = createColors({
      brand: {
        dark: '#4a9ea5',
        light: '#b0ffff',
        main: '#7dcfd6',
        on: '#f8e71c',
      },
    })

    expect(`${colors.onBrand}`).toBe('rgba(248, 231, 28, 1)')
    expect(colors.onBrand.primary).toBe('rgba(248, 231, 28, 1)')
    expect(`${colors.onBrandDark}`).toBe('rgba(248, 231, 28, 1)')
    expect(colors.onBrandDark.primary).toBe('rgba(248, 231, 28, 1)')
    expect(`${colors.onBrandLight}`).toBe('rgba(248, 231, 28, 1)')
    expect(colors.onBrandLight.primary).toBe('rgba(248, 231, 28, 1)')
  })

  it('should allow color objects to override "onDark" shade', () => {
    const colors = createColors({
      brand: {
        dark: '#fff',
        light: '#fff',
        main: '#fff',
        onDark: '#fff',
      },
    })

    expect(`${colors.onBrand}`).toBe('rgba(0, 0, 0, 0.87)')
    expect(colors.onBrand.primary).toBe('rgba(0, 0, 0, 0.87)')
    expect(`${colors.onBrandDark}`).toBe('rgba(255, 255, 255, 1)')
    expect(colors.onBrandDark.primary).toBe('rgba(255, 255, 255, 1)')
    expect(`${colors.onBrandLight}`).toBe('rgba(0, 0, 0, 0.87)')
    expect(colors.onBrandLight.primary).toBe('rgba(0, 0, 0, 0.87)')
  })

  it('should allow color objects to override "onLight" shade', () => {
    const colors = createColors({
      brand: {
        dark: '#fff',
        light: '#fff',
        main: '#fff',
        onLight: '#fff',
      },
    })

    expect(`${colors.onBrand}`).toBe('rgba(0, 0, 0, 0.87)')
    expect(colors.onBrand.primary).toBe('rgba(0, 0, 0, 0.87)')
    expect(`${colors.onBrandLight}`).toBe('rgba(255, 255, 255, 1)')
    expect(colors.onBrandLight.primary).toBe('rgba(255, 255, 255, 1)')
    expect(`${colors.onBrandDark}`).toBe('rgba(0, 0, 0, 0.87)')
    expect(colors.onBrandDark.primary).toBe('rgba(0, 0, 0, 0.87)')
  })

  it('should allow color objects to override "onMain" shade', () => {
    const colors = createColors({
      brand: {
        dark: '#fff',
        light: '#fff',
        main: '#fff',
        onMain: '#fff',
      },
    })

    expect(`${colors.onBrand}`).toBe('rgba(255, 255, 255, 1)')
    expect(colors.onBrand.primary).toBe('rgba(255, 255, 255, 1)')
    expect(`${colors.onBrandDark}`).toBe('rgba(0, 0, 0, 0.87)')
    expect(colors.onBrandDark.primary).toBe('rgba(0, 0, 0, 0.87)')
    expect(`${colors.onBrandLight}`).toBe('rgba(0, 0, 0, 0.87)')
    expect(colors.onBrandLight.primary).toBe('rgba(0, 0, 0, 0.87)')
  })

  it('should allow additional colors', () => {
    const colors = createColors({
      foo: {
        dark: '#39abb4',
        light: '#b1e2e6',
        main: '#7dcfd6',
      },
    })

    expect(colors.foo).toBe('#7DCFD6')
    expect(colors.fooDark).toBe('#39ABB4')
    expect(colors.fooLight).toBe('#B1E2E6')
    expect(`${colors.onFoo}`).toBe('rgba(0, 0, 0, 1)')
    expect(colors.onFoo.primary).toBe('rgba(0, 0, 0, 1)')
  })

  it('should allow additional colors to be added later', () => {
    const colors = createColors()

    colors.add('foo', {
      dark: '#39abb4',
      light: '#b1e2e6',
      main: '#7dcfd6',
    })

    expect(colors.foo).toBe('#7DCFD6')
    expect(colors.fooDark).toBe('#39ABB4')
    expect(colors.fooLight).toBe('#B1E2E6')
    expect(`${colors.onFoo}`).toBe('rgba(0, 0, 0, 1)')
    expect(colors.onFoo.primary).toBe('rgba(0, 0, 0, 1)')
  })

  it('should throw an error when the same color is added twice', () => {
    const colors = createColors()
    const addColor = () => {
      colors.add('foo', {
        dark: '#39ABB4',
        light: '#B1E2E6',
        main: '#7DCFD6',
      })
    }

    expect(addColor).not.toThrow()
    expect(addColor).toThrow()
  })

  it('should allow shorthands', () => {
    const colors = createColors()

    colors.add('foo', {
      dark: '#39abb4',
      light: '#b1e2e6',
      main: '#7dcfd6',
    })

    expect(`${colors.foo}`).toBe('#7DCFD6')
    expect(`${colors.fooDark}`).toBe('#39ABB4')
    expect(`${colors.fooLight}`).toBe('#B1E2E6')
    expect(`${colors.onFoo}`).toBe('rgba(0, 0, 0, 1)')
  })
})
