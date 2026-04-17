import { formatDate } from "../../../shared/lib/formatDate"
import { isSlotExpired } from '../../../shared/lib/isSlotExpired'
import { Tab } from "../../../shared/ui/tab/component"

import styles from './styles.module.css'

export const DateTabs = ({
  orderDays,
  selectedDayId,
  setSelectedDayId,
  setSelectedSlotId,
  setSelectedSlotTime
}) => {
  
  return (
    <div className={styles.datesRow}>
      {orderDays
        .filter((day) =>
          day.availableSlots.some(
            (slot) => !isSlotExpired(day.date, slot.time) && slot.enabled
          )
        )
        .map((day) => (
          <Tab
            key={day.id}
            isActive={selectedDayId === day.id}
            onClick={() => {
              setSelectedDayId(day.id)
              setSelectedSlotId(null)
              setSelectedSlotTime(null)
            }}
          >
            {formatDate(day.date)}
          </Tab>
        ))}
    </div>
  )
}
