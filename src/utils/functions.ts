export const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time))
export const swap = (arr: any[], index: number, index2: number) => {
  const temp = arr[index]
  arr[index] = arr[index2]
  arr[index2] = temp
}
export const algorithmicFlipping = (readyStr: string) => {
  if (readyStr.length > 0) {
    const startIndex = 0
    const endIndex = readyStr.length - 1
    const arrayStr = Array.from(readyStr)

    for (let i = startIndex; i + 1 < endIndex; i++) {
      swap(arrayStr, i, endIndex - i)
    }
    return arrayStr.join('')
  }
  return readyStr
}
export const algorithmicBubbleSort = (arr: number[], increase: boolean = true) => {
  let i, j
  let len = arr.length
  let isSwapped = false

  if (increase) {
    for (i = 0; i < len; i++) {
      isSwapped = false

      for (j = 0; j < len; j++) {
        if (arr[j] > arr[j + 1]) {
          swap(arr, j, j + 1)
          isSwapped = true
        }
      }

      if (!isSwapped) {
        break
      }
    }
  } else {
    for (i = 0; i < len; i++) {
      isSwapped = false

      for (j = 0; j < len; j++) {
        if (arr[j] < arr[j + 1]) {
          swap(arr, j, j + 1)
          isSwapped = true
        }
      }

      if (!isSwapped) {
        break
      }
    }
  }
  return arr
}

export const algorithmicSelectionSort = (arr: number[], increase: boolean = true) => {
  let len = arr.length
  if (increase) {
    for (let i = 0; i < len; i++) {
      let min = i

      for (let j = i + 1; j < len; j++) {
        if (arr[j] < arr[min]) {
          min = j
        }
      }
      if (min !== i) {
        swap(arr, i, min)
      }
    }
  } else {
    for (let i = 0; i < len; i++) {
      let max = i

      for (let j = i + 1; j < len; j++) {
        if (arr[j] > arr[max]) {
          max = j
        }
      }
      if (max !== i) {
        swap(arr, i, max)
      }
    }
  }
  return arr
}
