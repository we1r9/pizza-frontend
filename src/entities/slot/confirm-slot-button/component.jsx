import styles from './styles.module.css'

export const ConfirmSlotButton = ({
  children,
  isHidden,
  setScreen
}) => {
  if (isHidden) return null

  return (
    <div>
      <button
        type="button"
        className={styles.confirmSlotButton}
        onClick={() => setScreen('pizza')}
      >
        {children}
      </button>
    </div>
  )
}
