import { formatDate } from "../../../shared/lib/formatDate"
import { getOrderStatusLabel } from "../../../shared/lib/getOrderStatusLabel"

import styles from './styles.module.css'

export const OrderOverview = ({
  order,
  showOrderStatus = true
}) => {
  
  return (
    <section className={styles.orderInfoBlock}>
      <div className={styles.orderTop}>
        <div>
          <h2 className={styles.orderNumber}>Заказ №{order.orderNumber}</h2>
          <p className={styles.orderDateTime}>
            {formatDate(order.date)} • {order.time}
          </p>
        </div>

        <div className={styles.summaryBlock}>
          <p className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Итого:</span>
            <strong>{order.totalCost} ₽</strong>
          </p>
        </div>
      </div>

      <div className={`${styles.metaGrid} ${!showOrderStatus ? styles.metaGridTwoColumns : ''}`}>
        {showOrderStatus && (
          <div className={styles.metaCard}>
            <span className={styles.metaLabel}>Статус заказа</span>
            <span>{getOrderStatusLabel(order.status)}</span>
          </div>
        )}

        <div className={styles.metaCard}>
          <span className={styles.metaLabel}>Статус оплаты</span>
          <span>
            {order.paymentStatus === 'paid' ? '✅ Оплачено' : '❌ Не оплачено'}
          </span>
        </div>

        <div className={styles.metaCard}>
          <span className={styles.metaLabel}>Способ оплаты</span>
          <span>
            {order.paymentMethod === 'card' ? 'Картой онлайн' : 'При получении'}
          </span>
        </div>
      </div>
    </section>
  )
}
