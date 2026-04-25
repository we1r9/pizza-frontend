import { OrderItems } from "@/entities/order/order-items/component"
import { SelectedSlotInfo } from "@/entities/slot/selected-slot-info/component"
import { getBookingInfo } from "@/shared/lib/getBookingInfo"

import { ArrowLeft, Trash2 } from 'lucide-react'

import styles from './styles.module.css'

export const OrderConfirmationPage = ({
  chosenDay,
  selectedSlotId,
  selectedSlotTime,
  orderItems,
  setOrderItems,
  orderComment,
  setOrderComment,
  setCurrentStep
}) => {
  const bookingInfo = getBookingInfo(orderItems, chosenDay, selectedSlotId)

  const totalCost = orderItems.reduce(
    (sum, orderItem) => sum + orderItem.price * orderItem.quantity, 0
  )

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
      <section className={styles.emptyStateSection}>
        <h1 className={styles.emptyStateTitle}>
          Корзина пуста
        </h1>

        <p className={styles.emptyStateSubtitle}>
          Добавьте товары, чтобы оформить заказ
        </p>

        <button
          type="button"
          className={styles.returnToChoiceButton}
          onClick={() => setCurrentStep('pizza')}
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Вернуться к выбору
        </button>
      </section>
    )
  }

  return (
    <>
      <header className={styles.topBar}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => setCurrentStep('pizza')}
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Назад
        </button>

        <div className={styles.selectedSlotInfo}>
          <SelectedSlotInfo
            chosenDay={chosenDay}
            selectedSlotTime={selectedSlotTime}
          />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.orderRow}>
          <h2 className={styles.sectionTitle}>Ваш заказ</h2>

          <button
            type="button"
            className={styles.clearOrderButton}
            onClick={() => setOrderItems([])}
            aria-label="Очистить заказ">
            <Trash2 size={19} strokeWidth={2} />
          </button>
        </div>

        <OrderItems
          orderItems={orderItems}
          onDecreaseQuantity={onDecreaseQuantity}
          onIncreaseQuantity={onIncreaseQuantity} />

        <section className={styles.commentSection}>
          <label
            htmlFor="order-comment"
            className={styles.commentLabel}
          >
            Комментарий к заказу
          </label>

          <textarea
            id="order-comment"
            className={styles.commentTextarea}
            placeholder="Например: порезать на 6 кусочков."
            value={orderComment}
            onChange={(e) => setOrderComment(e.target.value)} />
        </section>

        <div className={styles.confirmOrderWrapper}>
          <button
            type="button"
            disabled={!bookingInfo.canBook}
            className={styles.confirmOrderButton}
            onClick={() => setCurrentStep('payment')}
          >
            <span>Оформить заказ на </span>

            <span
              className={styles.confirmOrderButtonPrice}>
              {totalCost.toLocaleString('ru-RU').replace(/\s/g, '\u202F')} ₽
            </span>
          </button>
        </div>

        {!bookingInfo.canBook && (
          <p className={styles.bookingLimitMessage}>
            <span>
              На этот слот нельзя заказать больше пицц, чем <span>{bookingInfo.maxPizzasCount}</span>
            </span>
          </p>
        )}
      </main>
    </>
  )
}
