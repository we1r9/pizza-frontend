import { describe, it, expect } from 'vitest'
import { formatIngredients } from './formatIngredients'

describe('formatIngredients', () => {
  it('соединяет ингредиенты через запятую и ставит точку в конце', () => {
    expect(formatIngredients(['моцарелла', 'ветчина', 'томаты']))
      .toBe('моцарелла, ветчина, томаты.')
  })

  it('корректно обрабатывает один ингредиент', () => {
    expect(formatIngredients(['моцарелла']))
      .toBe('моцарелла.')
  })
})
