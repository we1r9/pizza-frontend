import { Minus, Plus, X } from 'lucide-react'

import styles from './styles.module.css'

export const OrderedItems = ({ orderItems }) => {

  return (
    <div className={styles.itemsList}>
      {orderItems.map((item) => (
        <article key={item.id}>
          <div className={styles.itemWrapper}>
            <div className={styles.imageWrapper}>
              <img
                src={item.image}
                className={styles.image}
                alt={item.name} />
            </div>

            <div className={styles.itemBody}>
              <div className={styles.itemMain}>
                <h3 className={styles.itemTitle}>{item.name}</h3>

                {(item.addedToppings.length > 0 || item.removedIngredients.length > 0) && (
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
                )}
              </div>

              <div className={styles.itemMeta}>
                <span className={styles.price}>
                  {(item.price * item.quantity).toLocaleString('ru-RU').replace(/\s/g, '\u202F')} ₽
                </span>
                
                <span className={styles.quantity}>
                  <X size={12} strokeWidth={2} />
                  {item.quantity}
                </span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
