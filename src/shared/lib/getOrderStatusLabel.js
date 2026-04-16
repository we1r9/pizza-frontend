export const getOrderStatusLabel = (status) => {
  switch (status) {
    case 'new':
      return 'Новый'
    case 'in_progress':
      return 'Готовится'
    case 'ready':
      return 'Готов к выдаче'
    case 'completed':
      return 'Выдан'
    default:
      return ''
  }
}
