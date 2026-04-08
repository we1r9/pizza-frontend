import { formatIngredients } from "../../../shared/lib/formatIngredients"

export const RemovableIngredients = ({
  removableIngredients,
  removedIngredients,
  setRemovedIngredients
}) => {

  const handleIngredientChange = (ingredient, checked) => {
    if (checked && !removedIngredients.includes(ingredient)) {
      setRemovedIngredients((prev) => [...prev, ingredient])
      return
    }

    setRemovedIngredients((prev) => (
      prev.filter((item) => item !== ingredient)
    ))

  }
  return (
    <div>
      {removableIngredients.map((ingredient) => (
        <div key={ingredient}>
          <input
            onChange={(event) =>
              handleIngredientChange(ingredient, event.target.checked)
            }
            id={ingredient}
            type="checkbox"
            checked={removedIngredients.includes(ingredient)}
          />

          <label htmlFor={ingredient}>{ingredient}</label>
        </div>
      ))}

      <div>
        {removedIngredients.length > 0 && (
          <p>
            Будет убрано из состава:{" "}
            <span style={{ textDecoration: "underline" }}>
              {formatIngredients(removedIngredients)}
            </span>
          </p>
        )}
      </div>
    </div>
  )
}
