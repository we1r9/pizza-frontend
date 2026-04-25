import { useRef, useState } from 'react'

export const useToast = () => {
  const [toastMessage, setToastMessage] = useState('')
  const timeoutRef = useRef(null)

  const showToast = (message) => {
    setToastMessage(message)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setToastMessage('')
      timeoutRef.current = null
    }, 2500)
  }

  return {
    toastMessage,
    showToast
  }
}
