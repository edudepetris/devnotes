import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import withAllTheProviders from '../../test_helpers'
import ForgotPasswordScreen from './index'

describe('ForgotPasswordScreen', () => {
  it('renders actions links', () => {
    const {getByText} = render(
      withAllTheProviders(
        <ForgotPasswordScreen
          authenticityToken="test"
          errorMessage=""
          resource={{email: ''}}
          signInPath="test"
          signUpPath="test"
          forgotPasswordPath="test"
        />,
      ),
    )

    expect(getByText('Log in').href).toBe('http://localhost/test')
    expect(getByText('Sign up').href).toBe('http://localhost/test')
  })

  it('requires email and password', async () => {
    const {getByText, getAllByText} = render(
      withAllTheProviders(
        <ForgotPasswordScreen
          authenticityToken="test"
          errorMessage=""
          resource={{email: ''}}
          signInPath="test"
          signUpPath="test"
          forgotPasswordPath="test"
        />,
      ),
    )

    await waitFor(() => {
      fireEvent.click(getByText('Send me reset password instructions'))
      expect(getAllByText('Required').length).toBe(1)
    })
  })

  it('renders error message', () => {
    render(
      withAllTheProviders(
        <ForgotPasswordScreen
          authenticityToken="test"
          errorMessage="error message"
          resource={{email: ''}}
          signInPath="test"
          signUpPath="test"
          forgotPasswordPath="test"
        />,
      ),
    )

    expect(screen.getByText('error message')).toBeTruthy()
  })
})
