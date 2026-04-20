import { formatDate } from '../../../shared/lib/formatDate'
import { getOrderStatusLabel } from '../../../shared/lib/getOrderStatusLabel'

import { X, Plus, Minus, Check } from 'lucide-react'

import styles from './styles.module.css'

export const OrdersList = ({
  orders,
  emptyText,
  orderView,
  setActiveView,
  setSelectedOrderId
}) => {
  if (!orders.length) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyText}>
          {emptyText}
        </p>
        <span className={styles.emptyStateEmoji}>
          (•◡•)
        </span>
      </div>
    )
  }

  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.date]) {
      acc[order.date] = []
    }

    acc[order.date].push(order)
    return acc
  }, {})

  return (
    <main className={styles.main}>
      {Object.entries(groupedOrders).map(([date, ordersByDate]) => (
        <section key={date} className={styles.orderSection}>
          <h2 className={styles.dateTitle}>
            {formatDate(date)}
          </h2>

          {ordersByDate.map((order) => (
            <article
              type="button"
              key={order.id}
              className={styles.orderWrapper}
              onClick={() => {
                setActiveView(orderView)
                setSelectedOrderId(order.id)
              }}
            >
              <div className={styles.orderHeader}>
                <div className={styles.orderInfo}>
                  <div className={styles.orderTitle}>
                    <span className={styles.orderNumberBadge}>
                      № {order.orderNumber}
                    </span>

                    <div className={styles.orderStatusRow}>
                      <span
                        className={`
                          ${styles.orderStatusBadge}
                          ${order.status === 'ready'
                            ? styles.orderStatusReady
                            : order.status === 'completed'
                              ? styles.orderStatusCompleted
                              : styles.orderStatusPending
                          }
                        `}
                      >
                        {getOrderStatusLabel(order.status)}
                      </span>
                    </div>
                  </div>

                  <span className={styles.orderTimeBadge}>
                    {order.time}
                  </span>
                </div>

                <strong>
                  {order.totalCost.toLocaleString('ru-RU').replace(/\s/g, '\u202F')} ₽
                </strong>
              </div>

              <div>
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

                      <span>
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

              <div className={styles.orderFooter}>
                <div
                  className={`
                    ${styles.paymentStatusBadge}
                    ${order.paymentStatus === 'paid'
                      ? styles.paymentStatusPaid
                      : styles.paymentStatusUnpaid}
                  `}
                >
                  {order.paymentStatus === 'paid' ? (
                    <span className={styles.paymentStatusContent}>
                      <Check size={14} strokeWidth={2.5} />
                      Оплачено
                    </span>
                  ) : (
                    <span className={styles.paymentStatusContent}>
                      <X size={14} strokeWidth={2.5} />
                      Не оплачено
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
      ))}
    </main>
  )
}
