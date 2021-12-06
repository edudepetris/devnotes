import React from 'react'
import PropTypes from 'prop-types'

import {Box, Grid, Skeleton, Flex, useMediaQuery} from '@chakra-ui/react'
import DefaultLayout from '../../layouts/DefaultLayout'
import StackNotes from '../../components/StackNotes'
import Note from '../../components/Note'
import Welcome from '../../components/Welcome'
import {getNoteById} from '../../api'

const Dashboard = ({authenticityToken, notes}) => {
  const [selectedNote, setSelectedNote] = React.useState(null)

  const [loading, setLoading] = React.useState(false)
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

  const [isMobile] = useMediaQuery('(max-width: 767px)')

  return (
    <DefaultLayout authenticityToken={authenticityToken}>
      {notes.length > 0 && isMobile && (
        <Grid templateRows="145px auto" gap={0} overflow="hidden">
          <Box p="2" overflowY="scroll">
            <StackNotes
              notes={notes}
              handleSelectedNote={handleSelectedNote}
              direction="row"
            />
          </Box>
          <Box h="100vh" p="2" pt="0" overflowY="scroll">
            {!loading && error && <>Error</>}

            <Flex justify="flex-start">
              <Skeleton w="100%" h="100vh" isLoaded={!loading}>
                <Note note={note} />
              </Skeleton>
            </Flex>
          </Box>
        </Grid>
      )}

      {notes.length > 0 && !isMobile && (
        <Grid templateColumns="1fr 3fr" gap={4} overflow="hidden">
          <Box w="100%" h="100vh" p="2" overflowY="scroll">
            <StackNotes notes={notes} handleSelectedNote={handleSelectedNote} />
          </Box>
          <Box w="90%" h="100vh" p="4" overflowY="scroll">
            {!loading && error && <>Error</>}

            <Flex justify="flex-start">
              <Skeleton w="100%" h="100vh" isLoaded={!loading}>
                <Note note={note} />
              </Skeleton>
            </Flex>
          </Box>
        </Grid>
      )}

      {!notes.length && (
        <Box w="100%" h="100vh" p="2" overflowY="scroll">
          <Welcome />
        </Box>
      )}
    </DefaultLayout>
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

export default Dashboard
