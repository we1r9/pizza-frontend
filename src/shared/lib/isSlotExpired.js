export const isSlotExpired = (date, time) => {
  const now = new Date()

  const [year, month, day] = date.split('-').map(Number)
  const [hours, minutes] = time.split(':').map(Number)

  const slotDate = new Date(year, month - 1, day, hours, minutes)

  return slotDate < now
}
