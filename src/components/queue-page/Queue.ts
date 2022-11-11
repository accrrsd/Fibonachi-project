import { ElementStates } from '../../types/element-states'

interface IQueue<T> {
  enqueue: (item: T) => void
  dequeue: () => void
  changeStateByIndex: (index: number, state: ElementStates) => void
  reset: () => void
}

export class Queue<T> implements IQueue<T> {
  private head = 0
  private tail = -1
  private container: { value: T | null; state: ElementStates }[] = []
  public readonly size: number

  constructor(size: number) {
    this.size = size
    this.container = Array(this.size).fill({ value: null, state: ElementStates.Default })
  }

  enqueue(value: T) {
    if (this.tail + 1 >= this.size) {
      throw new Error('Out of queue')
    } else {
      this.tail++
      this.container[this.tail] = { value, state: ElementStates.Default }
    }
  }

  dequeue() {
    if (this.head >= this.size) {
      throw new Error('No elements in the queue')
    } else {
      this.container[this.head] = { value: null, state: ElementStates.Default }
      if (this.head + 1 < this.size) {
        this.head++
      }
    }
  }

  changeStateByIndex(index: number, state: ElementStates) {
    if (index > this.container.length - 1) {
      throw new Error('Out of queue range')
    } else {
      this.container[index] = { value: this.container[index].value, state }
    }
  }

  public get getData() {
    const container = this.container
    const head = this.head
    const tail = this.tail
    return { container, head, tail }
  }

  public reset() {
    this.head = 0
    this.tail = -1
    this.container = Array(this.size).fill({ value: null, state: ElementStates.Default })
  }
}
