import { createAvailableSlots } from "./createAvailableSlots"
import { createDateString } from "./createDateString"

export const availableDaysForCreation = Array.from({ length: 14 }, (_, index) => {
  const date = new Date()
  date.setDate(date.getDate() + index)

  return {
    id: createDateString(date),
    date: createDateString(date),
    availableSlots: createAvailableSlots(date)
  }
})
