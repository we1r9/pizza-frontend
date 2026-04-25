import styles from './styles.module.css'

export const Toast = ({ toastMessage }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={styles.toast}
    >
      {toastMessage}
    </div>
  )
}
