import { Plus } from 'lucide-react'

import styles from './styles.module.css'

interface Topping {
  id: string
  name: string
  price: number
  weight: number
}

interface Pizza {
  id: string
  name: string
  price: number
  weight: number
  image: string
  ingredients: string[]
  removableIngredients: string[]
  toppings: Topping[]
}

interface PizzaCardProps {
  pizza: Pizza
  onClick: () => void
  selectedPizzaCount: number
}

export const PizzaCard = ({
  pizza,
  onClick,
  selectedPizzaCount,
}: PizzaCardProps) => {
  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.imageButton}
        onClick={onClick}
      >
        <img
          src={pizza.image}
          className={styles.image}
          alt={pizza.name}
          loading="eager"
        />

        <span className={styles.addButton}>
          {selectedPizzaCount > 0 ? selectedPizzaCount : <Plus size='1em' strokeWidth={2.5} />}
        </span>
      </button>

      <h3 className={styles.name}>{pizza.name}</h3>
      <p className={styles.price}>{pizza.price} ₽</p>
      <p className={styles.weight}>{pizza.weight} г</p>
    </article>
  )
}
