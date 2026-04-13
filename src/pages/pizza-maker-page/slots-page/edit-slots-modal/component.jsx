import { useState } from 'react'
import { createPortal } from 'react-dom'
import { formatDate } from '../../../../shared/lib/formatDate'

import styles from './styles.module.css'

export const EditSlotsModal = ({
  onClose,
  orderDays,
  setOrderDays
}) => {
  const [activeDayIndex, setActiveDayIndex] = useState(0)
  const [changedSlotIds, setChangedSlotIds] = useState([])

  const visibleDays = orderDays.filter((day) =>
    day.availableSlots.some((slot) => !slot.expired)
  )
  if (!visibleDays.length) return null

  const chosenDay = visibleDays[activeDayIndex]

  const activeSlots = chosenDay.availableSlots.filter((slot) => !slot.expired)

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

      <div className={styles.modal}>
        <button
          onClick={onClose}
          className={styles.closeButton}
        >
          x
        </button>

        <div className={styles.daysButtonsRow}>
          {visibleDays.map((orderDay, index) => (
            <button
              key={orderDay.id}
              onClick={() => {
                setActiveDayIndex(index)
                setChangedSlotIds([])
              }}
              disabled={activeDayIndex === index}
            >
              {formatDate(orderDay.date)}
            </button>
          ))}
        </div>

        <div className={styles.slotsContainer}>
          {!activeSlots.length ? (
            <p className={styles.fallback}>
              На эту дату больше нет актуальных слотов
            </p>
          ) : (
            activeSlots.map((slot) => {
              const isToggled = changedSlotIds.includes(slot.id)
              const displayEnabled = isToggled ? !slot.enabled : slot.enabled

              return (
                <button
                  key={slot.id}
                  disabled={slot.booked}
                  className={`${styles.slotPill} ${displayEnabled
                    ? styles.enabledSlotPill
                    : styles.disabledSlotPill
                    }`}
                  onClick={() => handleToggleSlot(slot.id)}
                >
                  {slot.time}
                </button>
              )
            })
          )}
        </div>

        <div className={styles.saveChangesContainer}>
          {changedSlotIds.length > 0 && (
            <button
              className={styles.saveChangesButton}
              onClick={() => {
                handleSaveChanges()
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
