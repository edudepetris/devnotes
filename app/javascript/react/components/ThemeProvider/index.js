/* eslint-disable react/prop-types */
import React from 'react'
import {
  ThemeProvider as ChakraThemeProvider,
  CSSReset,
  ColorModeProvider,
} from '@chakra-ui/core'
import devnotesTheme from '../../theme'

// https://chakra-ui.com/getting-started
// https://chakra-ui.com/color-mode
// Our own ThemeProvider.
const ThemeProvider = ({children}) => (
  <ChakraThemeProvider theme={devnotesTheme}>
    <ColorModeProvider>
      <CSSReset />
      {children}
    </ColorModeProvider>
  </ChakraThemeProvider>
)

export default ThemeProvider
/* eslint-enable react/prop-types */
