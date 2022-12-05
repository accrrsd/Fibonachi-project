import style from './string.module.css'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'
import { ChangeEvent, useState } from 'react'
import { Circle } from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states'
import { v4 as uuid } from 'uuid'

// Основная функция переворота строки
import { swap } from '../../utils/functions'

type TResultItem = {
  key: string
  state: ElementStates
}

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [result, setResult] = useState<Array<TResultItem>>([])
  const [, update] = useState({})

  const startFlipping = () => {
    // Инициализация
    // prettier-ignore
    const readyStr = value.replace(/\s/g, '').split('').map((char) => ({ key: char, state: ElementStates.Default }))
    setResult(readyStr)
    setLoaded(true)

    // Вспомогательные функции
    const delay = (time: number) => {
      return new Promise((resolve) => setTimeout(resolve, time))
    }

    // Визуализация результата
    const drawResult = (str: TResultItem[], indexes: Array<number>, NeededState: ElementStates) => {
      if (indexes.length > 0) {
        // Количество индексов обычно не больше двух
        indexes.forEach((index) => {
          str[index].state = NeededState
        })
        setResult(str)
        update({})
      }
    }

    // Итераторы
    let startIndex = 0
    let endIndex = readyStr.length - 1

    const sortInterval = setInterval(() => flippingFunc(readyStr), 1000)

    const flippingFunc = (str: TResultItem[]) => {
      // Завершаем разворот перекраской центра
      if (startIndex >= endIndex) {
        drawResult(str, [startIndex], ElementStates.Modified)
        clearInterval(sortInterval)
        setLoaded(false)
        return
      }

      drawResult(readyStr, [startIndex, endIndex], ElementStates.Changing)

      delay(500).then(() => {
        swap(str, startIndex, endIndex)

        drawResult(str, [startIndex, endIndex], ElementStates.Modified)

        startIndex++
        endIndex--
      })
    }
  }

  return (
    <SolutionLayout title="Строка">
      <form className={style.form}>
        <Input
          isLimitText={true}
          maxLength={11}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          data-testid="string_input"
        ></Input>
        <Button text="Развернуть" onClick={() => startFlipping()} isLoader={loaded} disabled={!value} data-testid="string_button"></Button>
      </form>
      {result && (
        <div className={style.display} data-testid="circle_container">
          {result.map((item) => (
            <Circle letter={item.key} state={item.state} key={uuid()}></Circle>
          ))}
        </div>
      )}
    </SolutionLayout>
  )
}
