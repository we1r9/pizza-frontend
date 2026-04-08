import { formatIngredients } from "../../../shared/lib/formatIngredients"

import styles from './styles.module.css'

export const OrderItems = ({ orderItems }) => {
  return (
    <div>
      <div>
        {orderItems.length > 0 && (
          <h2>Ваш заказ</h2>
        )}
      </div>

      {orderItems.map((item) => (
        <div
          key={item.id}
          className={styles.wrapper}
        >

          <h3>{item.name}</h3>

          <div>
            {item.addedToppings.length > 0 && (
              <p>
                Топпинги:{" "}
                <span>{formatIngredients(item.addedToppings)}</span>
              </p>
            )}
          </div>

          <div>
            {item.removedIngredients.length > 0 && (
              <p>
                Будет убрано из состава:{" "}
                <span className={styles.removedIngredients}>
                  {formatIngredients(item.removedIngredients)}
                </span>
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
