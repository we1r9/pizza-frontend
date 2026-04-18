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
          onClick={onClick}
          className={styles.goToCartButton}>
          {children}
        </button>
      )}
    </div>
  )
}
