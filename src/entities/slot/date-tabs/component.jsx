import { formatDate } from "../../../shared/lib/formatDate"
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
      {orderDays.map((day) => (
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
