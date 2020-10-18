// Create a theme object to include custom color, typography, and layout values
import React from 'react' // eslint-disable-line no-unused-vars
import {theme} from '@chakra-ui/core'

const navBarIcons = {
  menu: {
    path: (
      <path
        fill="currentColor"
        d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
      />
    ),
    viewBox: '0 0 20 20',
  },
}

const devnotesTheme = {
  ...theme,
  icons: {
    ...theme.icons,
    ...navBarIcons,
  },
}

export default devnotesTheme
