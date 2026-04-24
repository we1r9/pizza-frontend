import { describe, it, expect, vi } from 'vitest'
import { getBookingInfo } from './getBookingInfo'

vi.mock('./isSlotExpired', () => ({
  isSlotExpired: () => false
}))

const createSlot = (id, overrides = {}) => ({
  id,
  time: '12:00',
  booked: false,
  enabled: true,
  ...overrides
})

const createDay = (slots) => ({
  date: '2025-06-15',
  availableSlots: slots
})

describe('getBookingInfo', () => {
  it('возвращает canBook: false, если день не выбран', () => {
    const result = getBookingInfo([], null, 'slot-1')
    expect(result.canBook).toBe(false)
  })

  it('возвращает canBook: false, если слот не найден', () => {
    const day = createDay([createSlot('slot-1')])
    const result = getBookingInfo([], day, 'slot-999')
    expect(result.canBook).toBe(false)
  })

  it('возвращает canBook: false, если слот забронирован', () => {
    const day = createDay([createSlot('slot-1', { booked: true })])
    const result = getBookingInfo([{ quantity: 1 }], day, 'slot-1')
    expect(result.canBook).toBe(false)
  })

  it('возвращает canBook: true для равного кол-ва желаемых пицц и кол-ва свободных слотов', () => {
    const day = createDay([createSlot('slot-1')])
    const result = getBookingInfo([{ quantity: 1 }], day, 'slot-1')
    expect(result.canBook).toBe(true)
    expect(result.maxPizzasCount).toBe(1)
  })

  it('возвращает canBook: false, если слотов меньше чем пицц', () => {
    const day = createDay([createSlot('slot-1')])
    const result = getBookingInfo([{ quantity: 2 }], day, 'slot-1')
    expect(result.canBook).toBe(false)
    expect(result.maxPizzasCount).toBe(1)
  })

  it('возвращает canBook: false, если слот отключен пиццамейкером для отображения', () => {
    const day = createDay([createSlot('slot-1', { enabled: false })])
    const result = getBookingInfo([{ quantity: 1 }], day, 'slot-1')
    expect(result.canBook).toBe(false)
  })
})
