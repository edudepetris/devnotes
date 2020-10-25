// index.js
import React from 'react'
import PropTypes from 'prop-types'

import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {github, dracula} from 'react-syntax-highlighter/dist/cjs/styles/hljs'

import {
  useColorMode,
  Box,
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Code,
  List,
  ListItem,
} from '@chakra-ui/core'
import devnotesTheme from '../../theme'

/* eslint-disable react/no-children-prop */
const Meta = ({projectName, createdAt, updatedAt}) => {
  return (
    <List styleType="disc">
      <ListItem>
        <Code variantColor="teal" children="Project name" /> {projectName}
      </ListItem>
      <ListItem>
        <Code variantColor="teal" children="Created at" /> {createdAt}
      </ListItem>
      <ListItem>
        <Code variantColor="teal" children="Updated at" /> {updatedAt}
      </ListItem>
    </List>
  )
}
/* eslint-enable react/no-children-prop */

Meta.propTypes = {
  projectName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
}

/* eslint-disable react/display-name, react/prop-types */
const Note = ({note}) => {
  const {isOpen: showRaw, onToggle} = useDisclosure()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const btnRef = React.useRef()
  const {colorMode} = useColorMode()
  const syntaxHighlighterTheme = {light: github, dark: dracula}
  const renderers = {
    ...ChakraUIRenderer(devnotesTheme),
    code: ({language, value}) => (
      <SyntaxHighlighter
        style={syntaxHighlighterTheme[colorMode]}
        language={language}
      >
        {value}
      </SyntaxHighlighter>
    ),
  }

  if (!note) {
    return null
  }

  return (
    <Box>
      <ButtonGroup spacing={2}>
        <Button size="xs" onClick={onToggle}>
          Raw
        </Button>
        <Button size="xs" ref={btnRef} onClick={onOpen}>
          Meta
        </Button>
      </ButtonGroup>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader />

          <DrawerBody>
            <Meta
              projectName={note.project_name}
              createdAt={note.created_at}
              updatedAt={note.updated_at}
            />
          </DrawerBody>

          <DrawerFooter />
        </DrawerContent>
      </Drawer>

      {showRaw ? (
        <Box as="pre">{note.content}</Box>
      ) : (
        <ReactMarkdown
          plugins={[[gfm, {singleTilde: false}]]}
          renderers={renderers}
        >
          {note.content}
        </ReactMarkdown>
      )}
    </Box>
  )
}
/* eslint-enable react/display-name, react/prop-types */

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
