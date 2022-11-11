import style from './stack-page.module.css'
import { ChangeEvent, useState } from 'react'

import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states'

import { v4 as uuid } from 'uuid'
import { delay } from '../../utils/functions'
import { Stack } from './Stack'

export const StackPage: React.FC = () => {
  const [value, setValue] = useState('')
  const [stack] = useState(new Stack<string>())
  const [container] = useState(stack.getContainer)

  const [disabled, setDisabled] = useState(false)
  const [, update] = useState({})

  const addToStackHandler = (value: string) => {
    const hasNumber = (str: string) => /\d/.test(str)
    if (hasNumber(value)) {
      setDisabled(true)

      stack.addToStack(value)
      update({})

      delay(400).then(() => {
        container[container.length - 1].state = ElementStates.Default
        setDisabled(false)
        update({})
      })
    }
  }

  const removeFromStackHandler = () => {
    setDisabled(true)

    container[container.length - 1].state = ElementStates.Changing
    update({})

    delay(400).then(() => {
      stack.removeFromStack()
      update({})
      setDisabled(false)
    })
  }

  return (
    <SolutionLayout title="Стек">
      <form className={style.form}>
        <div className={style.group}>
          <Input
            maxLength={4}
            placeholder="Введите значение"
            isLimitText={true}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          ></Input>
          <Button
            text="Добавить"
            disabled={!value || disabled}
            onClick={() => {
              addToStackHandler(value)
              setValue('')
            }}
          ></Button>
          <Button text="Удалить" disabled={container.length === 0 || disabled} onClick={() => removeFromStackHandler()}></Button>
        </div>
        <Button
          text="Очистить"
          disabled={container.length === 0 || disabled}
          onClick={() => {
            stack.clearStack()
            update({})
          }}
        ></Button>
      </form>
      <div className={style.display}>
        {container?.map((item, i) => (
          <Circle head={i === container.length - 1 ? 'top' : ''} index={i} letter={item.value} state={item.state} key={uuid()}></Circle>
        ))}
      </div>
    </SolutionLayout>
  )
}
