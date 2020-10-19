import React from 'react'
import {render} from '@testing-library/react'
import withAllTheProviders from '../../test_helpers'
import StackNotes from './index'

describe('StackNotes', () => {
  /* eslint-disable max-len */
  const notes = [
    {
      title: 'Devnotes',
      id: 1,
      desc:
        "I'm drinking 🍻 meanwhile I'm 👨‍💻 this project. Is so hard get focus in on thing",
    },
    {
      title: 'DeathStar',
      id: 2,
      desc:
        'The Death Star was the Empire’s ultimate weapon: a moon-sized space station with the ability to destroy an entire planet.',
    },
    {
      title: 'Notes CLI',
      id: 3,
      desc: 'The cli tool that',
    },
  ]
  /* eslint-enable max-len */

  it('renders out all notes', () => {
    const {getByText} = render(
      withAllTheProviders(<StackNotes notes={notes} />),
    )

    expect(getByText(notes[0].title)).toBeTruthy()
    expect(getByText(notes[1].title)).toBeTruthy()
    expect(getByText(notes[2].title)).toBeTruthy()
  })

  it('highlight the selected one', () => {
    const {getByRole} = render(
      withAllTheProviders(<StackNotes notes={notes} selectedNoteId={1} />),
    )

    expect(getByRole('tab', {selected: true})).toBeTruthy()
  })
})
