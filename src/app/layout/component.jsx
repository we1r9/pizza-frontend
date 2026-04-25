import { useAppContext } from '@/app/context'
import { RoleTabs } from '@/shared/ui/role-tabs/component'

import styles from './styles.module.css'

export const Layout = ({ children }) => {
  const { activeRole, setActiveRole } = useAppContext()

  return (
    <div className={styles.app}>
      <RoleTabs
        activeRole={activeRole}
        setActiveRole={setActiveRole}
      />

      <div className={styles.page}>
        {children}
      </div>

      <footer className={styles.footer}>
        ООО «Детская Империя Туризма» © {new Date().getFullYear()}
      </footer>
    </div>
  )
}
