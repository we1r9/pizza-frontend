import styles from './styles.module.css'

export const OrdersTabs = ({
  activeView,
  setActiveView
}) => {
  return (
    <div role="tablist" className={styles.ordersTabsRow}>
      <button
        type="button"
        role="tab"
        aria-selected={activeView === 'current'}
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
        role="tab"
        aria-selected={activeView === 'completed'}
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