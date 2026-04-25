import { slotTimes } from "./slotTimes"

export const createAvailableSlots = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return slotTimes.map((time) => ({
    id: `${day}-${month}-${year}-${time}`,
    time,
    booked: false,
    enabled: true
  }))
}
