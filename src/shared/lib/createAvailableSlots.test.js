import { describe, it, expect } from 'vitest'
import { createAvailableSlots } from './createAvailableSlots'

describe('createAvailableSlots', () => {
  it('генерирует слоты с корректными id', () => {
    const slots = createAvailableSlots(new Date('2025-06-15'))
    expect(slots[slots.length - 1].id).toBe('15-06-2025-20:00')
  })

  it('генерирует корректное кол-во слотов', () => {
    const slots = createAvailableSlots(new Date('2025-06-15'))
    expect(slots).toHaveLength(41)
  })

  it('проверяет, что все слоты по умолчанию не забронированы и не выключены пиццамейкером для отображения', () => {
    const slots = createAvailableSlots(new Date('2025-06-15'))
    expect(slots.every(slot => slot.booked === false)).toBe(true)
    expect(slots.every(slot => slot.enabled === true)).toBe(true)
  })
})
