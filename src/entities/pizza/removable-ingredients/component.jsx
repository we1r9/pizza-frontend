import { capitalize } from '@/shared/lib/capitalize'

import { X } from 'lucide-react'

import styles from './styles.module.css'

export const RemovableIngredients = ({
  removableIngredients,
  removedIngredients,
  setRemovedIngredients
}) => {
  const handleToggleIngredient = (ingredient) => {
    const isRemoved = removedIngredients.includes(ingredient)

    if (isRemoved) {
      setRemovedIngredients((prev) =>
        prev.filter((item) => item !== ingredient)
      )
      return
    }

    setRemovedIngredients((prev) => [...prev, ingredient])
  }

  return (
    <div className={styles.ingredientsRow}>
      {removableIngredients.map((ingredient) => {
        const isRemoved = removedIngredients.includes(ingredient)

        return (
          <button
            type="button"
            aria-pressed={isRemoved}
            key={ingredient}
            className={`
              ${styles.ingredientPill}
              ${isRemoved && styles.removedIngredientPill}
            `}
            onClick={() => handleToggleIngredient(ingredient)}
          >
            <span className={styles.ingredientText}>
              {capitalize(ingredient)}
            </span>

            <span
              className={`${styles.removeIcon} ${isRemoved && styles.hidden}`}>
              <X size={14} strokeWidth={2.2} />
            </span>
          </button>
        )
      })}
    </div>
  )
}
