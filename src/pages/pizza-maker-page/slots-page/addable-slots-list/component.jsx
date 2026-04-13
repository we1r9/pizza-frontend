import styles from './styles.module.css'

export const AddableSlotsList = ({
  activeSlots,
  existingDay,
  changedSlotIds,
  setChangedSlotIds
}) => {
  const handleToggleSlot = (slotId, alreadyExists, isSelected) => {
    if (alreadyExists) return

    if (isSelected) {
      setChangedSlotIds((prev) => prev.filter((id) => id !== slotId))
      return
    }

    setChangedSlotIds((prev) => [...prev, slotId])
  }

  return (
    <div className={styles.slotsContainer}>
      {activeSlots.map((slot) => {
        const alreadyExists = existingDay?.availableSlots.some(
          (existingSlot) => existingSlot.id === slot.id
        )

        const isSelected = changedSlotIds.includes(slot.id)

        return (
          <button
            key={slot.id}
            disabled={alreadyExists}
            className={`${styles.slotPill} ${alreadyExists
              ? styles.existingSlotPill
              : isSelected
                ? styles.selectedSlotPill
                : styles.unselectedSlotPill
              }`}
            onClick={() => handleToggleSlot(slot.id, alreadyExists, isSelected)}
          >
            {slot.time}
          </button>
        )
      })}
    </div>
  )
}
