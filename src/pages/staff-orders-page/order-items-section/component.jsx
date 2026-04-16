import styles from './styles.module.css'
import sharedStyles from '../shared-styles.module.css'

export const OrderItemsSection = ({
  order
}) => {
  
  return (
    <section className={sharedStyles.section}>
      <h3 className={sharedStyles.sectionTitle}>Товары в заказе</h3>

      <div className={styles.itemsList}>
        {order.items.map((item) => (
          <div
            key={item.id}
            className={styles.itemCard}
          >
            <div className={styles.itemHeader}>
              <strong className={styles.itemName}>
                {item.name} × {item.quantity}
              </strong>

              <span className={styles.itemPrice}>
                {item.price * item.quantity} ₽
              </span>
            </div>

            {item.addedToppings?.length > 0 && (
              <p className={styles.itemMeta}>
                Добавки: {item.addedToppings.join(', ')}
              </p>
            )}

            {item.removedIngredients?.length > 0 && (
              <p className={styles.itemMeta}>
                Без: {item.removedIngredients.join(', ')}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
