import { describe, it, expect } from 'vitest'
import { createDateString } from './createDateString'

describe('createDateString', () => {
  it('форматирует дату в строку формата yyyy-mm-dd', () => {
    expect(createDateString(new Date(2025, 5, 15))).toBe('2025-06-15')
  })

  it('добавляет ноль к однозначным месяцам и дням', () => {
    expect(createDateString(new Date(2025, 0, 5))).toBe('2025-01-05')
  })
})
