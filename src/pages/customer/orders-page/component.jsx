import { formatDate } from "../../../shared/lib/formatDate"

import styles from './styles.module.css'

export const OrdersPage = ({
  setCurrentStep,
  orders,
  setOrders,
  setSelectedOrder
}) => {

  return (
    <div>
      <div className={styles.actionsRow}>
        <button
          onClick={() => setCurrentStep('slot')}
        >
          ← Назад
        </button>

        <button
          onClick={() => setOrders([])}
        >
          Очистить
        </button>
      </div>

      {!orders.length ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyStateTitle}>Тут пока что пусто</span>
          <span className={styles.emptyStateEmoji}>{'(ಠ‿ಠ)'}</span>
        </div>
      ) : (
        <div className={styles.orderWrapper}>
          <h2>Заказы</h2>

          <div className={styles.ordersWrapper}>
            {orders.map((order) => (
              <div
                key={order.id}
                className={styles.orderContainer}
                onClick={() => {
                  setCurrentStep('order-details')
                  setSelectedOrder(order)
                }}
              >
                <h4 className={styles.orderNumber}>№{order.orderNumber}</h4>

                <div className={styles.orderDateInfo}>
                  <span>
                    {formatDate(order.date)}
                  </span>
                  <span> • </span>
                  <span>
                    {order.time}
                  </span>
                </div>

                <hr />

                <div className={styles.orderImages}>
                  {order.items.map((item) => (
                    <div key={item.id} className={styles.orderImageWrapper}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className={styles.orderImage}
                      />
                    </div>
                  ))}
                </div>

                <hr />

                <div className={styles.totalCostRow}>
                  <h4 className={styles.totalCostTitle}>Сумма</h4>
                  <h4 className={styles.totalCost}>{order.totalCost} ₽</h4>
                </div>

                <hr />

                <div className={styles.statusRow}>
                  <span className={styles.orderStatus}>
                    {order.status === 'new' && 'Принят в работу'}
                    {order.status === 'in_progress' && 'Готовится'}
                    {order.status === 'ready' && 'Готов к выдаче'}
                    {order.status === 'completed' && 'Выдан'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
