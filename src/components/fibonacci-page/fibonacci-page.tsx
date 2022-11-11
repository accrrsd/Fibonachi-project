import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import style from './fibonacci-page.module.css'
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { ChangeEvent, useState } from 'react'
import { v4 as uuid } from 'uuid'

export const FibonacciPage: React.FC = () => {
  const [loaded, setLoaded] = useState(false)
  const [value, setValue] = useState<string>('0')
  const [result, setResult] = useState<Array<string>>([])
  const [, update] = useState({})

  const startFibonacciCalculating = () => {
    if (value) {
      setLoaded(true)

      const findFibonacciValue = (num: number) => {
        let x = 1,
          y = 0,
          temp
        let localValue = num

        while (localValue >= 0) {
          temp = x
          x += y
          y = temp
          localValue--
        }
        return y
      }

      const localArr: string[] = []
      let iterator = 0

      const FibonacciInterval = setInterval(() => {
        if (iterator > Number(value)) {
          clearInterval(FibonacciInterval)
          setLoaded(false)
          return
        }
        localArr.push(String(findFibonacciValue(iterator)))
        setResult(localArr)
        update({})
        iterator++
      }, 500)
    }
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.form}>
        <Input
          type="number"
          isLimitText={true}
          max={19}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          placeholder="Введите число"
        ></Input>
        <Button text="Развернуть" isLoader={loaded} disabled={loaded || Number(value) > 19} onClick={() => startFibonacciCalculating()}></Button>
      </form>
      <div className={style.display}>
        {result.map((item, i) => (
          <Circle letter={item} index={i} key={uuid()}></Circle>
        ))}
      </div>
    </SolutionLayout>
  )
}
