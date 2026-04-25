import { useEffect } from "react"
import { createPortal } from "react-dom"

import { X } from 'lucide-react'

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
        className={styles.overlay} />

      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true">
        <button
          type="button"
          aria-label="Закрыть окно"
          className={styles.closeButton}
          onClick={onClose}
        >
          <X size={20} strokeWidth={2.2} />
        </button>

        {editingType === 'status' && (
          <h2 className={styles.title}>
            Подтвердить изменение
          </h2>
        )}

        {editingType === 'payment' && (
          <h2 className={styles.title}>
            Подтвердить изменение
          </h2>
        )}

        {editingType === 'return' && (
          <h2 className={styles.title}>
            Вернуть заказ в работу?
          </h2>
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
          type="button"
          className={styles.confirmButton}
          onClick={handleConfirm}
        >
          Подтвердить
        </button>
      </div>
    </div>,
    document.body
  )
}
