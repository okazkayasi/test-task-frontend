import { render, screen } from '@testing-library/react'
import { HomePage } from 'components/HomePage/HomePage'
import { unmountComponentAtNode } from 'react-dom'

let container: any = null
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

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
