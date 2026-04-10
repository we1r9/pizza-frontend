import { OrderedItems } from '../../../entities/order/ordered-items/component'
import { SelectedSlotInfo } from '../../../entities/slot/selected-slot-info/component'

import styles from './styles.module.css'

export const SuccessPage = ({
  setCurrentStep,
  orderDays,
  selectedSlotTime,
  activeSlotIndex,
  orderItems,
  paymentMethod
}) => {
  const totalCost = orderItems.reduce(
    (sum, orderItem) => sum + orderItem.price * orderItem.quantity, 0
  )

  return (
    <div className={styles.successPage}>
      <h2 className={styles.successTitle}>🎉 Заказ оформлен</h2>

      <h3 className={styles.orderDateTitle}>Дата и время заказа</h3>
      <SelectedSlotInfo
        orderDays={orderDays}
        selectedSlotTime={selectedSlotTime}
        activeSlotIndex={activeSlotIndex}
        className={styles.selectedSlotInfo}
      />

      <OrderedItems orderItems={orderItems} />

      <h3 className={styles.summaryRow}>
        Итого: {totalCost} ₽
      </h3>

      <div className={styles.paymentStatus}>
        {paymentMethod === 'card'
          ? '✅ Оплачено картой'
          : '💵 Оплата при получении'}
      </div>

      <div className={styles.actionsRow}>
        <button
          onClick={() => setCurrentStep('slot')}
        >
          + Новый заказ
        </button>
        <button
          onClick={() => setCurrentStep('orders')}
        >
          Мои заказы →
        </button>
      </div>
    </div>
  )
}
