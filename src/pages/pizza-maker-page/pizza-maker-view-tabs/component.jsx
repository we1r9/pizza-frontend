import styles from './styles.module.css'

export const PizzaMakerViewTabs = ({
  pizzaMakerActiveView,
  setPizzaMakerActiveView
}) => {
  return (
    <div role="tablist" className={styles.viewTabsRow}>
      <button
        type="button"
        role="tab"
        aria-selected={pizzaMakerActiveView === 'orders'}
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
        role="tab"
        aria-selected={pizzaMakerActiveView === 'slots'}
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
