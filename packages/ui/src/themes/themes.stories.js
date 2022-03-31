/* eslint-disable max-lines */
import _ from 'lodash'
import Color from 'color'
import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  CardHeader,
  ClickAwayListener,
  Space,
  Stack,
  Text,
} from '../components'
import { createTheme, useTheme, ThemeProvider } from './index'
import darkTheme from './dark'
import lightTheme from './light'

const story = {
  args: {
    brand: '#003b66',
    brand2: '#6200ee',
    contrastThreshold: 4.5,
    name: 'Your Custom Theme',
    type: 'light',
  },
  argTypes: {
    background: { control: 'color' },
    brand: { control: 'color' },
    brand2: { control: 'color' },
    brand2Dark: { control: 'color' },
    brand2Light: { control: 'color' },
    brandDark: { control: 'color' },
    brandLight: { control: 'color' },
    contrastThreshold: {
      control: {
        max: 5,
        min: 0,
        step: 0.5,
        type: 'slider',
      },
    },
    error: { control: 'color' },
    errorDark: { control: 'color' },
    errorLight: { control: 'color' },
    name: {
      control: 'text',
    },
    onBackground: { control: 'color' },
    onBrand: { control: 'color' },
    onBrand2: { control: 'color' },
    onBrand2Dark: { control: 'color' },
    onBrand2Light: { control: 'color' },
    onBrandDark: { control: 'color' },
    onBrandLight: { control: 'color' },
    onError: { control: 'color' },
    onErrorDark: { control: 'color' },
    onErrorLight: { control: 'color' },
    onSurface: { control: 'color' },
    surface: { control: 'color' },
    type: {
      control: {
        options: ['light', 'dark'],
        type: 'radio',
      },
    },
  },
  title: 'Tools/Theme Builder',
}

export default story

const encode = s => {
  const out = []
  // eslint-disable-next-line fp/no-loops, fp/no-let
  for (let i = 0; i < s.length; i += 1) {
    out[i] = s.charCodeAt(i)
  }
  return new Uint8Array(out)
}

const saveAsJson = (name, obj) => {
  const str = JSON.stringify(obj)
  const data = encode(str)
  const blob = new Blob([data], {
    type: 'application/octet-stream',
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  const event = document.createEvent('MouseEvents')

  link.setAttribute('href', url)
  link.setAttribute('download', `${name}.json`)

  event.initMouseEvent(
    'click',
    true,
    true,
    window,
    1,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  )
  link.dispatchEvent(event)
}

const owlTheme = createTheme({
  colors: {
    background: '#ffde03',
    brand: '#ffde03',
    brand2: '#0336ff',
    brand3: '#ff0266',
  },
})

const basilTheme = createTheme({
  colors: {
    background: {
      main: '#fffbe6',
      on: '#356859',
    },
    brand: {
      dark: '#043d30',
      light: '#37966f',
      main: '#356859',
    },
    brand2: {
      light: '#fffbe6',
      main: '#fd5523',
    },
    surface: {
      main: '#f1f5df',
      on: '#4e7a6a',
    },
  },
})

/* eslint-disable react/prop-types */

function Drawer({ children, isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <ClickAwayListener onClickAway={onClose}>
      <Box
        backgroundColor='surface'
        bottom={0}
        boxShadow='xl'
        left={0}
        paddingY='md'
        position='fixed'
        top={0}
        width='360px'
        zIndex='drawer'
      >
        {children}
      </Box>
    </ClickAwayListener>
  )
}
/* eslint-enable react/prop-types */

const DrawerItem = styled.div(({ theme, activated }) => {
  const activatedBgColor = theme.colors.state('activated', { stroke: 'brand2' })
  const activatedBgContrast = Color(activatedBgColor).contrast(
    Color(theme.colors.brand2)
  )
  const activatedTextColor =
    activatedBgContrast > theme.colors.contrastThreshold
      ? theme.colors.brand2
      : `${theme.colors.onSurface}`

  return {
    '&:hover': {
      backgroundColor: theme.colors.state('hovered'),
    },
    alignItems: 'center',
    color: `${theme.colors.onSurface}`,
    cursor: 'pointer',
    display: 'flex',
    height: theme.sizes.inputHeight,
    padding: theme.space.custom(0, 2),
    ...(activated && {
      '&:hover': {
        backgroundColor: activatedBgColor,
      },
      backgroundColor: activatedBgColor,
      color: activatedTextColor,
    }),
  }
})

const Fab = styled.div(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: theme.colors.brand2,
  borderRadius: theme.radii.circular,
  bottom: theme.space.custom(3),
  boxShadow: theme.shadows[3],
  color: theme.colors.onBrand2.primary,
  cursor: 'pointer',
  display: 'flex',
  fontSize: '1.5rem',
  height: '50px',
  justifyContent: 'center',
  lineHeight: 0,
  position: 'fixed',
  right: theme.space.custom(3),
  width: '50px',
  // eslint-disable-next-line sort-keys
  svg: {
    fill: 'currentColor',
    height: '24px',
    width: '24px',
  },
}))

const FabIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    height='24'
    viewBox='0 0 24 24'
    width='24'
  >
    <path d='M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z' />
    <path d='M0 0h24v24H0z' fill='none' />
  </svg>
)

const AppbarIcon = styled.div(({ theme }) => ({
  cursor: 'pointer',
  height: '24px',
  marginRight: theme.space.lg,
  svg: { fill: 'currentColor' },
  width: '24px',
}))

/* eslint-disable react/prop-types */
function AppBar(props) {
  const { title, onTitleClick } = props
  const menuIcon = (
    <svg viewBox='0 0 24 24'>
      <path d='M0 0h24v24H0z' fill='none' />
      <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
    </svg>
  )
  return (
    <Box
      alignItems='center'
      backgroundColor='surface'
      borderBottom='thin'
      color='onSurface.primary'
      display='flex'
      height='appbarHeight'
      maxHeight='appbarHeight'
      paddingX='md'
      position='sticky'
      width='100%'
      zIndex='appbar'
      top={0}
    >
      <AppbarIcon onClick={onTitleClick}>{menuIcon}</AppbarIcon>
      <Text color='inherit' variant='h1'>
        {title}
      </Text>
    </Box>
  )
}

const Swatch = ({ bordered, main, light, dark, title }) => {
  const theme = useTheme()

  return (
    <Box paddingY='md'>
      {title && (
        <Box marginBottom='md'>
          <Text transform='capitalize' variant='label'>
            {title}
          </Text>
        </Box>
      )}
      <Box
        borderRadius='lg'
        border={bordered ? 'thin' : 'none'}
        display='grid'
        gridTemplateAreas={`
        "main main"
        "light dark"
      `}
        gridTemplateRows='auto auto'
        gridTemplateColumns='auto auto'
        overflow='hidden'
      >
        {main && (
          <Box
            alignItems='flex-start'
            backgroundColor={main}
            color={`${_.camelCase(`on-${main}`)}.primary`}
            display='flex'
            flexDirection='column'
            gridArea='main'
            height='75px'
            justifyContent='center'
            padding='md'
          >
            <Text color='inherit'>{main}</Text>
            <Space height='sm' />
            <Text color='inherit'>{theme.colors[main]}</Text>
          </Box>
        )}
        {light && (
          <Box
            alignItems='flex-start'
            backgroundColor={light}
            color={`${_.camelCase(`on-${light}`)}.primary`}
            display='flex'
            flexDirection='column'
            gridArea='light'
            height='75px'
            justifyContent='center'
            padding='md'
          >
            <Text color='inherit'>{light}</Text>
            <Space height='sm' />
            <Text color='inherit'>{theme.colors[light]}</Text>
          </Box>
        )}
        {dark && (
          <Box
            alignItems='flex-start'
            backgroundColor={dark}
            color={`${_.camelCase(`on-${dark}`)}.primary`}
            display='flex'
            flexDirection='column'
            gridArea='dark'
            height='75px'
            justifyContent='center'
            padding='md'
          >
            <Text color='inherit'>{dark}</Text>
            <Space height='sm' />
            <Text color='inherit'>{theme.colors[dark]}</Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}

function App({ themeName }) {
  const theme = useTheme()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const toggleDrawer = () => {
    setIsDrawerOpen(prev => !prev)
  }

  const cardSubtitle = `${
    theme.type === 'light' ? 'An elegant light' : 'A bold dark'
  } theme, built with One UI.`
  const cardBodyText =
    'Like what you see? Download your theme as a JSON file by clicking the circular button in the bottom right corner of your screen.'

  const handleDownload = () => {
    saveAsJson(_.kebabCase(themeName), theme)
  }
  const drawerItems = ['Home', 'Search', 'Settings', 'Log Out']
  const [activeItem, setActiveItem] = useState(0)
  const itemHandler = i => () => {
    setActiveItem(i)
    toggleDrawer()
  }

  return (
    <Box
      backgroundColor='background'
      bottom={0}
      flex='0 0 auto'
      left={0}
      position='absolute'
      right={0}
      top={0}
      overflow='auto'
    >
      {/* <StatusBar time='10:51 PM' /> */}
      <AppBar title={themeName} onTitleClick={toggleDrawer} />
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer}>
        {drawerItems.map((name, i) => (
          <DrawerItem
            activated={i === activeItem}
            key={name}
            onClick={itemHandler(i)}
          >
            <Text>{name}</Text>
          </DrawerItem>
        ))}
      </Drawer>
      <Box marginX='auto' maxWidth='512px' paddingY='lg' paddingX='md'>
        <Stack>
          <Card>
            <CardHeader title={themeName} subtitle={cardSubtitle} />
            <CardContent>
              <Text>{cardBodyText}</Text>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title='Theme Colors' />
            <CardContent>
              <Swatch
                bordered
                title='surfaces'
                light='surface'
                dark='background'
              />
              <Swatch
                title='branding'
                main='brand'
                dark='brandDark'
                light='brandLight'
              />
              <Swatch main='brand2' dark='brand2Dark' light='brand2Light' />
              <Swatch title='feedback' main='highlight' />
              <Swatch main='error' dark='errorDark' light='errorLight' />
              <Swatch main='warning' dark='warningDark' light='warningLight' />
              <Swatch main='success' dark='successDark' light='successLight' />
              <Swatch main='info' dark='infoDark' light='infoLight' />
            </CardContent>
          </Card>
          <Card>
            <CardHeader title='Other Elements' />
            <CardContent>
              <Box display='flex' alignItems='center'>
                <Button>Primary</Button>
                <Space width='md' />
                <Button variant='secondary'>Secondary</Button>
                <Space width='md' />
                <Button variant='tertiary'>Tertiary</Button>
              </Box>
            </CardContent>
          </Card>
        </Stack>
        <Fab
          aria-label='Download theme as a JSON file'
          as={ButtonBase}
          onClick={handleDownload}
        >
          <FabIcon />
        </Fab>
      </Box>
    </Box>
  )
}
/* eslint-enable react/prop-types */

export const Basic = args => {
  const { contrastThreshold, name, type, ...colors } = args

  const theme = createTheme({
    colors: {
      background: {
        main: colors.background,
        on: colors.onBackground,
      },
      brand: {
        dark: colors.brandDark,
        light: colors.brandLight,
        main: colors.brand,
        onDark: colors.onBrandDark,
        onLight: colors.onBrandLight,
        onMain: colors.onBrand,
      },
      brand2: {
        dark: colors.brand2Dark,
        light: colors.brand2Light,
        main: colors.brand2,
        onDark: colors.onBrand2Dark,
        onLight: colors.onBrand2Light,
        onMain: colors.onBrand2,
      },
      contrastThreshold,
      error: {
        dark: colors.errorDark,
        light: colors.errorLight,
        main: colors.error,
        onDark: colors.onErrorDark,
        onLight: colors.onErrorLight,
        onMain: colors.onError,
      },
      surface: {
        main: colors.surface,
        on: colors.onSurface,
      },
    },
    type,
  })

  return (
    <ThemeProvider theme={theme}>
      <App themeName={name} />
    </ThemeProvider>
  )
}

export const OneUILight = () => (
  <ThemeProvider theme={lightTheme}>
    <App themeName='One UI Light' />
  </ThemeProvider>
)

export const OneUIDark = () => (
  <ThemeProvider theme={darkTheme}>
    <App themeName='One UI Dark' />
  </ThemeProvider>
)

export const Basil = () => (
  <ThemeProvider theme={basilTheme}>
    <App themeName='Basil' />
  </ThemeProvider>
)

export const Owl = () => (
  <ThemeProvider theme={owlTheme}>
    <App themeName='Owl' />
  </ThemeProvider>
)
