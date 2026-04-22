import { Minus, Plus } from 'lucide-react'

import styles from './styles.module.css'

export const OrderItems = ({
  orderItems,
  onDecreaseQuantity,
  onIncreaseQuantity
}) => {

  return (
    <div>
      {orderItems.map((item) => (
        <article key={item.id}>
          <div className={styles.itemWrapper}>
            <div className={styles.imageWrapper}>
              <img
                src={item.roundedImage}
                className={styles.image}
                alt={item.name} />
            </div>

            <div className={styles.itemBody}>
              <div className={styles.itemMain}>
                <h3 className={styles.itemTitle}>{item.name}</h3>

                <div className={styles.modifiers}>
                  {item.addedToppings.length > 0 && (
                    <p className={styles.changes}>
                      <Plus size={13} strokeWidth={2} />
                      <span>
                        {item.addedToppings.map((topping) => topping.name).join(', ')}
                      </span>
                    </p>
                  )}

                  {item.removedIngredients.length > 0 && (
                    <p className={styles.changes}>
                      <Minus size={13} strokeWidth={2} />
                      <span>
                        {item.removedIngredients.join(', ')}
                      </span>
                    </p>
                  )}
                </div>

                <p className={styles.price}>
                  {(item.price * item.quantity).toLocaleString('ru-RU').replace(/\s/g, '\u202F')} ₽
                </p>
              </div>

              <div className={styles.quantityControlsWrapper}>
                <button
                  type='button'
                  className={styles.quantityButton}
                  onClick={() => onDecreaseQuantity(item.id)}>
                  <Minus size={18} strokeWidth={2} />
                </button>

                <span
                  key={item.quantity}
                  className={styles.quantityValue}>
                  {item.quantity}
                </span>

                <button
                  type='button'
                  className={styles.quantityButton}
                  onClick={() => onIncreaseQuantity(item.id)}>
                  <Plus size={18} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          <hr className={styles.divider} />
        </article>
      ))}
    </div>
  )
}
