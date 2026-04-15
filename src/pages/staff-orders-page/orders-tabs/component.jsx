import { Tab } from "../../../shared/ui/tab/component"

import styles from './styles.module.css'

export const OrdersTabs = ({
  activeView,
  setActiveView
}) => {
  return (
    <div className={styles.ordersTabsRow}>
      <Tab
        onClick={() => setActiveView('current')}
        isActive={activeView === 'current'}
      >
        Активные
      </Tab>

      <Tab
        onClick={() => setActiveView('completed')}
        isActive={activeView === 'completed'}
      >
        Завершенные
      </Tab>
    </div>
  )
}