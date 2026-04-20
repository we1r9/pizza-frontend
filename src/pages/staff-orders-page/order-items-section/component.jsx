import { X, Plus, Minus } from 'lucide-react'

import styles from './styles.module.css'
import sharedStyles from '../shared-styles.module.css'

export const OrderItemsSection = ({ order }) => {
  return (
    <section className={sharedStyles.section}>
      <h2 className={sharedStyles.sectionTitle}>
        Товары в заказе
      </h2>

      <div className={styles.itemsList}>
        {order.items.map((item) => (
          <div
            key={item.id}
            className={styles.orderItem}>
            <div className={styles.orderItemRow}>
              <div className={styles.itemTitle}>
                <span>{item.name}</span>

                <X size={12} strokeWidth={2} />

                <span>{item.quantity}</span>
              </div>

              <span className={styles.itemPrice}>
                {(item.price * item.quantity).toLocaleString('ru-RU').replace(/\s/g, '\u202F')} ₽
              </span>
            </div>

            {item.addedToppings?.length > 0 && (
              <div className={styles.orderItemMeta}>
                <Plus size={12} strokeWidth={2} />

                {item.addedToppings.map((topping) => topping.name).join(', ')}
              </div>
            )}

            {item.removedIngredients?.length > 0 && (
              <div className={styles.orderItemMeta}>
                <Minus size={12} strokeWidth={2} />

                {item.removedIngredients.join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
