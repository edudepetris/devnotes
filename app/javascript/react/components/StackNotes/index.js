import React from 'react'
import PropTypes from 'prop-types'
import {Stack, Heading, Text, Box, useColorMode} from '@chakra-ui/react'

const Feature = ({title, desc, selected, handleClick}) => {
  const {colorMode} = useColorMode()
  const bgColorHover = {light: 'gray.100', dark: 'gray.700'}
  const bgColorActive = {light: 'gray.200', dark: 'gray.800'}
  const bgColorSelected = {light: 'teal.50', dark: 'rgba(48, 140, 122, 0.3)'}
  const colorSelected = {light: 'teal.800', dark: 'teal.200'}

  return (
    <Box
      onClick={handleClick}
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
      <Heading size="sm">{title}</Heading>
      <Text mt={4} color="gray.500" isTruncated>
        {desc}
      </Text>
    </Box>
  )
}

Feature.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
}

Feature.defaultProps = {
  selected: false,
}

const StackNotes = ({notes, handleSelectedNote}) => {
  const [selected, setSelected] = React.useState(null)

  const handleSelected = (index) => {
    setSelected(index)
    handleSelectedNote(notes[index])
  }

  // Add memo
  return (
    <Stack spacing={8}>
      {notes.map(({title, desc, id}, index) => (
        <Feature
          title={title}
          desc={desc}
          key={id}
          selected={selected === index}
          handleClick={() => {
            handleSelected(index)
          }}
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
  handleSelectedNote: PropTypes.func.isRequired,
}

export default StackNotes
