import { render, screen } from '@testing-library/react'
import { Circle } from './circle'
import { ElementStates } from '../../../types/element-states'

const TestingReactComponent: React.FC<{ dataTest: string }> = ({ dataTest }) => {
  return <div data-testid={dataTest}></div>
}

describe('Circle component', () => {
  it('render circle', () => {
    const { baseElement } = render(<Circle></Circle>)
    expect(baseElement).toBeInTheDocument()
  })

  it('render circle with letter snapshot', () => {
    const circle = render(<Circle letter="a"></Circle>)
    expect(circle).toMatchSnapshot()
  })

  it('render circle with head snapshot', () => {
    const circle = render(<Circle head="head"></Circle>)
    expect(circle.getByText('head')).toBeInTheDocument()
  })

  it('render circle with react element in head', () => {
    render(<Circle head={<TestingReactComponent dataTest="react_element_in_head" />}></Circle>)
    expect(screen.getByTestId('react_element_in_head')).toBeInTheDocument()
  })

  it('render circle with tail', () => {
    const circle = render(<Circle tail="tail"></Circle>)
    expect(circle.getByText('tail')).toBeInTheDocument()
  })

  it('render circle with react element in tail', () => {
    render(<Circle tail={<TestingReactComponent dataTest="react_element_in_tail" />}></Circle>)
    expect(screen.getByTestId('react_element_in_tail')).toBeInTheDocument()
  })

  it('render circle with index', () => {
    const circle = render(<Circle index={123}></Circle>)
    expect(circle.getByText('123')).toBeInTheDocument()
  })

  it('render small circle', () => {
    const { container } = render(<Circle isSmall={true}></Circle>)
    expect(container.querySelector('.small')).not.toBeNull()
  })
  it('render default circle', () => {
    const { container } = render(<Circle state={ElementStates.Default}></Circle>)
    expect(container.querySelector(`.${ElementStates.Default}`)).not.toBeNull()
  })
  it('render changing circle', () => {
    const { container } = render(<Circle state={ElementStates.Changing}></Circle>)
    expect(container.querySelector(`.${ElementStates.Changing}`)).not.toBeNull()
  })
  it('render modified circle', () => {
    const { container } = render(<Circle state={ElementStates.Modified}></Circle>)
    expect(container.querySelector(`.${ElementStates.Modified}`)).not.toBeNull()
  })
})
