import { swap, algorithmicFlipping } from '../../utils/functions'
describe('String algorithm', () => {
  it('swap function work properly', () => {
    const arr = [10, 5, 2, 1]
    let tempArrElem = arr[2]
    swap(arr, 1, 2)
    expect(arr[1]).toBe(tempArrElem)
    tempArrElem = arr[0]
    swap(arr, 0, 3)
    expect(arr[3]).toBe(tempArrElem)
  })

  it('string reverse properly with even number of chars', () => {
    const value = '1234'
    const expectedRes = '4321'
    const res = algorithmicFlipping(value)
    expect(res).toEqual(expectedRes)
  })

  it('string reverse properly with odd number of chars', () => {
    const value = '123'
    const expectedRes = '321'
    const res = algorithmicFlipping(value)
    expect(res).toEqual(expectedRes)
  })

  it('string reverse work properly with one char', () => {
    const value = '1'
    const expectedRes = '1'
    const res = algorithmicFlipping(value)
    expect(res).toEqual(expectedRes)
  })

  it("string reverse doesn't break with no char", () => {
    const value = ''
    const expectedRes = ''
    const res = algorithmicFlipping(value)
    expect(res).toEqual(expectedRes)
  })
})
