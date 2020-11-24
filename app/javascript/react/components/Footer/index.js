import React from 'react'
import {Flex, Text, Box} from '@chakra-ui/core'

/* eslint-disable jsx-a11y/accessible-emoji */
const Footer = () => (
  <Flex
    justify="center"
    direction="column"
    align="center"
    p={4}
    m={6}
    fontSize="xs"
  >
    <Text mb={4} color="gray.500">
      Made with{' '}
      <Box role="img" as="span" aria-labelledby="heart-green">
        💚
      </Box>{' '}
      from{' '}
      <Box role="img" as="span" aria-labelledby="flag-arg">
        🇦🇷
      </Box>
    </Text>
    <Text color="gray.500">Released under the MIT License.</Text>
    <Text color="gray.500">
      Copyright © {new Date().getFullYear()} Edu Depetris
    </Text>
  </Flex>
)
/* eslint-disable jsx-a11y/accessible-emoji */

export default Footer
