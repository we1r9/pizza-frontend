import { formatDate } from "../../../shared/lib/formatDate"

export const SelectedSlotInfo = ({
  chosenDay,
  selectedSlotTime,
  className
}) => {
  return (
    <div className={className}>
      <span>
        {formatDate(chosenDay.date)}
      </span>
      <span> • </span>
      <span>
        {selectedSlotTime}
      </span>
    </div>
  )
}
