import { Tab } from "../../../shared/ui/tab/component"

import styles from './styles.module.css'

export const ViewTabs = ({
  activeView,
  setActiveView
}) => {
  return (
    <div className={styles.viewTabsRow}>
      <Tab
        onClick={() => setActiveView('orders')}
        isActive={activeView === 'orders'}
      >
        Заказы
      </Tab>

      <Tab
        onClick={() => setActiveView('slots')}
        isActive={activeView === 'slots'}
      >
        Управление слотами
      </Tab>
    </div>
  )
}
