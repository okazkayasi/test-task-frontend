import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HomePage } from 'components/HomePage/HomePage'

describe('See the loading text', () => {
  render(<HomePage />)
  const loadingTitle = screen.getByTestId('loading-text')
  it('should render the loading text', () => {
    expect(loadingTitle).toBeInTheDocument()
  })
  it('should render the correct text', () => {
    expect(loadingTitle.textContent).toBe('Nice loading animation')
  })
})

describe('See the buttons with correct text', () => {
  beforeAll(() => {
    render(<HomePage />)
  })
  it('should render the share button', async () => {
    const shareButton = await waitFor(() => {
      return screen.getByTestId('share-button')
    })
    expect(shareButton).toBeInTheDocument()
    expect(shareButton.textContent).toBe('Copy sharing link')
    userEvent.click(shareButton)
    await waitFor(() => {
      expect(shareButton.textContent).toBe('Link copied')
    })
  })
})

describe('See the toggle button', () => {
  beforeAll(() => {
    render(<HomePage />)
  })

  it('should render the toggle button', async () => {
    const toggleButton = await waitFor(() => {
      return screen.getByTestId('toggle-button')
    })
    expect(toggleButton).toBeInTheDocument()
    expect(toggleButton.textContent).toBe('Set to food-based sorting')
  })
})
