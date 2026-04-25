import { AnimatePresence, motion as Motion } from 'framer-motion'

import { useAppContext } from '../context'
import { CustomerFlow } from "../../pages/customer-flow/component"
import { PizzaMakerPage } from "../../pages/pizza-maker-page/component"
import { CashierPage } from "../../pages/cashier/component"

export const AppContent = () => {
  const { activeRole } = useAppContext()

  let content

  switch (activeRole) {
    case 'customer':
      content = <CustomerFlow />
      break

    case 'pizza-maker':
      content = <PizzaMakerPage />
      break

    case 'cashier':
      content = <CashierPage />
      break

    default:
      content = null
  }

  return (
    <AnimatePresence mode="wait">
      <Motion.div
        key={activeRole}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        {content}
      </Motion.div>
    </AnimatePresence>
  )
}
