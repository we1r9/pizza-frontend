import { useAppContext } from "../../../app/context"
import { formatDate } from "../../../shared/lib/formatDate"

import { ArrowLeft } from "lucide-react"

import styles from './styles.module.css'

export const OrdersPage = ({
  setCurrentStep,
  setSelectedOrder
}) => {
  const { orders } = useAppContext()
  const sortedOrders = [...orders].reverse()

  return (
    <>
      <header>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => setCurrentStep('slot')}
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Назад
        </button>
      </header>

      {!orders.length ? (
        <main className={styles.emptyState}>
          <p className={styles.emptyStateTitle}>
            Тут пока что пусто
          </p>

          <p className={styles.emptyStateText}>
            Здесь появятся Ваши заказы
          </p>

          <span
            aria-hidden="true"
            className={styles.emptyStateEmoji}
          >
            {'(•◡•)'}
          </span>
        </main>
      ) : (
        <main className={styles.orders}>
          <h1 className={styles.title}>
            Мои заказы
          </h1>

          <div className={styles.ordersWrapper}>
            {sortedOrders.map((order) => (
              <article
                role="button"
                key={order.id}
                tabIndex={0}
                className={styles.orderContainer}
                onClick={() => {
                  setCurrentStep('order-details')
                  setSelectedOrder(order)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setCurrentStep('order-details')
                    setSelectedOrder(order)
                  }
                }}
              >
                <p className={styles.orderNumber}>
                  №{order.orderNumber}
                </p>

                <div className={styles.orderDateTimeInfo}>
                  <span>
                    {formatDate(order.date)}
                  </span>
                  <span aria-hidden="true"> • </span>
                  <span>
                    {order.time}
                  </span>
                </div>

                <hr />

                <div className={styles.orderImages}>
                  {order.items.map((item) => (
                    <div key={item.id} className={styles.orderImageWrapper}>
                      <img
                        src={item.roundedImage}
                        alt={item.name}
                        className={styles.orderImage} />
                    </div>
                  ))}
                </div>

                <hr />

                <div className={styles.totalCostRow}>
                  <p className={styles.totalCostTitle}>
                    Сумма
                  </p>

                  <p className={styles.totalCost}>
                    {order.totalCost.toLocaleString('ru-RU').replace(/\s/g, '\u202F')} ₽
                  </p>
                </div>

                <hr />

                <div className={styles.orderStatusRow}>
                  <span
                    className={`
                      ${styles.orderStatusBadge}
                      ${order.status === 'ready'
                        ? styles.orderStatusReady
                        : order.status === 'completed'
                          ? styles.orderStatusCompleted
                          : styles.orderStatusPending}
                    `}
                  >
                    {order.status === 'new' && 'Принят в работу'}
                    {order.status === 'in_progress' && 'Готовится'}
                    {order.status === 'ready' && 'Готов'}
                    {order.status === 'completed' && 'Выдан'}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </main>
      )}
    </>
  )
}
