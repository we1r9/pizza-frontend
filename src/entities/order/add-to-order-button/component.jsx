import styles from './styles.module.css'

export const AddToOrderButton = ({
  children,
  onClick
}) => {

  return (
    <button
      onClick={onClick}
      className={styles.addToOrderButton}>
      {children}
    </button>
  )
}
