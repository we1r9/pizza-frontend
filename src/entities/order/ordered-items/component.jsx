import { formatIngredients } from '../../../shared/lib/formatIngredients'
import styles from './styles.module.css'

export const OrderedItems = ({ orderItems }) => {
  return (
    <div className={styles.orderItems}>
      {orderItems.map((item) => (
        <div
          key={item.id}
          className={styles.orderedItemCard}
        >

          <div className={styles.imageWrapper}>
            <img
              src={item.image}
              className={styles.image}
              alt={item.name}
            />
          </div>

          <div className={styles.orderItem}>
            <h4 className={styles.orderItemTitle}>{item.name}</h4>

            {item.addedToppings.length > 0 && (
              <p className={styles.addedToppings}>
                Топпинги:{" "}
                <span>{formatIngredients(item.addedToppings)}</span>
              </p>
            )}

            {item.removedIngredients.length > 0 && (
              <p className={styles.removedIngredients}>
                Без:{" "}
                <span>
                  {formatIngredients(item.removedIngredients)}
                </span>
              </p>
            )}

            <p className={styles.price}>
              {item.price * item.quantity} ₽
              <span> • </span>
              <span>{item.quantity} шт</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
