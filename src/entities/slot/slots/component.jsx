import { Slot } from "../slot/component"
import { ConfirmSlotButton } from "../confirm-slot-button/component"

import styles from './styles.module.css'

export const Slots = ({
  chosenDay,
  setCurrentStep,
  selectedSlotId,
  setSelectedSlotId,
  setSelectedSlotTime
}) => {
  const { availableSlots } = chosenDay

  const activeSlots = availableSlots.filter((slot) => !slot.expired && slot.enabled)

  if (!activeSlots.length) {
    return (
      <div>
        <h3>Доступные слоты</h3>
        <p>На эту дату нет актуальных слотов</p>
      </div>
    )
  }

  return (
    <div>
      <h3>Доступные слоты</h3>

      {activeSlots.map((slot => (
        <Slot
          key={slot.id}
          slot={slot}
          className={slot.available === false
            ? styles.unavailable
            : styles.available
          }
          isActive={selectedSlotId === slot.id}
          onClick={() => {
            setSelectedSlotId(slot.id)
            setSelectedSlotTime(slot.time)
          }}
        />
      )))}

      <ConfirmSlotButton
        isHidden={!selectedSlotId}
        setCurrentStep={setCurrentStep}
      >
        Выбрать пиццу →
      </ConfirmSlotButton>
    </div>
  )
}
