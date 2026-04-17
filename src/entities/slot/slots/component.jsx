import { Slot } from "../slot/component"
import { ConfirmSlotButton } from "../confirm-slot-button/component"
import { isSlotExpired } from "../../../shared/lib/isSlotExpired"

import styles from './styles.module.css'

export const Slots = ({
  setCurrentStep,
  chosenDay,
  selectedSlotId,
  setSelectedSlotId,
  setSelectedSlotTime
}) => {
  const { availableSlots } = chosenDay

  const visibleSlots = availableSlots.filter((slot) => !isSlotExpired(chosenDay.date, slot.time) && slot.enabled)

  const selectedSlot = visibleSlots.find((slot) => slot.id === selectedSlotId)

  const hasAvailableSlots = visibleSlots.some((slot) => !slot.booked)

  if (!visibleSlots.length) {
    return (
      <div>
        <h3>Доступные слоты</h3>
        <p>На эту дату нет актуальных слотов</p>
      </div>
    )
  }

  const handleToggleSlotChoice = (slot) => {
    if (slot.booked) return

    if (selectedSlotId === slot.id) {
      setSelectedSlotId(null)
      setSelectedSlotTime(null)

      return
    }

    setSelectedSlotId(slot.id)
    setSelectedSlotTime(slot.time)
  }

  return (
    <div>
      <h3>Доступные слоты</h3>

      <div className={styles.slotsContainer}>
        {hasAvailableSlots
          ? visibleSlots.map((slot => (
            <Slot
              key={slot.id}
              slot={slot}
              isBooked={slot.booked}
              className={`
            ${styles.slotPill}
            ${slot.booked && styles.bookedSlotPill}
            ${selectedSlotId === slot.id && styles.selectedSlot}
          `}
              onClick={() => handleToggleSlotChoice(slot)}
            />
          )))
          : <p>На эту дату все слоты уже заняты</p>}
      </div>

      <ConfirmSlotButton
        isHidden={!selectedSlot}
        setCurrentStep={setCurrentStep}
      >
        Продолжить →
      </ConfirmSlotButton>
    </div>
  )
}
