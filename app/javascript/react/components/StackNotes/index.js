import React from 'react'
import PropTypes from 'prop-types'
import {Stack, Heading, Text, PseudoBox, useColorMode} from '@chakra-ui/core'

const Feature = ({title, desc, selected}) => {
  const {colorMode} = useColorMode()
  const bgColorHover = {light: 'gray.100', dark: 'gray.700'}
  const bgColorActive = {light: 'gray.200', dark: 'gray.800'}
  const bgColorSelected = {light: 'teal.50', dark: 'rgba(48, 140, 122, 0.3)'}
  const colorSelected = {light: 'teal.800', dark: 'teal.200'}

  return (
    <PseudoBox
      aria-selected={selected}
      role="tab"
      rounded="md"
      p={5}
      m={1}
      cursor="pointer"
      boxShadow="md"
      borderWidth="1px"
      _hover={{bg: bgColorHover[colorMode]}}
      _active={{
        bg: bgColorActive[colorMode],
        transform: 'scale(0.99)',
      }}
      _selected={{
        color: colorSelected[colorMode],
        bg: bgColorSelected[colorMode],
      }}
    >
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4} color="gray.500" isTruncated>
        {desc}
      </Text>
    </PseudoBox>
  )
}

Feature.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  selected: PropTypes.bool,
}

Feature.defaultProps = {
  selected: false,
}

const StackNotes = ({notes, selectedNoteId}) => {
  return (
    <Stack spacing={8}>
      {notes.map((note) => (
        <Feature
          title={note.title}
          desc={note.desc}
          key={note.id}
          selected={selectedNoteId === note.id}
        />
      ))}
    </Stack>
  )
}

StackNotes.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  selectedNoteId: PropTypes.number,
}
StackNotes.defaultProps = {
  selectedNoteId: -1,
}

export default StackNotes
