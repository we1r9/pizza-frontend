import styles from './styles.module.css'

export const PizzaMakerViewTabs = ({
  pizzaMakerActiveView,
  setPizzaMakerActiveView
}) => {
  return (
    <div className={styles.viewTabsRow}>
      <button
        type="button"
        className={`
          ${styles.viewPill}
          ${pizzaMakerActiveView === 'orders' && styles.activeViewPill}
        `}
        onClick={() => setPizzaMakerActiveView('orders')}
      >
        Заказы
      </button>

      <button
        type="button"
        className={`
          ${styles.viewPill}
          ${pizzaMakerActiveView === 'slots' && styles.activeViewPill}
        `}
        onClick={() => setPizzaMakerActiveView('slots')}
      >
        Управление слотами
      </button>
    </div>
  )
}
