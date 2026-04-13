export const formatIngredients = (ingredients) => {
  const result = []

  ingredients.map((ingredient, index) => (
    index < ingredients.length - 1
      ? result.push(`${ingredient}, `)
      : result.push(`${ingredient}.`)
  ))

  return result
}
