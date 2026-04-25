import styles from './styles.module.css'
import sharedStyles from '../shared-styles.module.css'

export const OrderCustomerInfo = ({
  order
}) => {

  return (
    <section className={sharedStyles.section}>
      <h2 className={sharedStyles.sectionTitle}>
        Информация о клиенте
      </h2>

      <div className={styles.infoList}>
        {order.orderComment && (
          <p>
            <span className={styles.infoLabel}>
              Комментарий к заказу: {''}
            </span>
            {order.orderComment}
          </p>
        )}
      </div>
    </section>
  )
}
