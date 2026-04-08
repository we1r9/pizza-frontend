import { formatDate } from "../../../shared/lib/formatDate"
import { Tab } from "../../../shared/ui/tab/component"

export const DateTabs = ({
  orderDays,
  onClick,
  activeIndex
}) => {
  return (
    <div>
      {orderDays.map((day, index) => (
        <Tab
          key={day.id}
          onClick={() => onClick(index)}
          isActive={activeIndex === index}
        >
          {formatDate(day.date)}
        </Tab>
      ))}
    </div>
  )
}
