import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import withAllTheProviders from '../../test_helpers'
import ChangePasswordScreen from './index'

describe('ChangePasswordScreen', () => {
  it('renders log in link', () => {
    const {getByText} = render(
      withAllTheProviders(
        <ChangePasswordScreen
          authenticityToken="test"
          errorMessages={[]}
          resource={{email: ''}}
          signInPath="test"
          signUpPath="test"
          passwordPath="reset"
          resetPasswordToken="test"
        />,
      ),
    )

    expect(getByText('Log in').href).toBe('http://localhost/test')
    expect(getByText('Sign up').href).toBe('http://localhost/test')
  })

  it('requires password', async () => {
    const {getByText, getAllByText} = render(
      withAllTheProviders(
        <ChangePasswordScreen
          authenticityToken="test"
          errorMessages={[]}
          resource={{email: ''}}
          signInPath="test"
          signUpPath="test"
          passwordPath="reset"
          resetPasswordToken="test"
        />,
      ),
    )

    await waitFor(() => {
      fireEvent.click(getByText('Change my password'))
      expect(getAllByText('Required').length).toBe(2)
    })
  })

  it('renders error message', () => {
    render(
      withAllTheProviders(
        <ChangePasswordScreen
          authenticityToken="test"
          errorMessages={['error 1', 'error 2']}
          resource={{email: ''}}
          signInPath="test"
          signUpPath="test"
          passwordPath="reset"
          resetPasswordToken="test"
        />,
      ),
    )

    expect(screen.getByText('error 1')).toBeTruthy()
    expect(screen.getByText('error 2')).toBeTruthy()
  })
})
