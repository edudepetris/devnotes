import React from 'react'
import PropTypes from 'prop-types'

import {Flex} from '@chakra-ui/react'
import ThemeProvider from '../../components/ThemeProvider'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'

const DefaultLayout = ({children, authenticityToken}) => (
  <>
    <ThemeProvider>
      <NavBar authenticityToken={authenticityToken} />

      {children}

      <Flex justify="center">
        <Footer />
      </Flex>
    </ThemeProvider>
  </>
)

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  authenticityToken: PropTypes.string.isRequired,
}

export default DefaultLayout
