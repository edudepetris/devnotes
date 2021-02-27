import {hot} from 'react-hot-loader/root'
import React from 'react'
import PropTypes from 'prop-types'

import {Box, Grid, Skeleton, Flex} from '@chakra-ui/react'
import ThemeProvider from '../../components/ThemeProvider'
import NavBar from '../../components/NavBar'
import StackNotes from '../../components/StackNotes'
import Note from '../../components/Note'
import Footer from '../../components/Footer'

import {getNoteById} from '../../api'

const Dashboard = ({authenticityToken, notes}) => {
  const [selectedNote, setSelectedNote] = React.useState(null)

  const [loading, setLoading] = React.useState(true)
  const [note, setNote] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!selectedNote) {
      return
    }
    setLoading(true)

    getNoteById(selectedNote.id)
      .then((res) => res.json())
      .then((data) => {
        setNote(data)
        setError(null)
        setLoading(false)
      })
      .catch((e) => {
        console.warn(e.message)
        setError('Error fetching data. Try again.')
        setLoading(false)
      })
  }, [selectedNote])

  const handleSelectedNote = (selected) => {
    setSelectedNote(selected)
  }

  return (
    <ThemeProvider>
      <NavBar authenticityToken={authenticityToken} />

      <Grid templateColumns="1fr 3fr" gap={4} overflow="hidden">
        <Box w="100%" h="100vh" p="2" overflowY="scroll">
          <StackNotes notes={notes} handleSelectedNote={handleSelectedNote} />
        </Box>
        <Box w="90%" h="100vh" p="2" overflowY="scroll">
          {!loading && error && <>Error</>}

          <Flex justify="center">
            <Skeleton isLoaded={!loading}>
              <Note note={note} />
            </Skeleton>
          </Flex>

          <Flex justify="center">
            <Footer />
          </Flex>
        </Box>
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
