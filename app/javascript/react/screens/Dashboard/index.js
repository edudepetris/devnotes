import {hot} from 'react-hot-loader/root'
import React from 'react'
import PropTypes from 'prop-types'

import ThemeProvider from '../../components/ThemeProvider'
import NavBar from '../../components/NavBar'

const Dashboard = ({authenticityToken}) => {
  return (
    <ThemeProvider>
      <NavBar authenticityToken={authenticityToken} />
    </ThemeProvider>
  )
}

Dashboard.propTypes = {
  authenticityToken: PropTypes.string.isRequired,
}

export default hot(Dashboard)
