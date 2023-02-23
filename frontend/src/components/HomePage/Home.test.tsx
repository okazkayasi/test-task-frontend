import { render } from '@testing-library/react'
import { HomePage } from 'components/HomePage/HomePage'
import React from 'react'

test('renders the home without errors', () => {
  render(<HomePage />)
})
