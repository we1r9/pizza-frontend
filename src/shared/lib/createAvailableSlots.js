import { slotTimes } from "./slotTimes"

export const createAvailableSlots = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  const now = new Date()

  return slotTimes.map((time) => {
    const [hours, minutes] = time.split(':').map(Number)
    const slotDate = new Date(
      year,
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    )

    return {
      id: `${day}-${month}-${year}-${time}`,
      time,
      expired: slotDate <= now,
      booked: false,
      enabled: true
    }
  })
}
