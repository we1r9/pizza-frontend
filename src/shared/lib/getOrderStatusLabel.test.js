import { describe, it, expect } from 'vitest'
import { getOrderStatusLabel } from './getOrderStatusLabel'

describe('getOrderStatusLabel', () => {
  it('возвращает корректный лейбл для каждого статуса', () => {
    expect(getOrderStatusLabel('new')).toBe('Новый')
    expect(getOrderStatusLabel('in_progress')).toBe('Готовится')
    expect(getOrderStatusLabel('ready')).toBe('Готов')
    expect(getOrderStatusLabel('completed')).toBe('Выдан')
  })

  it('возвращает пустую строку для неизвестного статуса', () => {
    expect(getOrderStatusLabel('unknown')).toBe('')
  })
})
