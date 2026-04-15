import { formatDate } from '../../../shared/lib/formatDate'
import styles from './styles.module.css'

export const CurrentOrders = ({
  orders,
  setActiveView,
  setSelectedOrderId
}) => {
  if (!orders.length) {
    return <p>Сейчас нет активных заказов</p>
  }

  return (
    <div>
      {orders.map((order) => (
        <div
          key={order.id}
          className={styles.orderWrapper}
          onClick={() => {
            setActiveView('current-order')
            setSelectedOrderId(order.id)
          }}
        >
          <div className={styles.orderHeader}>
            <div>
              <div className={styles.orderTitle}>
                <span className={styles.orderNumber}>Заказ №{order.orderNumber}</span>

                <span>•</span>

                <span className={styles.orderStatus}>
                  {order.status === 'new' && 'Новый'}
                  {order.status === 'in_progress' && 'Готовится'}
                  {order.status === 'ready' && 'Готов к выдаче'}
                  {order.status === 'completed' && 'Выдан'}
                </span>
              </div>
              <p className={styles.orderDateTime}>
                {formatDate(order.date)} • {order.time}
              </p>
            </div>

            <div>
              <strong>{order.totalCost} ₽</strong>
            </div>
          </div>

          <div>
            {order.items.map((item) => (
              <div
                key={item.id}
                className={styles.orderItem}
              >
                <div className={styles.orderItemRow}>
                  <span>{item.name} × {item.quantity}</span>
                  <span>{item.price * item.quantity} ₽</span>
                </div>

                {item.removedIngredients?.length > 0 && (
                  <p className={styles.orderItemMeta}>
                    Без: {item.removedIngredients.join(', ')}
                  </p>
                )}

                {item.addedToppings?.length > 0 && (
                  <p className={styles.orderItemMeta}>
                    Добавки: {item.addedToppings.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className={styles.orderFooter}>
            {order.paymentMethod === 'card' ? (
              <span className={styles.paymentPaid}>
                ✅ Оплачено онлайн
              </span>
            ) : (
              <div className={styles.paymentCashBlock}>
                <span>Оплата: при получении</span>

                <span> • </span>

                {order.paymentStatus === 'paid' ? 'Оплачено ✅' : 'Не оплачено ❌'}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
