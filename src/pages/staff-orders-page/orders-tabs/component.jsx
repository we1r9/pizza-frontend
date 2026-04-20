import styles from './styles.module.css'

export const OrdersTabs = ({
  activeView,
  setActiveView
}) => {
  return (
    <div className={styles.ordersTabsRow}>
      <button
        onClick={() => setActiveView('current')}
        className={`
          ${styles.ordersPill}
          ${activeView === 'current' && styles.activeOrdersPill}
        `}>
        Активные
      </button>

      <button
        onClick={() => setActiveView('completed')}
        className={`
          ${styles.ordersPill}
          ${activeView === 'completed' && styles.activeOrdersPill}
        `}>
        Завершенные
      </button>
    </div>
  )
}