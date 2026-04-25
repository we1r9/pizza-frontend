import { formatDate } from "@/shared/lib/formatDate"
import { getOrderStatusLabel } from "@/shared/lib/getOrderStatusLabel"

import { Check, X } from 'lucide-react'

import styles from './styles.module.css'

export const OrderOverview = ({
  order,
  showOrderStatus = true
}) => {
  return (
    <section className={styles.infoSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.orderNumber}>
          Заказ №{order.orderNumber}
        </h2>

        <p className={styles.summary}>
          <span className={styles.summaryLabel}>
            Итого:
          </span>

          <strong>
            {order.totalCost.toLocaleString('ru-RU').replace(/\s/g, '\u202F')} ₽
          </strong>
        </p>
      </div>

      <div className={styles.dateTimeWrapper}>
        <span className={styles.dateTimePill}>
          {formatDate(order.date)}
        </span>

        <span className={styles.dateTimePill}>
          {order.time}
        </span>
      </div>

      <div className={styles.metaRow}>
        {showOrderStatus && (
          <div
            className={`
              ${styles.metaBadge}
              ${order.status === 'ready'
                ? styles.metaBadgeReady
                : order.status === 'completed'
                  ? styles.metaBadgeCompleted
                  : styles.metaBadgePending}
            `}
          >
            <span className={styles.metaLabel}>
              Статус заказа
            </span>

            <span className={styles.metaValue}>
              {getOrderStatusLabel(order.status)}
            </span>
          </div>
        )}

        <div
          className={`
            ${styles.metaBadge}
            ${order.paymentStatus === 'paid'
              ? styles.metaBadgePaid
              : styles.metaBadgeUnpaid
            }
          `}
        >
          <span className={styles.metaLabel}>
            Статус оплаты
          </span>

          {order.paymentStatus === 'paid' ? (
            <span className={styles.metaValueWithIcon}>
              <Check size={14} strokeWidth={2.5} />
              Оплачено
            </span>
          ) : (
            <span className={styles.metaValueWithIcon}>
              <X size={14} strokeWidth={2.5} />
              Не оплачено
            </span>
          )}
        </div>

        <div className={styles.metaBadge}>
          <span className={styles.metaLabel}>
            Способ оплаты
          </span>

          <span className={styles.metaValue}>
            {order.paymentMethod === 'card' ? 'Картой онлайн' : 'При получении'}
          </span>
        </div>
      </div>
    </section>
  )
}
