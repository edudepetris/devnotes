import React from 'react'
import {useColorMode, Box, IconButton} from '@chakra-ui/core'

export default function ThemeToggler() {
  const {colorMode, toggleColorMode} = useColorMode()
  return (
    <Box textAlign="right">
      <IconButton
        icon={colorMode === 'light' ? 'moon' : 'sun'}
        onClick={toggleColorMode}
        variant="ghost"
        data-testid={colorMode}
      />
    </Box>
  )
}
