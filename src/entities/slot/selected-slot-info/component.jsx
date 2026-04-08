import { formatDate } from "../../../shared/lib/formatDate"

export const SelectedSlotInfo = ({
  orderDays,
  selectedSlotTime,
  activeSlotIndex
}) => {
  return (
    <div>
      <span>
        {formatDate(orderDays[activeSlotIndex].date)}
      </span>
      <span> • </span>
      <span>
        {selectedSlotTime}
      </span>
    </div>
  )
}
