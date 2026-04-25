import styles from './styles.module.css'

export const AddToOrderButton = ({
  children,
  onClick
}) => {

  return (
    <button
      type="button"
      className={styles.addToOrderButton}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
