import React from 'react'
import {
  Link,
  IconButton,
  Box,
  Heading,
  Flex,
  Text,
  Button,
  MenuItem,
  MenuGroup,
  MenuButton,
  Menu,
  MenuDivider,
  MenuList,
} from '@chakra-ui/core'
import ThemeToggler from '../ThemeToggler'

const MenuItems = ({children}) => (
  <Text mt={{base: 4, md: 0}} mr={6} display="block">
    {children}
  </Text>
)

const NavBar = (props) => {
  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="transparent"
      color="currentColor"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          Devnotes
        </Heading>
      </Flex>

      <Box display={{sm: 'block', md: 'none'}} onClick={handleToggle}>
        <IconButton aria-label="Menu toggler" icon="menu" />
      </Box>

      <Box
        display={{base: show ? 'block' : 'none', md: 'flex'}}
        width={{base: 'full', md: 'auto'}}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>Docs</MenuItems>
        <MenuItems>Examples</MenuItems>
        <MenuItems>Blog</MenuItems>
        <ThemeToggler />
      </Box>

      <Box
        display={{base: show ? 'block' : 'none', md: 'block'}}
        mt={{base: 4, md: 0}}
      >
        <Menu>
          <MenuButton as={Button}>Profile</MenuButton>
          <MenuList>
            <MenuGroup title="Profile">
              <MenuItem>My Account</MenuItem>
              <MenuItem>Payments </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Help">
              <MenuItem>Docs</MenuItem>
              <MenuItem>FAQ</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem>
              <Link href="/users/sign_out" data-method="delete">
                Sign out
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  )
}

export default NavBar
