// https://chakra-ui.com/docs/theming/customize-theme
import React from 'react' // eslint-disable-line no-unused-vars
import {extendTheme} from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

const devnotesTheme = extendTheme({config})

export default devnotesTheme
