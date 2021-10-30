// index.js
import React from 'react'
import PropTypes from 'prop-types'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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
  useClipboard,
  Tr,
  Td,
  Th,
} from '@chakra-ui/react'

/* eslint-disable react/no-children-prop */
const Meta = ({projectName, createdAt, updatedAt}) => {
  return (
    <List styleType="disc">
      <ListItem>
        <Code colorScheme="teal" children="Project name" /> {projectName}
      </ListItem>
      <ListItem>
        <Code colorScheme="teal" children="Created at" /> {createdAt}
      </ListItem>
      <ListItem>
        <Code colorScheme="teal" children="Updated at" /> {updatedAt}
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

/* eslint-disable react/display-name, react/prop-types, react/jsx-props-no-spreading, react/destructuring-assignment, react/no-children-prop */
const Note = ({note}) => {
  const {isOpen: showRaw, onToggle} = useDisclosure()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const btnRef = React.useRef()
  const {colorMode} = useColorMode()
  const syntaxHighlighterTheme = {light: github, dark: dracula}
  const renderers = {
    ...ChakraUIRenderer(),
    // https://github.com/mustaphaturhan/chakra-ui-markdown-renderer/issues/15
    // TODO remove this when the issue is fixed.
    tr: (props) => <Tr>{props.children}</Tr>,
    td: (props) => <Td>{props.children}</Td>,
    th: (props) => <Th>{props.children}</Th>,
    code({node, inline, className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          children={String(children).replace(/\n$/, '')}
          style={syntaxHighlighterTheme[colorMode]}
          language={match[1]}
          PreTag="div"
          {...props}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
  }
  const {hasCopied, onCopy} = useClipboard(note?.content)

  if (!note) {
    return null
  }

  return (
    <Box>
      <ButtonGroup spacing={2}>
        <Button size="xs" onClick={onToggle}>
          Raw
        </Button>
        <Button size="xs" ref={btnRef} onClick={onCopy}>
          {hasCopied ? 'Copied' : 'Copy'}
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
          remarkPlugins={[remarkGfm, {singleTilde: false}]}
          components={renderers}
          children={note.content}
        />
      )}
    </Box>
  )
}
/* eslint-enable react/display-name, react/prop-types, react/jsx-props-no-spreading, react/destructuring-assignment, react/no-children-prop */

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
