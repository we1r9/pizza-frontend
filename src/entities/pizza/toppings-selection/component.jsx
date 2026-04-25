import { capitalize } from '@/shared/lib/capitalize'

import styles from './styles.module.css'

export const ToppingsSelection = ({
  toppings,
  addedToppings,
  setAddedToppings
}) => {
  const handleToggleTopping = (topping) => {
    const isSelected = addedToppings.some((item) => item.id === topping.id)

    if (isSelected) {
      setAddedToppings((prev) =>
        prev.filter((item) => item.id !== topping.id)
      )
      return
    }

    setAddedToppings((prev) => [...prev, topping])
  }

  return (
    <div className={styles.toppingsRow}>
      {toppings.map((topping) => {
        const isSelected = addedToppings.some((item) => item.id === topping.id)

        return (
          <button
            type="button"
            aria-pressed={isSelected}
            key={topping.id}
            className={`
              ${styles.toppingPill}
              ${isSelected ? styles.selectedToppingPill : ''}
            `}
            onClick={() => handleToggleTopping(topping)}
          >
            <span className={styles.toppingName}>
              {capitalize(topping.name)}
            </span>

            <div className={styles.toppingsMeta}>
              <span>{topping.weight} г</span>
              <span>{topping.price} ₽</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
