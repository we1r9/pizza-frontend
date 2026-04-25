import { formatDate } from "../../../shared/lib/formatDate"
import { isSlotExpired } from '../../../shared/lib/isSlotExpired'

import styles from './styles.module.css'

export const DateTabs = ({
  orderDays,
  selectedDayId,
  setSelectedDayId,
  setSelectedSlotId,
  setSelectedSlotTime,
  className
}) => {

  return (
    <div
      className={className}
      role="group"
      aria-label="Выбор даты заказа">
      {orderDays
        .filter((day) =>
          day.availableSlots.some(
            (slot) => !isSlotExpired(day.date, slot.time) && slot.enabled && !slot.booked
          )
        )
        .map((day) => (
          <button
            type="button"
            key={day.id}
            className={`
              ${styles.dateButton}
              ${selectedDayId === day.id && styles.selectedDateButton}`}
            onClick={() => {
              setSelectedDayId(day.id)
              setSelectedSlotId(null)
              setSelectedSlotTime(null)
            }}
          >
            {formatDate(day.date)}
          </button>
        ))}
    </div>
  )
}
