import { ElementStates } from '../../types/element-states'

interface IStack<T> {
  addToStack: (item: T) => void
  removeFromStack: () => void
  clearStack: () => void
}

export class Stack<T> implements IStack<T> {
  private container: { value: T; state: ElementStates }[] = []

  public get getContainer() {
    return this.container
  }

  addToStack = (value: T) => this.container.push({ value, state: ElementStates.Changing })

  removeFromStack = () => this.container.pop()

  clearStack() {
    this.container.splice(0)
  }
}
