// index.js
import React from 'react'
import PropTypes from 'prop-types'

import devnotesTheme from '../../theme'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {github, dracula} from 'react-syntax-highlighter/dist/cjs/styles/hljs'

import {useColorMode, Box, Skeleton} from '@chakra-ui/core'

const Note = ({note}) => {
  const {colorMode} = useColorMode()
  const syntaxHighlighterTheme = {light: github, dark: dracula}

  const renderers = {
    ...ChakraUIRenderer(devnotesTheme),
    code: ({language, value}) => (
      <SyntaxHighlighter
        style={syntaxHighlighterTheme[colorMode]}
        language={language}
        children={value}
      />
    ),
  }

  if (!note) {
    return null
  }

  return (
    <Box>
      <ReactMarkdown
        children={note.content}
        plugins={[[gfm, {singleTilde: false}]]}
        renderers={renderers}
      />
    </Box>
  )
}

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    project_name: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }),
}

Note.defaultProps = {
  note: {
    content: '',
  },
}

export default Note
