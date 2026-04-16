import styles from './styles.module.css'

export const Toast = ({ toastMessage }) => {
  return (
    <div className={styles.toast}>
      {toastMessage}
    </div>
  )
}
