import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import withAllTheProviders from '../../test_helpers'
import MyAccount from './index'

describe('MyAccount', () => {
  it('renders go to dashboard link', () => {
    const {getByText} = render(
      withAllTheProviders(
        <MyAccount
          authenticityToken="test"
          errorMessages={[]}
          resource={{email: ''}}
          myAccountPath="test"
        />,
      ),
    )

    expect(getByText('Go to dashboard').href).toBe('http://localhost/dashboard')
  })

  it('requires password, confirmation and current', async () => {
    const {getByText, getAllByText} = render(
      withAllTheProviders(
        <MyAccount
          authenticityToken="test"
          errorMessages={[]}
          resource={{email: ''}}
          myAccountPath="test"
        />,
      ),
    )

    await waitFor(() => {
      fireEvent.click(getByText('Update'))
      expect(getAllByText('Required').length).toBe(3)
    })
  })

  it('renders error message', () => {
    render(
      withAllTheProviders(
        <MyAccount
          authenticityToken="test"
          errorMessages={['error 1', 'error 2']}
          resource={{email: ''}}
          myAccountPath="test"
        />,
      ),
    )

    expect(screen.getByText('error 1')).toBeTruthy()
    expect(screen.getByText('error 2')).toBeTruthy()
  })
})
