export const isDayOver = (date) => {
  const endOfDay = new Date(`${date}T23:59:59.999`)
  
  return endOfDay < new Date()
}
