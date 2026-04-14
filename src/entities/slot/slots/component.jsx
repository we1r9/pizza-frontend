import { Slot } from "../slot/component"
import { ConfirmSlotButton } from "../confirm-slot-button/component"

import styles from './styles.module.css'

export const Slots = ({
  setCurrentStep,
  chosenDay,
  selectedSlotId,
  setSelectedSlotId,
  setSelectedSlotTime
}) => {
  const { availableSlots } = chosenDay

  const activeSlots = availableSlots.filter((slot) => !slot.expired && slot.enabled)

  const selectedSlot = activeSlots.find((slot) => slot.id === selectedSlotId)

  if (!activeSlots.length) {
    return (
      <div>
        <h3>Доступные слоты</h3>
        <p>На эту дату нет актуальных слотов</p>
      </div>
    )
  }

  const handleToggleSlotChoise = (slot) => {
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

      {activeSlots.map((slot => (
        <Slot
          key={slot.id}
          slot={slot}
          className={`
            ${styles.slotPill}
            ${slot.booked && styles.bookedSlotPill}
            ${selectedSlotId === slot.id && styles.selectedSlot}
          `}
          onClick={() => handleToggleSlotChoise(slot)}
        />
      )))}

      <ConfirmSlotButton
        isHidden={!selectedSlot}
        setCurrentStep={setCurrentStep}
      >
        Продолжить →
      </ConfirmSlotButton>
    </div>
  )
}
