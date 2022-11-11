import style from './sorting-page.module.css'
import { useState } from 'react'

import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { RadioInput } from '../ui/radio-input/radio-input'
import { Button } from '../ui/button/button'
import { Direction } from '../../types/direction'
import { Column } from '../ui/column/column'
import { ElementStates } from '../../types/element-states'

import { v4 as uuid } from 'uuid'
import { delay } from '../../utils/functions'

type TLoaded = Direction.Ascending | Direction.Descending | false
type TResultArr = {
  number: number
  state: ElementStates
}

export const SortingPage: React.FC = () => {
  const [loaded, setLoaded] = useState<TLoaded>(false)
  const [sortType, setSortType] = useState<'selection' | 'bubble'>('selection')
  const [, update] = useState({})

  const mathRandom = (max: number, min: number) => Math.floor(Math.random() * (max - min + 1) + min)

  const generateNewArray = () => {
    const arrayLength = mathRandom(17, 3)
    const resultArr = []
    for (let i = 0; i < arrayLength; i++) {
      resultArr.push({ number: mathRandom(100, 0), state: ElementStates.Default })
    }
    return resultArr
  }

  const [arr, setArr] = useState(() => generateNewArray())

  const swap = (arr: any[], index: number, index2: number) => {
    const temp = arr[index]
    arr[index] = arr[index2]
    arr[index2] = temp
  }

  const drawResult = (arr: TResultArr[], index?: number, state?: ElementStates) => {
    if (state && index !== undefined) {
      arr[index].state = state
    }
    setArr(arr)
    update({})
  }

  const selectionSort = (length: number, sortWay: Direction) => {
    if (sortWay === Direction.Ascending || sortWay === Direction.Descending) {
      const recursiveSortSecond = (i: number, newI2?: number, newBest?: number) => {
        let i2 = newI2 ? newI2 + 1 : i + 1
        let best = newBest ? newBest : i

        // Конец цикла в цикле
        if (i2 === length) {
          if (arr[best] !== arr[i]) {
            swap(arr, i, best)
            drawResult(arr, i, ElementStates.Modified)
            drawResult(arr, best, ElementStates.Default)
          } else {
            drawResult(arr, i, ElementStates.Modified)
          }
          setTimeout(() => recursiveSortFirst(i + 1), 1000)
          return
        }

        // Начинаем сравнение
        drawResult(arr, i2, ElementStates.Changing)

        if (sortWay === Direction.Descending) {
          delay(250).then(() => {
            if (arr[i2].number > arr[best].number) {
              best = i2
            }
            // Заканчиваем сравнение
            drawResult(arr, i2, ElementStates.Default)
            // Продолжаем двигаться как в цикле
            recursiveSortSecond(i, i2, best)
          })
        } else if (sortWay === Direction.Ascending) {
          delay(250).then(() => {
            if (arr[i2].number < arr[best].number) {
              best = i2
            }
            drawResult(arr, i2, ElementStates.Default)
            recursiveSortSecond(i, i2, best)
          })
        }
      }

      const recursiveSortFirst = (i: number) => {
        if (i === length) {
          setLoaded(false)
          return
        }
        if (i === 0) {
          arr[i].state = ElementStates.Changing
        } else {
          drawResult(arr, i, ElementStates.Changing)
        }

        recursiveSortSecond(i)
      }

      recursiveSortFirst(0)
    }
  }

  const bubbleSort = (length: number, sortWay: Direction) => {
    if (sortWay === Direction.Ascending || sortWay === Direction.Descending) {
      const recursiveSortSecond = (i: number, newJ: number) => {
        let j = newJ + 1

        if (j === length - i - 1) {
          drawResult(arr, j, ElementStates.Modified)
          setTimeout(() => recursiveSortFirst(i + 1), 1000)
          return
        }
        // Начинаем сравнение
        arr[j].state = ElementStates.Changing
        drawResult(arr, j + 1, ElementStates.Changing)
        delay(250).then(() => {
          if (sortWay === Direction.Ascending) {
            if (arr[j].number > arr[j + 1].number) {
              swap(arr, j, j + 1)
            }
          } else if (sortWay === Direction.Descending) {
            if (arr[j].number < arr[j + 1].number) {
              swap(arr, j, j + 1)
            }
          }
          arr[j].state = ElementStates.Default
          drawResult(arr, j + 1, ElementStates.Default)
          recursiveSortSecond(i, j)
        })
      }

      const recursiveSortFirst = (i: number) => {
        if (i === length) {
          drawResult(arr, 0, ElementStates.Modified)
          setLoaded(false)
          return
        }
        recursiveSortSecond(i, -1)
      }

      recursiveSortFirst(0)
    }
  }

  const startSorting = (sortWay: Direction) => {
    const { length } = arr
    if (sortType === 'selection') {
      selectionSort(length, sortWay)
    } else {
      bubbleSort(length, sortWay)
    }
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.wrapper}>
        <form className={style.form}>
          <div className={style.group}>
            <RadioInput label="Выбор" name="sortType" onChange={() => setSortType('selection')} checked={sortType === 'selection'}></RadioInput>
            <RadioInput label="Пузырек" name="sortType" onChange={() => setSortType('bubble')} checked={sortType === 'bubble'}></RadioInput>
          </div>
          <div className={style.group}>
            <Button
              sorting={Direction.Ascending}
              isLoader={loaded === Direction.Ascending}
              disabled={loaded === Direction.Descending}
              text="По возрастанию"
              onClick={() => {
                setLoaded(Direction.Ascending)
                startSorting(Direction.Ascending)
              }}
            ></Button>
            <Button
              sorting={Direction.Descending}
              isLoader={loaded === Direction.Descending}
              disabled={loaded === Direction.Ascending}
              text="По убыванию"
              onClick={() => {
                setLoaded(Direction.Descending)
                startSorting(Direction.Descending)
              }}
            ></Button>
          </div>
          <Button text="Новый массив" disabled={loaded !== false} onClick={() => setArr(generateNewArray())}></Button>
        </form>
        <div className={style.display}>
          {arr?.map((column) => (
            <Column index={column.number} state={column.state} key={uuid()}></Column>
          ))}
        </div>
      </div>
    </SolutionLayout>
  )
}
