import React from 'react'
import {Flex, Text, Box, Link} from '@chakra-ui/react'
import {ExternalLinkIcon} from '@chakra-ui/icons'

/* eslint-disable jsx-a11y/accessible-emoji */
const Welcome = () => (
  <Flex
    justify="center"
    direction="column"
    align="center"
    p={4}
    m={6}
    fontSize="xs"
  >
    <Text mb={4} fontSize="2xl">
      <Box role="img" as="span" aria-labelledby="tada">
        🎉🎉🎉
      </Box>
    </Text>

    <Text mb={4} fontSize="2xl">
      Follow the link to download the CLI and push your devnotes.
    </Text>

    <Link
      fontSize="2xl"
      href="https://edudepetris.github.io/devnotes.github.io/"
      isExternal
    >
      Devnotes website <ExternalLinkIcon mx="2px" />
    </Link>
  </Flex>
)
/* eslint-disable jsx-a11y/accessible-emoji */

export default Welcome
