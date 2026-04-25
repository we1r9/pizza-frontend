import styles from './styles.module.css'

export const OrdersTabs = ({
  activeView,
  setActiveView
}) => {
  return (
    <div className={styles.ordersTabsRow}>
      <button
        type="button"
        className={`
          ${styles.ordersPill}
          ${activeView === 'current' && styles.activeOrdersPill}
        `}
        onClick={() => setActiveView('current')}
      >
        Активные
      </button>

      <button
        type="button"
        className={`
          ${styles.ordersPill}
          ${activeView === 'completed' && styles.activeOrdersPill}
        `}
        onClick={() => setActiveView('completed')}
      >
        Завершенные
      </button>
    </div>
  )
}