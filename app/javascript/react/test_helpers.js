// https://testing-library.com/docs/react-testing-library/setup
import React from 'react'
import ThemeProvider from './components/ThemeProvider'

const withAllTheProviders = (component) => (
  <ThemeProvider>{component}</ThemeProvider>
)

export default withAllTheProviders
