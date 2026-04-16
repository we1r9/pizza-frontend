import styles from './styles.module.css'
import sharedStyles from '../shared-styles.module.css'

export const OrderCustomerInfo = ({
  order
}) => {
  
  return (
    <section className={sharedStyles.section}>
      <h3 className={sharedStyles.sectionTitle}>Информация о клиенте</h3>

      <div className={styles.infoList}>
        <p><span className={styles.infoLabel}>Имя: </span>Иван</p>
        <p><span className={styles.infoLabel}>Отряд: </span>5</p>
        <p><span className={styles.infoLabel}>Телефон: </span>+7 (999) 123-45-67</p>

        {order.orderComment && (
          <p>
            <span className={styles.infoLabel}>Комментарий к заказу: </span>
            {order.orderComment}
          </p>
        )}
      </div>
    </section>
  )
}
