import { formatDate } from '../../../shared/lib/formatDate'
import { getOrderStatusLabel } from '../../../shared/lib/getOrderStatusLabel'

import styles from './styles.module.css'

export const OrdersList = ({
  orders,
  emptyText,
  orderView,
  setActiveView,
  setSelectedOrderId
}) => {
  if (!orders.length) {
    return <p>{emptyText}</p>
  }

  const isCompletedView = orderView === 'completed-order'

  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.date]) {
      acc[order.date] = []
    }

    acc[order.date].push(order)
    return acc
  }, {})

  return (
    <div>
      {Object.entries(groupedOrders).map(([date, ordersByDate]) => (
        <div key={date}>
          <h3>{formatDate(date)}</h3>

          {ordersByDate.map((order) => (
            <div
              key={order.id}
              className={`${styles.orderWrapper} ${isCompletedView ? styles.orderWrapperCompleted : ''}`}
              onClick={() => {
                setActiveView(orderView)
                setSelectedOrderId(order.id)
              }}
            >
              <div className={styles.orderHeader}>
                <div>
                  <div className={styles.orderTitle}>
                    <span className={styles.orderNumber}>Заказ №{order.orderNumber}</span>

                    <span>•</span>

                    <span className={`${styles.orderStatus} ${isCompletedView ? styles.orderStatusCompleted : ''}`}>
                      {getOrderStatusLabel(order.status)}
                    </span>
                  </div>
                  <p className={`${styles.orderTime} ${isCompletedView ? styles.orderTimeCompleted : ''}`}>
                    {order.time}
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
                    className={`${styles.orderItem} ${isCompletedView ? styles.orderItemCompleted : ''}`}
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

              <div className={`${styles.orderFooter} ${isCompletedView ? styles.orderFooterCompleted : ''}`}>
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
      ))}
    </div>
  )
}
