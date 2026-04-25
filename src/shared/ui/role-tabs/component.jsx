import styles from './styles.module.css'

export const RoleTabs = ({
  activeRole,
  setActiveRole
}) => {
  return (
    <nav aria-label="Роли">
      <div className={styles.tabContainer}>
        <input
          type="radio"
          name="role-tab"
          id="role-tab-customer"
          checked={activeRole === 'customer'}
          className={`${styles.tabInput} ${styles.tab1}`}
          onChange={() => setActiveRole('customer')}
        />
        <label
          htmlFor="role-tab-customer"
          className={styles.tabLabel}
        >
          /customer
        </label>

        <input
          type="radio"
          name="role-tab"
          id="role-tab-pizza-maker"
          checked={activeRole === 'pizza-maker'}
          className={`${styles.tabInput} ${styles.tab2}`}
          onChange={() => setActiveRole('pizza-maker')}
        />
        <label
          htmlFor="role-tab-pizza-maker"
          className={styles.tabLabel}
        >
          /pizza-maker
        </label>

        <input
          type="radio"
          name="role-tab"
          id="role-tab-cashier"
          checked={activeRole === 'cashier'}
          className={`${styles.tabInput} ${styles.tab3}`}
          onChange={() => setActiveRole('cashier')}
        />
        <label
          htmlFor="role-tab-cashier"
          className={styles.tabLabel}
        >
          /cashier
        </label>

        <div className={styles.indicator}></div>
      </div>
    </nav>
  )
}