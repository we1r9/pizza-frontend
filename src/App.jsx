import { useEffect, useState } from "react"
import { CustomerFlow } from "./pages/customer-flow/component"
import { RoleTabs } from "./shared/ui/role-tabs/component"
import { PizzaMakerPage } from "./pages/pizza-maker-page/component"
import { CashierPage } from "./pages/cashier/component"

export const App = () => {
  const [activeRole, setActiveRole] = useState('pizza-maker')

  const [orderDays, setOrderDays] = useState([])

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders')

    return savedOrders ? JSON.parse(savedOrders) : []
  })

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders))
  }, [orders])

  let content

  switch (activeRole) {
    case 'customer':
      content = (
        <CustomerFlow
          orderDays={orderDays}
          orders={orders}
          setOrders={setOrders}
          setOrderDays={setOrderDays}
        />
      )
      break

    case 'pizza-maker':
      content = (
        <PizzaMakerPage
          orderDays={orderDays}
          setOrderDays={setOrderDays}
          activeRole={activeRole}
          orders={orders}
          setOrders={setOrders}
        />
      )
      break

    case 'cashier':
      content = (
        <CashierPage
          activeRole={activeRole}
          orders={orders}
          setOrders={setOrders}
        />
      )
      break

    default:
      content = null
  }

  return (
    <div>
      <RoleTabs
        activeRole={activeRole}
        setActiveRole={setActiveRole}
      />

      {content}
    </div>
  )
}
