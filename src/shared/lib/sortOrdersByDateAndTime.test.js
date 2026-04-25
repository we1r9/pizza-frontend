import { describe, it, expect } from 'vitest'
import { sortOrdersByDateAndTime } from './sortOrdersByDateAndTime'

const createOrder = (id, date, time) => ({ id, date, time })

describe('sortOrdersByDateAndTime', () => {
  it('корректно сортирует заказы по дате по возрастанию', () => {
    const orders = [
      createOrder('a', '2025-06-13', '12:00'),
      createOrder('b', '2025-06-15', '12:00')
    ]

    const result = sortOrdersByDateAndTime(orders, 'asc')

    expect(result[0].id).toBe('a')
    expect(result[1].id).toBe('b')
  })

  it('корректно сортирует заказы по дате по убыванию', () => {
    const orders = [
      createOrder('a', '2025-06-13', '12:00'),
      createOrder('b', '2025-06-15', '12:00')
    ]

    const result = sortOrdersByDateAndTime(orders, 'desc')

    expect(result[0].id).toBe('b')
    expect(result[1].id).toBe('a')
  })

  it('корректно сортирует заказы при одинаковой дате по времени по возрастанию', () => {
    const orders = [
      createOrder('a', '2025-06-15', '10:00'),
      createOrder('b', '2025-06-15', '14:00')
    ]

    const result = sortOrdersByDateAndTime(orders, 'asc')

    expect(result[0].id).toBe('a')
    expect(result[1].id).toBe('b')
  })

  it('корректно сортирует заказы при одинаковой дате по времени по убыванию', () => {
    const orders = [
      createOrder('a', '2025-06-15', '10:00'),
      createOrder('b', '2025-06-15', '14:00')
    ]

    const result = sortOrdersByDateAndTime(orders, 'desc')

    expect(result[0].id).toBe('b')
    expect(result[1].id).toBe('a')
  })

  it('сортировка по умолчанию – по возрастанию', () => {
    const orders = [
      createOrder('a', '2025-06-13', '12:00'),
      createOrder('b', '2025-06-15', '12:00')
    ]

    const result = sortOrdersByDateAndTime(orders)

    expect(result[0].id).toBe('a')
  })
})
