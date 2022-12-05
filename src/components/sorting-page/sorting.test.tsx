import { swap, algorithmicBubbleSort, algorithmicSelectionSort } from '../../utils/functions'

describe('sorting algorithm test', () => {
  it('swap function work properly', () => {
    const arr = [10, 5, 2, 1]
    let tempArrElem = arr[2]
    swap(arr, 1, 2)
    expect(arr[1]).toBe(tempArrElem)
    tempArrElem = arr[0]
    swap(arr, 0, 3)
    expect(arr[3]).toBe(tempArrElem)
  })

  it('bubble sort increase test', () => {
    const arr = [1, 6, 13, 23, 511]
    expect(algorithmicBubbleSort(arr, true).join(',')).toBe('1,6,13,23,511')
  })

  it('bubble sort decrease test', () => {
    const arr = [1, 6, 13, 23, 511]
    expect(algorithmicBubbleSort(arr, false).join(',')).toBe('511,23,13,6,1')
  })

  it('bubble sort work properly with one element array', () => {
    const arr = [1]
    expect(algorithmicBubbleSort(arr, true).join('')).toBe('1')
    expect(algorithmicBubbleSort(arr, false).join('')).toBe('1')
  })

  it('bubble sort work properly with zero length array', () => {
    const arr: number[] = []
    expect(algorithmicBubbleSort(arr, true).join('')).toBe('')
    expect(algorithmicBubbleSort(arr, false).join('')).toBe('')
  })

  it('selection sort increase test', () => {
    const arr = [5, 10, 3, 16, 2, 20, 4]
    expect(algorithmicSelectionSort(arr, true).join(',')).toBe('2,3,4,5,10,16,20')
  })
  it('selection sort decrease test', () => {
    const arr = [5, 10, 3, 16, 2, 20, 4]
    expect(algorithmicSelectionSort(arr, false).join(',')).toBe('20,16,10,5,4,3,2')
  })

  it('selection sort work properly with one element array', () => {
    const arr = [3]
    expect(algorithmicBubbleSort(arr, true).join('')).toBe('3')
    expect(algorithmicBubbleSort(arr, false).join('')).toBe('3')
  })

  it('selection sort work properly with zero length array', () => {
    const arr: number[] = []
    expect(algorithmicSelectionSort(arr, true).join('')).toBe('')
    expect(algorithmicSelectionSort(arr, false).join('')).toBe('')
  })
})
