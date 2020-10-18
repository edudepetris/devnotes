import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import withAllTheProviders from '../../test_helpers'
import SignUpScreen from './index'

describe('SignInScreen', () => {
  it('renders log in link', () => {
    const {getByText} = render(
      withAllTheProviders(
        <SignUpScreen
          authenticityToken="test"
          errorMessages={[]}
          resource={{email: ''}}
          signInPath="test"
          signUpPath="test"
        />,
      ),
    )

    expect(getByText('Log in').href).toBe('http://localhost/test')
  })

  it('requires email and password', async () => {
    const {getByText, getAllByText} = render(
      withAllTheProviders(
        <SignUpScreen
          authenticityToken="test"
          errorMessages={[]}
          resource={{email: ''}}
          signInPath="test"
          signUpPath="test"
        />,
      ),
    )

    await waitFor(() => {
      fireEvent.click(getByText('Sign Up'))
      expect(getAllByText('Required').length).toBe(3)
    })
  })

  it('renders error message', () => {
    render(
      withAllTheProviders(
        <SignUpScreen
          authenticityToken="test"
          errorMessages={['error 1', 'error 2']}
          resource={{email: ''}}
          signInPath="test"
          signUpPath="test"
        />,
      ),
    )

    expect(screen.getByText('error 1')).toBeTruthy()
    expect(screen.getByText('error 2')).toBeTruthy()
  })
})
