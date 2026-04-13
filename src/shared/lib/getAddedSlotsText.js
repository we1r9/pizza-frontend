import { formatDate } from './formatDate'

const getSlotsWord = (count) => {
  const lastTwoDigits = count % 100
  const lastDigit = count % 10

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'слотов'
  }

  if (lastDigit === 1) {
    return 'слот'
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'слота'
  }

  return 'слотов'
}

const getVerb = (count) => {
  const lastTwoDigits = count % 100
  const lastDigit = count % 10

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'добавлено'
  }

  return lastDigit === 1 ? 'добавлен' : 'добавлено'
}

export const getAddedSlotsText = (count, date) => {
  return `На ${formatDate(date)} будет ${getVerb(count)} ${count} ${getSlotsWord(count)}`
}
