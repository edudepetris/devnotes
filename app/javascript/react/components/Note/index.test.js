import React from 'react'
import {render, fireEvent, waitFor} from '@testing-library/react'
import withAllTheProviders from '../../test_helpers'
import Note from './index'

describe('Note', () => {
  const note = {
    id: 1,
    content: `# This is a h1

    ~~~js
    const hello = 'world';
    ~~~

    `,
    project_name: 'Devnotes',
    user_id: 1,
    created_at: 'Tue, 22 Sep 2020 09:44:03 UTC +00:00',
    updated_at: 'Tue, 22 Sep 2020 09:44:03 UTC +00:00',
  }

  it('renders the content as html', () => {
    const {getByRole} = render(withAllTheProviders(<Note note={note} />))

    // searching by h1
    expect(getByRole('heading', {level: 1})).toBeTruthy()
  })

  it('shows meta information', () => {
    const {getByText} = render(withAllTheProviders(<Note note={note} />))

    waitFor(() => {
      fireEvent.click(getByText('Meta'))
      expect(getByText('Project Name')).toBeTruthy()
    })
  })
})
