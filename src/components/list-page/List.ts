import { ElementStates } from '../../types/element-states'

export type TItem = { value: string; state: ElementStates; upperCircle?: TItem; lowerCircle?: TItem }

class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value
    this.next = next === undefined ? null : next
  }
}

interface ILinkedList<T> {
  append: (element: T) => T
  insertAtHead: (element: T) => T
  insertAt: (element: T, index: number) => T
  removeAt: (index: number) => T
  print: () => T[]
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null
  private size: number

  constructor() {
    this.head = null
    this.size = 0
  }

  insertAtHead(element: T) {
    const node = new Node(element)
    node.next = this.head
    this.head = node
    this.size++
    return this.head.value
  }

  append(element: T) {
    const node = new Node(element)

    if (this.head === null || this.size === 0) {
      this.head = node
      this.size++
      return this.head.value
    } else {
      let current = this.head

      while (current.next) {
        current = current.next
      }
      current.next = node
      this.size++
      return current.next.value
    }
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      throw new Error('invalid index')
    } else {
      const node = new Node(element)

      if (index === 0) {
        node.next = this.head
        this.head = node
        this.size++
        return this.head.value
      } else {
        let curr = this.head
        let currIndex = 0
        let prev = null

        while (currIndex < index) {
          prev = curr
          curr = curr!.next
          currIndex++
        }

        prev!.next = node
        node.next = curr
        this.size++
        return node.value
      }
    }
  }

  removeAt(index: number) {
    if (index < 0 || index > this.size) {
      throw new Error('invalid index')
    } else {
      let curr = this.head

      if (index === 0) {
        this.head = curr!.next
      } else {
        let prev = null
        let pos = 0

        while (pos < index) {
          prev = curr
          curr = curr!.next
          pos++
        }

        prev!.next = curr!.next
      }

      this.size--
      return curr!.value
    }
  }

  print() {
    let curr = this.head
    const res = []
    while (curr) {
      res.push(curr.value)
      curr = curr.next
    }
    return res
  }

  public get getSize() {
    return this.size
  }
}
