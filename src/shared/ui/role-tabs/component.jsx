import styles from './styles.module.css'

export const RoleTabs = ({
  activeRole,
  setActiveRole
}) => {
  return (
    <div className={styles.tabContainer}>
      <input
        type='radio'
        name='role-tab'
        id='role-tab-customer'
        className={`${styles.tabInput} ${styles.tab1}`}
        checked={activeRole === 'customer'}
        onChange={() => setActiveRole('customer')}
      />
      <label
        className={styles.tabLabel}
        htmlFor='role-tab-customer'
      >
        /customer
      </label>

      <input
        type='radio'
        name='role-tab'
        id='role-tab-pizza-maker'
        className={`${styles.tabInput} ${styles.tab2}`}
        checked={activeRole === 'pizza-maker'}
        onChange={() => setActiveRole('pizza-maker')}
      />
      <label
        className={styles.tabLabel}
        htmlFor='role-tab-pizza-maker'
      >
        /pizza-maker
      </label>

      <input
        type='radio'
        name='role-tab'
        id='role-tab-cashier'
        className={`${styles.tabInput} ${styles.tab3}`}
        checked={activeRole === 'cashier'}
        onChange={() => setActiveRole('cashier')}
      />
      <label
        className={styles.tabLabel}
        htmlFor='role-tab-cashier'
      >
        /cashier
      </label>

      <div className={styles.indicator}></div>
    </div>
  )
}
