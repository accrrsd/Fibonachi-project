import style from './list-page.module.css'
import { ChangeEvent, useState } from 'react'

import { Input } from '../ui/input/input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { Button } from '../ui/button/button'
import { ElementStates } from '../../types/element-states'
import { Circle } from '../ui/circle/circle'
import { ArrowIcon } from '../ui/icons/arrow-icon'

import { delay } from '../../utils/functions'
import { v4 as uuid } from 'uuid'

import { TItem } from './List'
import { LinkedList } from './List'

export const ListPage: React.FC = () => {
  const [value, setValue] = useState('')
  const [index, setIndex] = useState('')
  const [list] = useState(() => {
    const localList = new LinkedList<TItem>()
    localList.append({ value: '0', state: ElementStates.Default })
    localList.append({ value: '34', state: ElementStates.Default })
    localList.append({ value: '8', state: ElementStates.Default })
    localList.append({ value: '1', state: ElementStates.Default })
    return localList
  })
  const resArr = list.print()

  const [disabled, setDisabled] = useState(false)
  const [loaded, setLoaded] = useState<string | false>(false)

  const [, update] = useState({})

  const setZeroState = () => {
    setDisabled(false)
    setLoaded(false)
    setValue('')
    setIndex('')
  }

  const addTailOrHead = (index: number) => {
    const size = list.getSize

    if (index < 0 || index >= size) {
      setLoaded(false)
      setDisabled(false)
      throw new Error('invalid index')
    } else {
      setDisabled(true)
      resArr[index].upperCircle = { value, state: ElementStates.Changing }
      update({})

      delay(500).then(() => {
        resArr[index].upperCircle = undefined
        const resValue = { value, state: ElementStates.Default }

        const elem = index === 0 ? list.insertAtHead(resValue) : list.append(resValue)

        elem.state = ElementStates.Modified
        update({})
        delay(500).then(() => {
          elem.state = ElementStates.Default
          update({})
          setZeroState()
        })
      })
    }
  }

  const removeCircle = (index: number) => {
    const size = list.getSize

    if (index < 0 || index >= size) {
      setLoaded(false)
      throw new Error('invalid index')
    } else {
      setDisabled(true)
      resArr[index].lowerCircle = { value: resArr[index].value, state: ElementStates.Changing }
      resArr[index].value = ''
      update({})

      delay(600).then(() => {
        list.removeAt(index)
        update({})
        setZeroState()
      })
    }
  }

  const addByIndex = (index: number) => {
    const size = list.getSize
    if (index < 0 || index >= size) {
      setLoaded(false)
      throw new Error('invalid index')
    } else {
      setDisabled(true)
      let iterator = 0
      let changedCircles: TItem[] = []
      const intervalFunc = () => {
        if (iterator === index) {
          clearInterval(interval)
          resArr[iterator].upperCircle = { value, state: ElementStates.Changing }
          update({})
          delay(500).then(() => {
            resArr[iterator].upperCircle = undefined
            const elem = list.insertAt({ value, state: ElementStates.Modified }, index)
            changedCircles.forEach((item) => (item.state = ElementStates.Default))
            update({})
            delay(400).then(() => {
              elem.state = ElementStates.Default
              update({})
              setZeroState()
            })
          })
          return
        } else {
          resArr[iterator].upperCircle = { value, state: ElementStates.Changing }
          resArr[iterator].state = ElementStates.Changing
          changedCircles.push(resArr[iterator])
          update({})
          delay(500).then(() => {
            resArr[iterator].upperCircle = undefined
            update({})
            iterator++
          })
        }
      }
      const interval = setInterval(intervalFunc, 1000)
    }
  }

  const removeByIndex = (index: number) => {
    const size = list.getSize
    if (index < 0 || index >= size) {
      setLoaded(false)
      throw new Error('invalid index')
    } else {
      setDisabled(true)
      let iterator = 0
      let changedCircles: TItem[] = []
      const intervalFunc = () => {
        if (iterator === index) {
          clearInterval(interval)
          resArr[iterator].state = ElementStates.Changing
          update({})
          delay(500).then(() => {
            const circleValue = resArr[iterator].value
            resArr[iterator].state = ElementStates.Default
            resArr[iterator].value = ''
            resArr[iterator].lowerCircle = { value: circleValue, state: ElementStates.Changing }
            update({})
            delay(500).then(() => {
              list.removeAt(index)
              changedCircles.forEach((item) => (item.state = ElementStates.Default))
              update({})
              setZeroState()
            })
            return
          })
        } else {
          resArr[iterator].state = ElementStates.Changing
          changedCircles.push(resArr[iterator])
          update({})
          iterator++
        }
      }
      const interval = setInterval(intervalFunc, 1000)
    }
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={style.form}>
        <div className={style.line}>
          <Input
            maxLength={4}
            placeholder="Введите значение"
            isLimitText={true}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            extraClass={style.inputClass}
          ></Input>

          <Button
            text="Добавить в head"
            disabled={!value || disabled}
            onClick={() => {
              setLoaded('addToHead')
              addTailOrHead(0)
            }}
            isLoader={loaded === 'addToHead'}
            extraClass={style.shortButton}
          ></Button>

          <Button
            text="Добавить в tail"
            disabled={!value || disabled}
            onClick={() => {
              setLoaded('addToTail')
              addTailOrHead(resArr.length - 1)
            }}
            isLoader={loaded === 'addToTail'}
            extraClass={style.shortButton}
          ></Button>

          <Button
            text="Удалить из head"
            onClick={() => {
              setLoaded('removeFromHead')
              removeCircle(0)
            }}
            extraClass={style.shortButton}
            disabled={resArr.length === 0 || disabled}
            isLoader={loaded === 'removeFromHead'}
          ></Button>

          <Button
            text="Удалить из tail"
            onClick={() => {
              setLoaded('removeFromTail')
              removeCircle(resArr.length - 1)
            }}
            isLoader={loaded === 'removeFromTail'}
            extraClass={style.shortButton}
            disabled={resArr.length === 0 || disabled}
          ></Button>
        </div>
        <div className={style.line}>
          <Input
            placeholder="Введите индекс"
            value={index}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setIndex(e.target.value)}
            type="number"
            extraClass={style.inputClass}
          ></Input>

          <Button
            text="Добавить по индексу"
            onClick={() => {
              setLoaded('addByIndex')
              addByIndex(Number(index))
            }}
            isLoader={loaded === 'addByIndex'}
            disabled={!index || !value || disabled}
            extraClass={style.wideButton}
          ></Button>

          <Button
            text="Удалить по индексу"
            disabled={!index || disabled}
            onClick={() => {
              setLoaded('removeByIndex')
              removeByIndex(Number(index))
            }}
            isLoader={loaded === 'removeByIndex'}
            extraClass={style.wideButton}
          ></Button>
        </div>
      </form>
      <div className={style.display}>
        {resArr?.map((item, i) => (
          <div className={style.circleGroup} key={uuid()}>
            <Circle
              index={i}
              head={
                item.upperCircle ? (
                  <Circle letter={item.upperCircle.value} state={item.upperCircle.state} isSmall={true}></Circle>
                ) : i === 0 ? (
                  'head'
                ) : (
                  ''
                )
              }
              tail={
                item.lowerCircle ? (
                  <Circle letter={item.lowerCircle.value} state={item.lowerCircle.state} isSmall={true}></Circle>
                ) : i === resArr.length - 1 ? (
                  'tail'
                ) : (
                  ''
                )
              }
              letter={item.value}
              state={item.state}
            ></Circle>
            {i + 1 < resArr.length && <ArrowIcon />}
          </div>
        ))}
      </div>
    </SolutionLayout>
  )
}
