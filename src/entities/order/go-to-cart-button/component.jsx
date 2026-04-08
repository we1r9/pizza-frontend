import styles from './styles.module.css'

export const GoToCartButton = ({
  orderItems,
  onClick
}) => {
  return (
    <div>
      {orderItems.length > 0 && (
        <button
          onClick={onClick}
          className={styles.button}
        >
          К заказу → <span className={styles.badge}>{orderItems.length}</span>
        </button>
      )}
    </div>
  )
}
