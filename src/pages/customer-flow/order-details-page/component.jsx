import { OrderedItems } from '@/entities/order/ordered-items/component'
import { SelectedSlotInfo } from '@/entities/slot/selected-slot-info/component'
import { Stepper } from '@/entities/order/stepper/component'

import { ArrowLeft, Check } from 'lucide-react'

import styles from './styles.module.css'

export const OrderDetailsPage = ({
  setCurrentStep,
  selectedOrder
}) => {

  return (
    <>
      <header>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => setCurrentStep('orders')}
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Назад
        </button>
      </header>

      <main className={styles.main}>
        <h1 className={styles.orderNumber}>
          Заказ №{selectedOrder.orderNumber}
        </h1>

        <div className={styles.orderDateTime}>
          <SelectedSlotInfo
            chosenDay={selectedOrder}
            selectedSlotTime={selectedOrder.time} />
        </div>

        <Stepper selectedOrder={selectedOrder} />

        <OrderedItems orderItems={selectedOrder.items} />

        <div className={styles.summaryRow}>
          Итого
          <span>
            {selectedOrder.totalCost.toLocaleString('ru-RU').replace(/\s/g, '\u202F')} ₽
          </span>
        </div>

        <span
          className={`
            ${styles.paymentStatusWrapper}
            ${selectedOrder.paymentMethod === 'card'
              ? styles.paymentStatusPaid
              : styles.paymentStatusUnpaid
            }
          `}
        >
          {selectedOrder.paymentMethod === 'card' ? (
            <span className={styles.paymentStatusContent}>
              <Check size={14} strokeWidth={2.5} aria-hidden="true" />
              Оплачено картой
            </span>
          ) : (
            <span className={styles.paymentStatusContent}>
              Оплата при получении
            </span>
          )}
        </span>

        {selectedOrder.orderComment.length > 0 && (
          <div className={styles.orderComment}>
            <span className={styles.orderCommentLabel}>Комментарий</span>

            <p className={styles.orderCommentText}>{selectedOrder.orderComment}</p>
          </div>
        )}
      </main >
    </>
  )
}
