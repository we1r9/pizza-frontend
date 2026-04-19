import { getBookingInfo } from '../../../shared/lib/getBookingInfo'

import { ArrowLeft, CreditCard, Wallet } from 'lucide-react'

import styles from './styles.module.css'

const generateOrderNumber = () => Math.floor(1000 + Math.random() * 9000)

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
      orderNumber: generateOrderNumber(),
      date: chosenDay.date,
      time: selectedSlotTime,
      paymentMethod,
      paymentStatus: paymentMethod === 'card' ? 'paid' : 'unpaid',
      status: 'new',
      items: [...orderItems],
      totalCost,
      orderComment
    }

    setOrders((prev) => [...prev, order])
    setCurrentStep('success')
  }

  return (
    <>
      <header>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => setCurrentStep('order')}>
          <ArrowLeft size={16} strokeWidth={2} />
          Назад
        </button>
      </header>

      <main className={styles.main}>
        <h1 className={styles.paymentOptionsTitle}>Способ оплаты</h1>

        <section className={styles.paymentOptions}>
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`
            ${styles.paymentOption}
            ${paymentMethod === 'card'
                ? styles.activePaymentOption
                : ''}`}>
            <span className={styles.paymentTitle}>
              <CreditCard size={18} strokeWidth={2} />
              Картой
            </span>

            <span className={styles.paymentDescription}>
              Онлайн
            </span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('on_receipt')}
            className={`
            ${styles.paymentOption}
            ${paymentMethod === 'on_receipt'
                ? styles.activePaymentOption
                : ''}`}>
            <span className={styles.paymentTitle}>
              <Wallet size={18} strokeWidth={2} />
              При получении
            </span>

            <span className={styles.paymentDescription}>
              Наличными или картой
            </span>
          </button>
        </section>

        <section className={styles.summarySection}>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Итого</span>
            <span className={styles.summaryValue}>
              {totalCost.toLocaleString('ru-RU').replace(/\s/g, '\u202F')} ₽
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddOrder}
            hidden={!paymentMethod}
            className={styles.summaryButton}>
            {paymentMethod === 'card'
              ? 'Оплатить'
              : 'Подтвердить заказ'}
          </button>
        </section>
      </main>
    </>
  )
}
