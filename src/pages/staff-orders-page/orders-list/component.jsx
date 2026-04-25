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
      <main className={styles.emptyState}>
        <p className={styles.emptyText}>
          {emptyText}
        </p>
        <span
          aria-hidden="true"
          className={styles.emptyStateEmoji}
        >
          (•◡•)
        </span>
      </main>
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
              role="button"
              key={order.id}
              tabIndex={0}
              className={styles.orderWrapper}
              onClick={() => {
                setActiveView(orderView)
                setSelectedOrderId(order.id)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveView(orderView)
                  setSelectedOrderId(order.id)
                }
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

                        <X size={12} strokeWidth={2} aria-hidden="true" />

                        <span>{item.quantity}</span>
                      </div>

                      <span>
                        {(item.price * item.quantity).toLocaleString('ru-RU').replace(/\s/g, '\u202F')} ₽
                      </span>
                    </div>

                    {item.addedToppings?.length > 0 && (
                      <div className={styles.orderItemMeta}>
                        <Plus size={12} strokeWidth={2} aria-hidden="true" />

                        {item.addedToppings.map((topping) => topping.name).join(', ')}
                      </div>
                    )}

                    {item.removedIngredients?.length > 0 && (
                      <div className={styles.orderItemMeta}>
                        <Minus size={12} strokeWidth={2} aria-hidden="true" />

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
                      <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                      Оплачено
                    </span>
                  ) : (
                    <span className={styles.paymentStatusContent}>
                      <X size={14} strokeWidth={2.5} aria-hidden="true" />
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
