import React from 'react'
import PropTypes from 'prop-types'
import {
  Link,
  IconButton,
  Box,
  Heading,
  Flex,
  Button,
  MenuItem,
  MenuGroup,
  MenuButton,
  Menu,
  MenuDivider,
  MenuList,
  useMediaQuery,
} from '@chakra-ui/react'
import {HamburgerIcon} from '@chakra-ui/icons'
import ThemeToggler from '../ThemeToggler'

/* eslint-disable no-unused-vars */
const NavBar = ({authenticityToken}) => {
  const [show, setShow] = React.useState(false)
  const [isMobile] = useMediaQuery('(max-width: 767px)')
  const handleToggle = () => setShow(!show)

  const signOut = () => {
    document.getElementById('sign-out').click()
  }

  const myAccount = () => {
    document.getElementById('my-account').click()
  }

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

      {isMobile && (
        <Flex>
          <ThemeToggler />
          <Box onClick={handleToggle}>
            <IconButton aria-label="Menu toggler" icon={<HamburgerIcon />} />
          </Box>
        </Flex>
      )}

      <Box
        display={{base: show ? 'flex' : 'none', md: 'flex'}}
        mt={{base: 4, md: 0}}
      >
        {!isMobile && <ThemeToggler />}
        <Menu>
          <MenuButton as={Button}>Profile</MenuButton>
          <MenuList>
            <MenuGroup title="Profile">
              <MenuItem onClick={myAccount}>
                <Link href="/users/edit" id="my-account">
                  My Account
                </Link>
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem onClick={signOut}>
              <Link href="/users/sign_out" data-method="delete" id="sign-out">
                Sign out
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  )
}
/* eslint-enable no-unused-vars */

NavBar.propTypes = {
  authenticityToken: PropTypes.string.isRequired,
}

export default NavBar
