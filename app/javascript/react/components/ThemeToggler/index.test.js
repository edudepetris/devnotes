import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import withAllTheProviders from '../../test_helpers'
import ThemeToggler from './index'

describe('ThemeToggler', () => {
  it('renders light as default colorMode', () => {
    const {getByTestId} = render(withAllTheProviders(<ThemeToggler />))

    expect(getByTestId('dark')).toBeTruthy()
  })

  it('changes the colormode', () => {
    const {getByTestId, asFragment} = render(
      withAllTheProviders(<ThemeToggler />),
    )
    const firstRender = asFragment()

    fireEvent.click(getByTestId('dark'))

    expect(firstRender).toMatchDiffSnapshot(asFragment())
  })
})
