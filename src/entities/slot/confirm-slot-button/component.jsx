import styles from './styles.module.css'

export const ConfirmSlotButton = ({
  children,
  isHidden,
  setCurrentStep
}) => {
  if (isHidden) return null

  return (
    <div>
      <button
        type="button"
        className={styles.confirmSlotButton}
        onClick={() => setCurrentStep('pizza')}
      >
        {children}
      </button>
    </div>
  )
}
