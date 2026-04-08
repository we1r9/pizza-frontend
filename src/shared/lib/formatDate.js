export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("ru", {
    day: 'numeric',
    month: 'long',
    weekday: 'short'
  })
}
