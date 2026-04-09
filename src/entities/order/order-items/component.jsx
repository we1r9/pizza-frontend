import { formatIngredients } from "../../../shared/lib/formatIngredients"

import styles from './styles.module.css'

export const OrderItems = ({
  orderItems,
  handleRemoveItem,
  onDecreaseQuantity,
  onIncreaseQuantity
}) => {
  const totalCost = orderItems.reduce(
    (sum, orderItem) => sum + orderItem.price * orderItem.quantity, 0
  )

  return (
    <div>
      <div className={styles.totalRow}>
        <h2>Ваш заказ</h2>
        <h2 className={styles.totalCost}>
          Итого: {totalCost} ₽
        </h2>
      </div>

      {orderItems.map((item) => (
        <div
          key={item.id}
          className={styles.wrapper}
        >

          <div className={styles.imageWrapper}>
            <img
              src={item.image}
              className={styles.image}
              alt={item.name}
            />
          </div>

          <div className={styles.orderItem}>
            <h3 className={styles.orderItemTitle}>{item.name}</h3>

            {item.addedToppings.length > 0 && (
              <p className={styles.addedToppings}>
                Топпинги:{" "}
                <span>{formatIngredients(item.addedToppings)}</span>
              </p>
            )}

            {item.removedIngredients.length > 0 && (
              <p>
                Будет убрано из состава:{" "}
                <span className={styles.removedIngredients}>
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

          <div className={styles.quantityControls}>
            <button
              onClick={() => onDecreaseQuantity(item.id)}
            >-</button>
            <span>{item.quantity}</span>
            <button
              onClick={() => onIncreaseQuantity(item.id)}
            >+</button>
          </div>

          <button
            className={styles.removeItemButton}
            onClick={() => handleRemoveItem(item.id)}
          >
            x
          </button>
        </div>
      ))}
    </div>
  )
}
