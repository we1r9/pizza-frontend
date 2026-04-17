import { useState } from 'react'
import { createPortal } from 'react-dom'
import { formatDate } from '../../../../shared/lib/formatDate'
import { AddableSlotsList } from '../addable-slots-list/component'
import { getAddedSlotsText } from '../../../../shared/lib/getAddedSlotsText'
import { availableDaysForCreation } from '../../../../shared/lib/availableDaysForCreation'
import { isSlotExpired } from '../../../../shared/lib/isSlotExpired'

import styles from './styles.module.css'

export const AddSlotsModal = ({
  onClose,
  orderDays,
  setOrderDays
}) => {
  const [changedSlotIds, setChangedSlotIds] = useState([])
  const [activeSelectIndex, setActiveSelectIndex] = useState(0)

  const chosenDay = availableDaysForCreation[activeSelectIndex]

  const activeSlots = chosenDay.availableSlots.filter((slot) => !isSlotExpired(chosenDay.date, slot.time))

  const existingDay = orderDays.find((day) => day.date === chosenDay.date)

  const selectableSlotIds = activeSlots
    .filter((slot) => {
      const alreadyExists = existingDay?.availableSlots.some(
        (existingSlot) => existingSlot.id === slot.id
      )

      return !alreadyExists && !slot.booked && slot.enabled
    })
    .map((slot) => slot.id)

  const hasSelectableSlots = selectableSlotIds.length > 0

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
        className={styles.overlay}>
      </div>

      <div className={styles.modal}>
        <button
          onClick={onClose}
          className={styles.closeButton}
        >
          x
        </button>

        <div className={styles.actionsRow}>
          <select
            className={styles.daySelect}
            value={activeSelectIndex}
            onChange={(e) => {
              setActiveSelectIndex(Number(e.target.value))
              setChangedSlotIds([])
            }}
          >
            {availableDaysForCreation.map((orderDay, index) => (
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

        {hasSelectableSlots
          ? <AddableSlotsList
            activeSlots={activeSlots}
            existingDay={existingDay}
            changedSlotIds={changedSlotIds}
            setChangedSlotIds={setChangedSlotIds}
          />
          : <p className={styles.activeSlotsFallback}>На эту дату больше нет слотов, которые можно добавить</p>}

        {changedSlotIds.length > 0 && (
          <div className={styles.saveChangesContainer}>
            <span
              className={styles.totalAddedSlotsText}
            >
              {getAddedSlotsText(changedSlotIds.length, chosenDay.date)}
            </span>
            <button
              className={styles.saveChangesButton}
              onClick={handleAddSlots}
            >
              Добавить
            </button>
          </div>
        )}
      </div>
    </div >,
    document.body
  )
}
