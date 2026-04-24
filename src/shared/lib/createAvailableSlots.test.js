import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createAvailableSlots } from './createAvailableSlots'

describe('createAvailableSlots', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-06-15T12:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('генерирует слоты с корректными id', () => {
    const slots = createAvailableSlots(new Date('2025-06-15'))
    expect(slots[slots.length - 1].id).toBe('15-06-2025-20:00')
  })

  it('корректно помечает истекшие и неистекшие слоты', () => {
    const slots = createAvailableSlots(new Date('2025-06-15'))
    const slot10_00 = slots.find(slot => slot.time === '10:00')
    const slot13_00 = slots.find(slot => slot.time === '13:00')
    expect(slot10_00.expired).toBe(true)
    expect(slot13_00.expired).toBe(false)
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
