import { create } from '@storybook/theming/create'
import lightTheme from '../src/themes/light'

export default create({
  appBg: lightTheme.colors.background,
  appBorderColor: lightTheme.colors.onSurface.divider,
  appBorderRadius: lightTheme.radii.sm,
  appContentBg: lightTheme.colors.surface,
  // Toolbar colors
  barBg: lightTheme.colors.surface,
  barSelectedColor: lightTheme.colors.brand,
  barTextColor: lightTheme.colors.onSurface.secondary,
  // Theme type
  base: 'light',
  // Branding
  // brandImage: '',
  brandTitle: 'One UI',
  // brandUrl: '',
  // Storybook-specific colors
  colorPrimary: lightTheme.colors.brandDark,
  colorSecondary: lightTheme.colors.brand,
  // Input colors
  inputBg: lightTheme.colors.surface,
  inputBorder: lightTheme.colors.onSurface.divider,
  inputBorderRadius: lightTheme.radii.sm,
  inputTextColor: lightTheme.colors.onSurface.primary,
  // Text colors
  textColor: lightTheme.colors.onSurface.primary,
  textInverseColor: '#fff',
})
