import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { formatDate } from '../../../../shared/lib/formatDate'
import { isSlotExpired } from '../../../../shared/lib/isSlotExpired'

import { X } from 'lucide-react'

import styles from './styles.module.css'

export const EditSlotsModal = ({
  onClose,
  orderDays,
  setOrderDays,
  showToast
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const isDayOver = (date) => {
    const endOfDay = new Date(`${date}T23:59:59.999`)
    return endOfDay < new Date()
  }

  const [activeDayIndex, setActiveDayIndex] = useState(0)
  const [changedSlotIds, setChangedSlotIds] = useState([])

  const visibleDays = orderDays.filter((day) =>
    !isDayOver(day.date) &&
    day.availableSlots.some(
      (slot) => !isSlotExpired(day.date, slot.time) || slot.booked
    )
  )
  if (!visibleDays.length) return null

  const chosenDay = visibleDays[activeDayIndex]

  const activeSlots = chosenDay.availableSlots.filter(
    (slot) => !isSlotExpired(chosenDay.date, slot.time) || slot.booked
  )

  const handleSaveChanges = () => {
    setOrderDays((prev) =>
      prev.map((day) => {
        if (day.date !== chosenDay.date) return day

        return {
          ...day,
          availableSlots: day.availableSlots.map((slot) =>
            changedSlotIds.includes(slot.id)
              ? { ...slot, enabled: !slot.enabled }
              : slot
          )
        }
      })
    )
  }

  const handleToggleSlot = (slotId) => {
    if (changedSlotIds.includes(slotId)) {
      setChangedSlotIds((prev) => prev.filter((id) => id !== slotId))
      return
    }

    setChangedSlotIds((prev) => [...prev, slotId])
  }

  return createPortal(
    <div className={styles.wrapper}>
      <div
        onClick={onClose}
        className={styles.overlay}>
      </div>

      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          aria-label="Закрыть окно"
          className={styles.closeButton}
          onClick={onClose}
        >
          <X size={20} strokeWidth={2.2} />
        </button>

        <div className={styles.daysButtonsRow}>
          {visibleDays.map((orderDay, index) => (
            <button
              type="button"
              key={orderDay.id}
              className={`
                ${styles.dayButton}
                ${activeDayIndex === index && styles.selectedDayButton}
              `}
              onClick={() => {
                setActiveDayIndex(index)
                setChangedSlotIds([])
              }}
            >
              {formatDate(orderDay.date)}
            </button>
          ))}
        </div>

        <div className={styles.slotsContainer}>
          {activeSlots.map((slot) => {
            const isToggled = changedSlotIds.includes(slot.id)
            const displayEnabled = isToggled ? !slot.enabled : slot.enabled

            return (
              <button
                type="button"
                key={slot.id}
                disabled={slot.booked}
                className={`
                  ${styles.slotPill}
                  ${slot.booked ? styles.bookedPill : !displayEnabled ? styles.disabledSlotPill : ''}
                `}
                onClick={() => handleToggleSlot(slot.id)}
              >
                {slot.time}
              </button>
            )
          })}
        </div>

        <div className={styles.saveChangesContainer}>
          {changedSlotIds.length > 0 && (
            <button
              type="button"
              className={styles.saveChangesButton}
              onClick={() => {
                handleSaveChanges()
                showToast('Слоты успешно обновлены')
                onClose()
              }}
            >
              Сохранить
            </button>
          )}
        </div>
      </div>
    </div >,
    document.body
  )
}
