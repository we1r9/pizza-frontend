import { OrderedItems } from '../../../entities/order/ordered-items/component'
import { formatDate } from '../../../shared/lib/formatDate'
import styles from './styles.module.css'

export const OrderDetailsPage = ({
  setCurrentStep,
  selectedOrder
}) => {
  return (
    <div>
      <button
        onClick={() => setCurrentStep('orders')}
      >
        ← Назад
      </button>

      <div className={styles.pageWrapper}>
        <h2 className={styles.orderNumber}>Заказ №{selectedOrder.orderNumber}</h2>

        <div className={styles.orderDateInfo}>
          <span>
            {formatDate(selectedOrder.date)}
          </span>
          <span> • </span>
          <span>
            {selectedOrder.time}
          </span>
        </div>

        <span className={styles.orderStatus}>
          {selectedOrder.status === 'new' && 'Принят в работу'}
          {selectedOrder.status === 'in_progress' && 'Готовится'}
          {selectedOrder.status === 'ready' && 'Готов к выдаче'}
          {selectedOrder.status === 'completed' && 'Выдан'}
        </span>

        <span className={styles.orderItemsTitle}>Товары в заказе</span>
        <OrderedItems orderItems={selectedOrder.items} />

        <span className={styles.orderSummary}>
          Итого: {selectedOrder.totalCost} ₽
        </span>

        <span className={styles.paymentStatus}>
          {selectedOrder.paymentMethod === 'card'
            ? '✅ Оплачено картой'
            : '💵 Оплата при получении'}
        </span>

        {selectedOrder.orderComment.length > 0 && (
          <div className={styles.orderComment}>
            <span className={styles.orderCommentLabel}>Комментарий</span>
            <p className={styles.orderCommentText}>{selectedOrder.orderComment}</p>
          </div>
        )}
      </div>
    </div>
  )
}
