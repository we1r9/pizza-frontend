import styles from './styles.module.css'

export const ViewTabs = ({
  activeView,
  setActiveView
}) => {
  return (
    <div className={styles.viewTabsRow}>
      <button
        onClick={() => setActiveView('orders')}
        className={`
          ${styles.viewPill}
          ${activeView === 'orders' && styles.activeViewPill}
        `}>
        Заказы
      </button>

      <button
        onClick={() => setActiveView('slots')}
        className={`
          ${styles.viewPill}
          ${activeView === 'slots' && styles.activeViewPill}
        `}>
        Управление слотами
      </button>
    </div>
  )
}
