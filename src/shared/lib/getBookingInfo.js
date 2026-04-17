import { isSlotExpired } from "./isSlotExpired"

export const getBookingInfo = (orderItems, chosenDay, selectedSlotId) => {
  if (!chosenDay) {
    return {
      canBook: false,
      maxPizzasCount: 0,
      slotsToBook: []
    }
  }

  const totalPizzas = orderItems.reduce(
    (total, orderItem) => total + orderItem.quantity,
    0
  )

  const selectedSlotIndex = chosenDay.availableSlots.findIndex(
    (slot) => slot.id === selectedSlotId
  )

  if (selectedSlotIndex === -1) {
    return {
      canBook: false,
      maxPizzasCount: 0,
      slotsToBook: []
    }
  }

  const selectedSlot = chosenDay.availableSlots[selectedSlotIndex]

  const selectedSlotIsValid =
    !isSlotExpired(chosenDay.date, selectedSlot.time) &&
    !selectedSlot.booked &&
    selectedSlot.enabled

  if (!selectedSlotIsValid) {
    return {
      canBook: false,
      maxPizzasCount: 0,
      slotsToBook: []
    }
  }

  const slotsToBook = [selectedSlot]
  let remainingSlotsToBook = totalPizzas - 1

  for (let i = selectedSlotIndex - 1; i >= 0 && remainingSlotsToBook > 0; i--) {
    const slot = chosenDay.availableSlots[i]

    const validSlot =
      !isSlotExpired(chosenDay.date, slot.time) &&
      !slot.booked &&
      slot.enabled

    if (!validSlot) continue

    slotsToBook.push(slot)
    remainingSlotsToBook--
  }

  const maxPizzasCount = slotsToBook.length
  const canBook = maxPizzasCount === totalPizzas

  return {
    canBook,
    maxPizzasCount,
    slotsToBook
  }
}
