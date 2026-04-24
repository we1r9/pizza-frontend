import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { isSlotExpired } from './isSlotExpired'

describe('isSlotExpired', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-06-15T12:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('возвращает true, если слот истек по времени', () => {
    expect(isSlotExpired('2025-06-15', '11:00')).toBe(true)
  })

  it('возвращает false, если слот не истек по времени', () => {
    expect(isSlotExpired('2025-06-15', '13:00')).toBe(false)
  })
})
