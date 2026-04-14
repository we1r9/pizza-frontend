import { getBookingInfo } from '../../../shared/lib/getBookingInfo'

import styles from './styles.module.css'

export const PaymentPage = ({
  setCurrentStep,
  orderItems,
  paymentMethod,
  setPaymentMethod,
  chosenDay,
  selectedSlotId,
  selectedSlotTime,
  setOrders,
  setOrderDays,
  orderComment
}) => {
  const totalCost = orderItems.reduce(
    (sum, orderItem) => sum + orderItem.price * orderItem.quantity, 0
  )

  const handleAddOrder = () => {
    const bookingInfo = getBookingInfo(orderItems, chosenDay, selectedSlotId)

    if (!bookingInfo.canBook) return

    const bookedSlotIds = new Set(bookingInfo.slotsToBook.map((slot) => slot.id))

    setOrderDays((prev) =>
      prev.map((day) => {
        if (day.id !== chosenDay.id) return day

        return {
          ...day,
          availableSlots: day.availableSlots.map((slot) =>
            bookedSlotIds.has(slot.id)
              ? { ...slot, booked: true }
              : slot
          )
        }
      })
    )

    const order = {
      id: crypto.randomUUID(),
      orderNumber: Math.floor(1000 + Math.random() * 9000),
      date: chosenDay.date,
      time: selectedSlotTime,
      paymentMethod,
      status: 'new',
      items: [...orderItems],
      totalCost,
      orderComment
    }

    setOrders((prev) => [...prev, order])
    setCurrentStep('success')
  }

  return (
    <div className={styles.paymentPage}>
      <button
        onClick={() => setCurrentStep('order')}>
        ← Назад
      </button>

      <h2 className={styles.totalCostTitle}>К оплате:</h2>
      <p className={styles.totalCost}>
        {totalCost} ₽
      </p>

      <h2 className={styles.paymentOptionsTitle}>Способ оплаты</h2>
      <div className={styles.paymentOptions}>
        <button
          onClick={() => setPaymentMethod('card')}
          className={`
            ${styles.paymentOption}
            ${paymentMethod === 'card'
              ? styles.active
              : ''}
          `}
        >

          <h4 className={styles.paymentTitle}>💳 Картой</h4>

          <p className={styles.paymentDescription}>Онлайн</p>
        </button>

        <button
          onClick={() => setPaymentMethod('cash')}
          className={`
            ${styles.paymentOption}
            ${paymentMethod === 'cash'
              ? styles.active
              : ''}
          `}
        >

          <h4 className={styles.paymentTitle}>💵 При получении</h4>

          <p className={styles.paymentDescription}>Наличными или картой</p>
        </button>
      </div>
      <button
        onClick={handleAddOrder}
        hidden={!paymentMethod}
      >
        {paymentMethod === 'card'
          ? 'Оплатить'
          : 'Подтвердить заказ'}
      </button>
    </div>
  )
}
