import { useEffect, useState } from "react"
import { CustomerFlow } from "./pages/customer-flow/component"
import { RoleTabs } from "./shared/ui/role-tabs/component"

export const App = () => {
  const [activeRole, setActiveRole] = useState('customer')

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
          orders={orders}
          setOrders={setOrders}
        />
      )
      break

    case 'pizza-maker':
      content = (
        <div>
          Pizza Maker Page
        </div>
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
