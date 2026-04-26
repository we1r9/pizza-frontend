import { Slot } from "../slot/component"
import { ConfirmSlotButton } from "../confirm-slot-button/component"
import { isSlotExpired } from "@/shared/lib/isSlotExpired"
import { ArrowRight } from 'lucide-react'

import styles from './styles.module.css'

export const Slots = ({
  setScreen,
  chosenDay,
  selectedSlotId,
  setSelectedSlotId,
  setSelectedSlotTime,
  className
}) => {
  const { availableSlots } = chosenDay

  const visibleSlots = availableSlots.filter((slot) => !isSlotExpired(chosenDay.date, slot.time) && slot.enabled && !slot.booked)

  const selectedSlot = visibleSlots.find((slot) => slot.id === selectedSlotId)

  const handleToggleSlotChoice = (slot) => {
    if (selectedSlotId === slot.id) {
      setSelectedSlotId(null)
      setSelectedSlotTime(null)

      return
    }

    setSelectedSlotId(slot.id)
    setSelectedSlotTime(slot.time)
  }

  return (
    <div className={className}>
      <h3 className={styles.sectionTitle}>Доступное время</h3>

      <div className={styles.slotsContainer}>
        {visibleSlots.length === 0 ? (
          <p className={styles.emptyStateText}>
            На эту дату нет актуальных слотов
          </p>
        ) : (
          visibleSlots.map((slot) => (
            <Slot
              key={slot.id}
              slot={slot}
              isBooked={slot.booked}
              className={`
                ${styles.slotPill}
                ${slot.booked ? styles.bookedPill : ''}
                ${selectedSlotId === slot.id ? styles.selectedSlotPill : ''}
              `}
              onClick={() => handleToggleSlotChoice(slot)}
            />
          ))
        )}
      </div>

      <div className={`${styles.actionRow} ${visibleSlots.length <= 3 && styles.actionRowCentered}`}>
        <ConfirmSlotButton
          isHidden={!selectedSlot}
          setScreen={setScreen}>
          <>
            Продолжить
            <ArrowRight size={18} strokeWidth={2} />
          </>
        </ConfirmSlotButton>
      </div>
    </div>
  )
}
