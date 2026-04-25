import styles from './styles.module.css'

export const GoToCartButton = ({
  children,
  orderItems,
  onClick
}) => {

  return (
    <div>
      {orderItems.length > 0 && (
        <button
          type="button"
          className={styles.goToCartButton}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </div>
  )
}
