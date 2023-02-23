import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HomePage } from 'components/HomePage/HomePage'

test('Copy the share link', async () => {
  render(<HomePage />)

  await waitFor(() => {
    screen.getByTestId('share-button')
    expect(screen.getByText('Copy sharing link')).toBeInTheDocument()
  })
  const shareButton = screen.getByTestId('share-button')
  userEvent.click(shareButton)
  await waitFor(() => {
    expect(shareButton.textContent).toBe('Link copied')
  })
})
