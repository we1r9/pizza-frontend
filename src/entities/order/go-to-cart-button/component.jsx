import styles from './styles.module.css'

export const GoToCartButton = ({
  orderItems,
  onClick
}) => {
  return (
    <div style={{marginTop: "20px"}}>
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
