import { render, screen, waitFor } from '@testing-library/react'
import { HomePage } from 'components/HomePage/HomePage'

test('Copy the share link', async () => {
  render(<HomePage />)
})

describe('See bar chart', () => {
  render(<HomePage />)
  test('See main group elements', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('svg-element')).toBeInTheDocument()
      expect(screen.getByTestId('x-axis')).toBeInTheDocument()
      expect(screen.getByTestId('y-axis')).toBeInTheDocument()
      expect(screen.getByTestId('chart-svg')).toBeInTheDocument()
    })
  })

  test('See some arbitrary bars', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('ES donut')).toBeInTheDocument()
      expect(screen.getByTestId('DE burger')).toBeInTheDocument()
      expect(screen.getByTestId('FR fries')).toBeInTheDocument()
      expect(screen.getByTestId('IT sandwich')).toBeInTheDocument()
      expect(screen.getByTestId('BE hotdog')).toBeInTheDocument()
    })
  })



})
