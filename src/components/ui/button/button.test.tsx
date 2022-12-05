import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './button'

const onClick = jest.fn()

describe('Button component', () => {
  it('Button with text', () => {
    const button = render(<Button text="Test"></Button>)
    expect(button.getByText('Test')).toBeInTheDocument()
  })

  it('Button without text', () => {
    const button = render(<Button></Button>)
    expect(button.queryByText('Test')).toBeNull()
  })

  it('Blocked Button snapshot', () => {
    render(<Button disabled={true} data-testid="button_blocked_test" onClick={onClick}></Button>)
    userEvent.click(screen.getByTestId('button_blocked_test'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('Loaded Button snapshot', () => {
    render(<Button isLoader={true} data-testid="button_loaded_test" onClick={onClick}></Button>)
    userEvent.click(screen.getByTestId('button_loaded_test'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('Button with callback', () => {
    render(<Button onClick={onClick} data-testid="button_test"></Button>)
    userEvent.click(screen.getByTestId('button_test'))
    expect(onClick).toHaveBeenCalled()
  })
})
