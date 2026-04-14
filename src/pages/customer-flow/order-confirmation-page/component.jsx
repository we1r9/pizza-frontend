import { OrderItems } from "../../../entities/order/order-items/component"
import { SelectedSlotInfo } from "../../../entities/slot/selected-slot-info/component"
import { getBookingInfo } from "../../../shared/lib/getBookingInfo"

import styles from './styles.module.css'

export const OrderConfirmationPage = ({
  chosenDay,
  selectedSlotId,
  selectedSlotTime,
  orderItems,
  setOrderItems,
  setOrderComment,
  setCurrentStep
}) => {
  const handleRemoveItem = (id) => {
    setOrderItems((prev) => prev.filter((orderItem) => orderItem.id !== id))
  }

  const onDecreaseQuantity = (id) => {
    setOrderItems((prev) => {
      const target = prev.find((orderItem) => orderItem.id === id)

      if (!target) return prev

      if (target.quantity === 1) {
        return prev.filter((orderItem) => orderItem.id !== id)
      }

      return prev.map((orderItem) =>
        orderItem.id === id
          ? { ...orderItem, quantity: orderItem.quantity - 1 }
          : orderItem
      )
    })
  }

  const onIncreaseQuantity = (id) => {
    setOrderItems((prev) =>
      prev.map((orderItem) =>
        orderItem.id === id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      )
    )
  }

  if (!orderItems.length) {
    return (
      <div className={styles.emptyState}>
        <h2>Корзина пуста</h2>

        <button onClick={() => setCurrentStep('pizza')}>
          ← Вернуться к выбору пицц
        </button>
      </div>
    )
  }

  const bookingInfo = getBookingInfo(orderItems, chosenDay, selectedSlotId)

  return (
    <div>
      <button
        onClick={() => setCurrentStep('pizza')}>
        ← Назад
      </button>

      <h3>Дата и время заказа:</h3>
      <SelectedSlotInfo
        chosenDay={chosenDay}
        selectedSlotTime={selectedSlotTime}
      />

      <OrderItems
        orderItems={orderItems}
        handleRemoveItem={handleRemoveItem}
        onDecreaseQuantity={onDecreaseQuantity}
        onIncreaseQuantity={onIncreaseQuantity}
      />

      <div className={styles.commentSection}>
        <label className={styles.commentLabel}>Комментарий к заказу</label>

        <textarea
          className={styles.commentTextarea}
          placeholder="Например: порезать на 6 кусочков"
          onChange={(e) => setOrderComment(e.target.value)}
        />
      </div>

      <div className={styles.actionsRow}>
        <button
          onClick={() => setCurrentStep('pizza')}
          className={styles.addMoreButton}
        >
          Добавить еще
        </button>

        <button
          onClick={() => setCurrentStep('payment')}
          disabled={!bookingInfo.canBook}
          className={styles.confirmOrderButton}>
          К оплате →
        </button>
      </div>

      {!bookingInfo.canBook && (
        <div className={styles.canNotBook}>
          <span>
            Максимальное количество пицц на выбранный слот: <span>{bookingInfo.maxPizzasCount}</span>
          </span>
        </div>
      )}
    </div>
  )
}
