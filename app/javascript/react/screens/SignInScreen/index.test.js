import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import withAllTheProviders from '../../test_helpers'
import SignInScreen from './index'

describe('SignInScreen', () => {
  it('renders actions links', () => {
    const {getByText} = render(
      withAllTheProviders(
        <SignInScreen
          authenticityToken="test"
          errorMessage=""
          resource={{email: ''}}
          infoMessage=""
          signInPath="test"
          signUpPath="test"
          resetPasswordPath="test"
        />,
      ),
    )

    expect(getByText('Sign up').href).toBe('http://localhost/test')
    expect(getByText('Forgot your password?').href).toBe(
      'http://localhost/test',
    )
  })

  it('shows/hide password', () => {
    const {getByPlaceholderText, getByTestId, asFragment} = render(
      withAllTheProviders(
        <SignInScreen
          authenticityToken="test"
          errorMessage="test"
          resource={{email: ''}}
          infoMessage="test"
          signInPath="test"
          signUpPath="test"
          resetPasswordPath="test"
        />,
      ),
    )

    fireEvent.change(getByPlaceholderText('*******'), {
      target: {value: 'secret'},
    })
    const firstRender = asFragment()

    fireEvent.click(getByTestId('password-view'))

    expect(firstRender).toMatchDiffSnapshot(asFragment())
  })

  it('requires email and password', async () => {
    const {getByText, getAllByText} = render(
      withAllTheProviders(
        <SignInScreen
          authenticityToken="test"
          errorMessage="test"
          resource={{email: ''}}
          infoMessage="test"
          signInPath="test"
          signUpPath="test"
          resetPasswordPath="test"
        />,
      ),
    )

    await waitFor(() => {
      fireEvent.click(getByText('Sign In'))
      expect(getAllByText('Required').length).toBe(2)
    })
  })

  it('renders info message', () => {
    render(
      withAllTheProviders(
        <SignInScreen
          authenticityToken="test"
          errorMessage=""
          resource={{email: ''}}
          infoMessage="info message"
          signInPath="test"
          signUpPath="test"
          resetPasswordPath="test"
        />,
      ),
    )

    expect(screen.getByText('info message')).toBeTruthy()
  })

  it('renders error message', () => {
    render(
      withAllTheProviders(
        <SignInScreen
          authenticityToken="test"
          errorMessage="error message"
          resource={{email: ''}}
          infoMessage=""
          signInPath="test"
          signUpPath="test"
          resetPasswordPath="test"
        />,
      ),
    )

    expect(screen.getByText('error message')).toBeTruthy()
  })
})
