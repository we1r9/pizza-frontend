import { Plus } from 'lucide-react'

import styles from './styles.module.css'

export const PizzaCard = ({
  pizza,
  onClick,
  selectedPizzaCount
}) => {

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
