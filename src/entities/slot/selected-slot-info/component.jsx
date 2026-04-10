import { formatDate } from "../../../shared/lib/formatDate"

export const SelectedSlotInfo = ({
  orderDays,
  selectedSlotTime,
  activeSlotIndex,
  className
}) => {
  return (
    <div className={className}>
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
