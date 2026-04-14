import { OrderedItems } from '../../../entities/order/ordered-items/component'
import { SelectedSlotInfo } from '../../../entities/slot/selected-slot-info/component'

import styles from './styles.module.css'

export const SuccessPage = ({
  setCurrentStep,
  chosenDay,
  selectedSlotTime,
  orderItems,
  paymentMethod,
  setPaymentMethod,
  setOrderItems,
  setOrderComment,
  setSelectedSlotId,
  setSelectedSlotTime
}) => {
  const totalCost = orderItems.reduce(
    (sum, orderItem) => sum + orderItem.price * orderItem.quantity, 0
  )

  return (
    <div className={styles.successPage}>
      <h2 className={styles.successTitle}>🎉 Заказ оформлен</h2>

      <h3 className={styles.orderDateTitle}>Дата и время заказа</h3>
      <SelectedSlotInfo
        chosenDay={chosenDay}
        selectedSlotTime={selectedSlotTime}
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
          onClick={() => {
            setCurrentStep('slot')
            setPaymentMethod(null)
            setOrderItems([])
            setOrderComment('')
            setSelectedSlotId(null)
            setSelectedSlotTime(null)
          }}
        >
          + Новый заказ
        </button>
        <button
          onClick={() => {
            setCurrentStep('orders')
            setPaymentMethod(null)
            setOrderItems([])
            setOrderComment('')
            setSelectedSlotId(null)
            setSelectedSlotTime(null)
          }}
        >
          Мои заказы →
        </button>
      </div>
    </div>
  )
}
