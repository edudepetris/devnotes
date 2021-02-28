/* eslint-disable react/prop-types */
import React from 'react'
import {ChakraProvider, ColorModeScript} from '@chakra-ui/react'

import devnotesTheme from '../../theme'

// https://chakra-ui.com/getting-started
// https://chakra-ui.com/color-mode
// Our own ThemeProvider.
const ThemeProvider = ({children}) => (
  <>
    <ColorModeScript initialColorMode={devnotesTheme.config.initialColorMode} />
    <ChakraProvider theme={devnotesTheme}>{children}</ChakraProvider>
  </>
)

export default ThemeProvider
/* eslint-enable react/prop-types */
