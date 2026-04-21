import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { formatDate } from '../../../../shared/lib/formatDate'
import { AddableSlotsList } from '../addable-slots-list/component'
import { availableDaysForCreation } from '../../../../shared/lib/availableDaysForCreation'
import { isSlotExpired } from '../../../../shared/lib/isSlotExpired'

import { X } from 'lucide-react'

import styles from './styles.module.css'

export const AddSlotsModal = ({
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

  const [changedSlotIds, setChangedSlotIds] = useState([])
  const [activeSelectIndex, setActiveSelectIndex] = useState(0)

  const filteredDays = availableDaysForCreation.filter((day) => {
    const existingDay = orderDays.find((d) => d.date === day.date)

    const activeSlots = day.availableSlots.filter(
      (slot) => !isSlotExpired(day.date, slot.time)
    )

    return activeSlots.some((slot) => {
      const alreadyExists = existingDay?.availableSlots.some(
        (existingSlot) => existingSlot.id === slot.id
      )

      return !alreadyExists && !slot.booked && slot.enabled
    })
  })

  if (!filteredDays.length) return null
  const safeActiveSelectIndex = filteredDays[activeSelectIndex] ? activeSelectIndex : 0

  const chosenDay = filteredDays[safeActiveSelectIndex]

  const existingDay = orderDays.find((day) => day.date === chosenDay.date)

  const activeSlots = chosenDay.availableSlots.filter((slot) => {
    const alreadyExists = existingDay?.availableSlots.some(
      (existingSlot) => existingSlot.id === slot.id
    )

    return !isSlotExpired(chosenDay.date, slot.time) && !alreadyExists
  })

  const selectableSlotIds = activeSlots
    .filter((slot) => !slot.booked && slot.enabled)
    .map((slot) => slot.id)

  const allSelectableSlotsSelected =
    selectableSlotIds.length > 0 &&
    selectableSlotIds.every((slotId) => changedSlotIds.includes(slotId))

  const handleAddSlots = () => {
    const selectedSlots = chosenDay.availableSlots.filter((slot) =>
      changedSlotIds.includes(slot.id)
    )

    if (!selectedSlots.length) {
      onClose()
      return
    }

    setOrderDays((prev) => {
      const existingDay = prev.find((day) => day.date === chosenDay.date)

      if (!existingDay) {
        return [
          ...prev,
          {
            id: chosenDay.id,
            date: chosenDay.date,
            availableSlots: selectedSlots
          }
        ]
      }

      return prev.map((day) => {
        if (day.date !== chosenDay.date) return day

        const existingSlotIds = new Set(day.availableSlots.map((slot) => slot.id))

        const newSlots = selectedSlots.filter(
          (slot) => !existingSlotIds.has(slot.id)
        )

        const availableSlots = [...day.availableSlots, ...newSlots].sort((a, b) =>
          a.time.localeCompare(b.time)
        )

        return {
          ...day,
          availableSlots
        }
      })
    })

    setChangedSlotIds([])
    onClose()
  }

  return createPortal(
    <div className={styles.wrapper}>
      <div
        onClick={onClose}
        className={styles.overlay}
      >
      </div>

      <div
        role="dialog"
        aria-modal="true"
        className={styles.modal}
      >
        <button
          type='button'
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Закрыть окно">
          <X size={20} strokeWidth={2.2} />
        </button>

        <div className={styles.actionsRow}>
          <select
            className={styles.daySelect}
            value={safeActiveSelectIndex}
            onChange={(e) => {
              setActiveSelectIndex(Number(e.target.value))
              setChangedSlotIds([])
            }}
          >
            {filteredDays.map((orderDay, index) => (
              <option
                key={orderDay.id}
                value={index}
              >
                {formatDate(orderDay.date)}
              </option>
            ))}
          </select>

          {selectableSlotIds.length > 0 && (
            <button
              className={styles.selectButton}
              onClick={() => {
                if (allSelectableSlotsSelected) {
                  setChangedSlotIds([])
                  return
                }

                setChangedSlotIds(selectableSlotIds)
              }}
            >
              {allSelectableSlotsSelected ? 'Снять выбор' : 'Выбрать все'}
            </button>
          )}
        </div>

        <AddableSlotsList
          activeSlots={activeSlots}
          existingDay={existingDay}
          changedSlotIds={changedSlotIds}
          setChangedSlotIds={setChangedSlotIds}
        />

        {changedSlotIds.length > 0 && (
          <div className={styles.saveChangesContainer}>
            <button
              type="button"
              className={styles.saveChangesButton}
              onClick={() => {
                handleAddSlots()
                showToast('Слоты успешно добавлены')
              }}>
              Добавить
            </button>
          </div>
        )}
      </div>
    </div >,
    document.body
  )
}
