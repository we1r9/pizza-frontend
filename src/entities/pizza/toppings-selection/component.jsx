export const ToppingsSelection = ({
  toppings,
  addedToppings,
  setAddedToppings
}) => {

  const handleToppingChange = (topping, checked) => {
    if (checked && !addedToppings.includes(topping)) {
      setAddedToppings((prev) => [...prev, topping])
      return
    }

    setAddedToppings((prev) => (
      prev.filter((item) => item !== topping)
    ))
  }

  return (
    <div>
      {toppings.map((topping) => (
        <div key={topping}>
          <input
            onChange={(event) => handleToppingChange(topping, event.target.checked)}
            id={topping}
            type="checkbox"
            checked={addedToppings.includes(topping)}
          />

          <label htmlFor={topping}>{topping}</label>
        </div>
      ))}
    </div>
  )
}
