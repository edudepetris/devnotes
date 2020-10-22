import {hot} from 'react-hot-loader/root'
import React from 'react'
import PropTypes from 'prop-types'

import {Box, Grid} from '@chakra-ui/core'
import ThemeProvider from '../../components/ThemeProvider'
import NavBar from '../../components/NavBar'
import StackNotes from '../../components/StackNotes'

const Dashboard = ({authenticityToken, notes}) => {
  return (
    <ThemeProvider>
      <NavBar authenticityToken={authenticityToken} />

      <Grid templateColumns="1fr 3fr" gap={4} overflow="hidden">
        <Box w="100%" h="100vh" p="2" overflowY="scroll">
          <StackNotes notes={notes} selectedNoteId={3} />
        </Box>
        <Box w="100%" h="100vh" p="2" overflowY="scroll" />
      </Grid>
    </ThemeProvider>
  )
}

Dashboard.propTypes = {
  authenticityToken: PropTypes.string.isRequired,
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
}

export default hot(Dashboard)
