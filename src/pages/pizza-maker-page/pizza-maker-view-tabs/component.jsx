import styles from './styles.module.css'

export const PizzaMakerViewTabs = ({
  pizzaMakerActiveView,
  setPizzaMakerActiveView
}) => {
  return (
    <div className={styles.viewTabsRow}>
      <button
        onClick={() => setPizzaMakerActiveView('orders')}
        className={`
          ${styles.viewPill}
          ${pizzaMakerActiveView === 'orders' && styles.activeViewPill}
        `}>
        Заказы
      </button>

      <button
        onClick={() => setPizzaMakerActiveView('slots')}
        className={`
          ${styles.viewPill}
          ${pizzaMakerActiveView === 'slots' && styles.activeViewPill}
        `}>
        Управление слотами
      </button>
    </div>
  )
}
