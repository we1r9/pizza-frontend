import styles from './styles.module.css'

export const PaymentPage = ({
  setCurrentStep,
  orderItems,
  paymentMethod,
  setPaymentMethod
}) => {
  const totalCost = orderItems.reduce(
    (sum, orderItem) => sum + orderItem.price * orderItem.quantity, 0
  )

  return (
    <div className={styles.paymentPage}>
      <button
        onClick={() => setCurrentStep('order')}>
        ← Назад
      </button>

      <h2 className={styles.totalCostTitle}>К оплате:</h2>
      <p className={styles.totalCost}>
        {totalCost} ₽
      </p>

      <h2 className={styles.paymentOptionsTitle}>Способ оплаты</h2>
      <div className={styles.paymentOptions}>
        <button
          onClick={() => setPaymentMethod('card')}
          className={`
            ${styles.paymentOption}
            ${paymentMethod === 'card'
              ? styles.active
              : ''}
          `}
        >

          <h4 className={styles.paymentTitle}>💳 Картой</h4>
          
          <p className={styles.paymentDescription}>Онлайн</p>
        </button>

        <button
          onClick={() => setPaymentMethod('cash')}
          className={`
            ${styles.paymentOption}
            ${paymentMethod === 'cash'
              ? styles.active
              : ''}
          `}
        >

          <h4 className={styles.paymentTitle}>💵 При получении</h4>
          
          <p className={styles.paymentDescription}>Наличными или картой</p>
        </button>
      </div>

      <button
        hidden={!paymentMethod}
        className={styles.submitButton}
      >
        {paymentMethod === 'card'
          ? 'Оплатить'
          : 'Подтвердить заказ'}
      </button>
    </div>
  )
}
