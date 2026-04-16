import { useEffect } from "react"
import { createPortal } from "react-dom"

import styles from './styles.module.css'

export const EditingModal = ({
  onClose,
  editingType,
  currentOrderStatus,
  currentPaymentStatus,
  handleSaveOrderStatus,
  handleSavePaymentStatus,
  handleReturnOrderToActive
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleConfirm = () => {
    if (editingType === 'status') {
      handleSaveOrderStatus()
    }

    if (editingType === 'payment') {
      handleSavePaymentStatus()
    }

    if (editingType === 'return') {
      handleReturnOrderToActive()
    }

    onClose()
  }

  return createPortal(
    <div className={styles.wrapper}>
      <div
        onClick={onClose}
        className={styles.overlay}
      />

      <div className={styles.modal}>
        <button
          type='button'
          onClick={onClose}
          className={styles.closeButton}
        >
          ×
        </button>

        {editingType === 'status' && (
          <h3 className={styles.title}>
            Подтвердить изменение статуса заказа
          </h3>
        )}

        {editingType === 'payment' && (
          <h3 className={styles.title}>
            Подтвердить изменение статуса оплаты
          </h3>
        )}

        {editingType === 'return' && (
          <h3 className={styles.title}>
            Вернуть заказ в работу?
          </h3>
        )}

        {editingType === 'status' && (
          <p className={styles.text}>
            Вы меняете статус заказа на{' '}
            «<span className={styles.statusValue}>{currentOrderStatus}</span>».
          </p>
        )}

        {editingType === 'payment' && (
          <p className={styles.text}>
            Вы меняете статус оплаты на{' '}
            «<span className={styles.statusValue}>{currentPaymentStatus === 'unpaid' ? 'Не оплачено' : 'Оплачено'}</span>».
          </p>
        )}

        {editingType === 'return' && (
          <p className={styles.text}>
            Заказ будет возвращен в работу со статусом{' '}
            «<span className={styles.statusValue}>{currentOrderStatus}</span>».
          </p>
        )}

        <button
          type='button'
          onClick={handleConfirm}
          className={styles.confirmButton}
        >
          Подтвердить
        </button>
      </div>
    </div>,
    document.body
  )
}
