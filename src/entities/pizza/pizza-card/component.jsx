import styles from './styles.module.css'

export const PizzaCard = ({
  pizza,
  onClick
}) => {
  return (
    <div>
      <div
        className={styles.imageWrapper}
        onClick={onClick}
      >
        <img
          src={pizza.image}
          className={styles.image}
          alt={pizza.name}
        />
        <button className={styles.addButton}>+</button>
      </div>

      <h4 className={styles.price}>{pizza.price}₽</h4>

      <p className={styles.name}>{pizza.name}</p>

      <p className={styles.weight}>{pizza.weight} г</p>
    </div>
  )
}
