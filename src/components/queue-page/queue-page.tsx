import style from './queue-page.module.css'
import { ChangeEvent, useState } from 'react'

import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { ElementStates } from '../../types/element-states'

import { delay } from '../../utils/functions'
import { v4 as uuid } from 'uuid'
import { Queue } from './Queue'

export const QueuePage: React.FC = () => {
  const [value, setValue] = useState('')
  const [queue] = useState(new Queue<string>(7))
  const [, update] = useState({})

  const data = queue.getData

  const addToQueue = (value: string) => {
    const neededIndex = data.tail + 1
    if (neededIndex < queue.size) {
      queue.changeStateByIndex(neededIndex, ElementStates.Changing)
      update({})
      delay(400).then(() => {
        queue.enqueue(value)
        update({})
      })
    } else {
      throw new Error('Out of queue')
    }
  }

  const removeFromQueue = () => {
    if (data.head < queue.size && data.container[data.head].value !== null) {
      queue.changeStateByIndex(data.head, ElementStates.Changing)
      update({})
      delay(400).then(() => {
        queue.dequeue()
        update({})
      })
    } else {
      throw new Error('No elements in the queue')
    }
  }

  const checkHead = (i: number, item: { value: string | null; state: ElementStates }) => {
    // Если голова последний элемент, проверка на контент не нужна
    if (data.head === data.container.length - 1 && i === data.head) {
      return 'head'
    }
    // В противном случае смотрим по индексу и контенту
    return i === data.head && item.value !== null ? 'head' : ''
  }

  return (
    <SolutionLayout title="Очередь">
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
            disabled={!value}
            onClick={() => {
              addToQueue(value)
              setValue('')
            }}
          ></Button>
          <Button text="Удалить" onClick={() => removeFromQueue()}></Button>
        </div>
        <Button
          text="Очистить"
          onClick={() => {
            queue.reset()
            update({})
          }}
        ></Button>
      </form>
      <div className={style.display}>
        {data.container.map((item, i) => (
          <Circle
            head={`${checkHead(i, item)}`}
            tail={i === data.tail && item.value !== null ? 'tail' : ''}
            letter={item.value ? item.value : ''}
            index={i}
            state={item.state}
            key={uuid()}
          ></Circle>
        ))}
      </div>
    </SolutionLayout>
  )
}
