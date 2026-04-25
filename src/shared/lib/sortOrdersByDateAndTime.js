export const sortOrdersByDateAndTime = (orders, direction = 'asc') => {
  return [...orders].sort((a, b) => {
    const dateCompare =
      direction === 'asc'
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)

    if (dateCompare !== 0) return dateCompare

    return direction === 'asc'
      ? a.time.localeCompare(b.time)
      : b.time.localeCompare(a.time)
  })
}
