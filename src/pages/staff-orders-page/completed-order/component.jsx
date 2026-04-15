import { useState } from "react"
import { formatDate } from "../../../shared/lib/formatDate"

import styles from './styles.module.css'

export const CompletedOrder = ({
  orders,
  orderId,
  setOrders,
  activeRole
}) => {
  const order = orders.find((order) => order.id === orderId)

  const [currentOrderStatus, setCurrentOrderStatus] = useState(order?.status ?? 'new')
  const [orderStatusIsChanging, setOrderStatusIsChanging] = useState(false)

  if (!order) {
    return <p>Заказ не найден</p>
  }

  const handleReturnOrderToActive = () => {
    setOrders((prev) =>
      prev.map((current) =>
        current.id !== order.id
          ? current
          : { ...current, status: currentOrderStatus }
      )
    )

    setOrderStatusIsChanging(false)
  }

  return (
    <div className={styles.orderPage}>
      <section className={styles.orderInfoBlock}>
        <div className={styles.orderTop}>
          <div>
            <h2 className={styles.orderNumber}>Заказ №{order.orderNumber}</h2>
            <p className={styles.orderDateTime}>
              {formatDate(order.date)} • {order.time}
            </p>
          </div>

          <div className={styles.summaryBlock}>
            <p className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Итого:</span>
              <strong>{order.totalCost} ₽</strong>
            </p>
          </div>
        </div>

        <div className={styles.metaGrid}>
          <div className={styles.metaCard}>
            <span className={styles.metaLabel}>Статус оплаты</span>
            <span>
              {order.paymentStatus === 'paid' ? '✅ Оплачено' : '❌ Не оплачено'}
            </span>
          </div>

          <div className={styles.metaCard}>
            <span className={styles.metaLabel}>Способ оплаты</span>
            <span>
              {order.paymentMethod === 'card' ? 'Картой онлайн' : 'При получении'}
            </span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Товары в заказе</h3>

        <div className={styles.itemsList}>
          {order.items.map((item) => (
            <div
              key={item.id}
              className={styles.itemCard}
            >
              <div className={styles.itemHeader}>
                <strong className={styles.itemName}>
                  {item.name} × {item.quantity}
                </strong>

                <span className={styles.itemPrice}>
                  {item.price * item.quantity} ₽
                </span>
              </div>

              {item.addedToppings?.length > 0 && (
                <p className={styles.itemMeta}>
                  Добавки: {item.addedToppings.join(', ')}
                </p>
              )}

              {item.removedIngredients?.length > 0 && (
                <p className={styles.itemMeta}>
                  Без: {item.removedIngredients.join(', ')}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Информация о клиенте</h3>

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

      {activeRole === 'pizza-maker' && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Управление статусом заказа</h3>

          <div className={styles.controlsBlock}>
            <div className={styles.controlGroup}>
              <div className={styles.buttonsRow}>
                <button
                  disabled={currentOrderStatus === 'new'}
                  onClick={() => {
                    setOrderStatusIsChanging(true)
                    setCurrentOrderStatus('new')
                  }}
                >
                  Новый
                </button>

                <button
                  disabled={currentOrderStatus === 'in_progress'}
                  onClick={() => {
                    setOrderStatusIsChanging(true)
                    setCurrentOrderStatus('in_progress')
                  }}
                >
                  Готовится
                </button>

                <button
                  disabled={currentOrderStatus === 'ready'}
                  onClick={() => {
                    setOrderStatusIsChanging(true)
                    setCurrentOrderStatus('ready')
                  }}
                >
                  Готов к выдаче
                </button>
              </div>
            </div>
          </div>

          {orderStatusIsChanging && (
            <button
              onClick={handleReturnOrderToActive}
              className={styles.returnOrderBtn}
            >
              Вернуть в работу
            </button>
          )}
        </section>
      )}
    </div>
  )
}
