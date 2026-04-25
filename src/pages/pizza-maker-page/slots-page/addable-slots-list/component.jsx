import styles from './styles.module.css'

export const AddableSlotsList = ({
  activeSlots,
  changedSlotIds,
  setChangedSlotIds
}) => {
  const handleToggleSlot = (slotId, isSelected) => {
    if (isSelected) {
      setChangedSlotIds((prev) => prev.filter((id) => id !== slotId))
      return
    }

    setChangedSlotIds((prev) => [...prev, slotId])
  }

  return (
    <div className={styles.slotsContainer}>
      {activeSlots.map((slot) => {
        const isSelected = changedSlotIds.includes(slot.id)

        return (
          <button
            type="button"
            key={slot.id}
            className={`
              ${styles.slotPill}
              ${isSelected ? styles.selectedSlotPill : ''}
            `}
            onClick={() => handleToggleSlot(slot.id, isSelected)}
          >
            {slot.time}
          </button>
        )
      })}
    </div>
  )
}
