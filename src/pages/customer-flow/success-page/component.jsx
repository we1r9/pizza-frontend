import { OrderedItems } from '../../../entities/order/ordered-items/component'
import { SelectedSlotInfo } from '../../../entities/slot/selected-slot-info/component'

import { Plus, ArrowRight } from 'lucide-react'

import styles from './styles.module.css'

export const SuccessPage = ({
  setCurrentStep,
  chosenDay,
  selectedSlotTime,
  orderItems,
  setPaymentMethod,
  setOrderItems,
  setOrderComment,
  setSelectedSlotId,
  setSelectedSlotTime
}) => {
  const totalCost = orderItems.reduce(
    (sum, orderItem) => sum + orderItem.price * orderItem.quantity, 0
  )

  const resetOrderFlow = () => {
    setPaymentMethod(null)
    setOrderItems([])
    setOrderComment('')
    setSelectedSlotId(null)
    setSelectedSlotTime(null)
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.pageTitle}>
        Заказ оформлен <span aria-hidden="true">🎉</span>
      </h1>

      <p className={styles.orderDateLabel}>Время получения заказа:</p>
      <SelectedSlotInfo
        chosenDay={chosenDay}
        selectedSlotTime={selectedSlotTime}
        className={styles.selectedSlotInfo} />

      <OrderedItems orderItems={orderItems} />

      <div className={styles.summaryRow}>
        <span>Итого</span>
        {totalCost} ₽
      </div>

      <div className={styles.actionsRow}>
        <button
          type="button"
          className={styles.actionButton}
          onClick={() => {
            resetOrderFlow()
            setCurrentStep('slot')
          }}
        >
          <Plus size={18} strokeWidth={2} />
          Новый заказ
        </button>

        <button
          type="button"
          className={styles.actionButton}
          onClick={() => {
            resetOrderFlow()
            setCurrentStep('orders')
          }}
        >
          Мои заказы
          <ArrowRight size={18} strokeWidth={2} />
        </button>
      </div>
    </main>
  )
}
