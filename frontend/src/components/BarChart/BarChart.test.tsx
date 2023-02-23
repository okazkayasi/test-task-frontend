import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HomePage } from 'components/HomePage/HomePage'

test('Copy the share link', async () => {
  render(<HomePage />)
})
