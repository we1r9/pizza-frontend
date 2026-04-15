import { Tab } from "../tab/component"

import styles from './styles.module.css'

export const RoleTabs = ({
  activeRole,
  setActiveRole
}) => {
  return (
    <div className={styles.tabsRow}>
      <Tab
        onClick={() => setActiveRole('customer')}
        isActive={activeRole === 'customer'}
      >
        /customer
      </Tab>

      <Tab
        onClick={() => setActiveRole('pizza-maker')}
        isActive={activeRole === 'pizza-maker'}
      >
        /pizza-maker
      </Tab>

      <Tab
        onClick={() => setActiveRole('cashier')}
        isActive={activeRole === 'cashier'}
      >
        /cashier
      </Tab>
    </div>
  )
}
