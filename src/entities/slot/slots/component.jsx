import { Slot } from "../slot/component"
import { ConfirmSlotButton } from "../confirm-slot-button/component";

import styles from './styles.module.css'

export const Slots = ({
  chosenDay,
  setCurrentStep,
  selectedSlotId,
  setSelectedSlotId,
  setSelectedSlotTime
}) => {
  const { availableSlots } = chosenDay;

  return (
    <div>
      <h3>Доступные слоты</h3>

      {availableSlots.map((slot => (
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
