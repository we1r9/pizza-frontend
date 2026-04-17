import { useEffect, useState } from "react"
import { Layout } from "./app/layout/component"
import { AppContent } from "./app/app-content/component"

export const App = () => {
  const [activeRole, setActiveRole] = useState(() => {
    return sessionStorage.getItem('activeRole') || 'customer'
  })

  const [orderDays, setOrderDays] = useState(() => {
    const savedOrderDays = localStorage.getItem('orderDays')

    return savedOrderDays ? JSON.parse(savedOrderDays) : []
  })

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders')

    return savedOrders ? JSON.parse(savedOrders) : []
  })

  useEffect(() => {
    sessionStorage.setItem('activeRole', activeRole)
  }, [activeRole])


  useEffect(() => {
    localStorage.setItem('orderDays', JSON.stringify(orderDays))
  }, [orderDays])

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders))
  }, [orders])

  return (
    <Layout
      activeRole={activeRole}
      setActiveRole={setActiveRole}
    >
      <AppContent
        activeRole={activeRole}
        orderDays={orderDays}
        setOrderDays={setOrderDays}
        orders={orders}
        setOrders={setOrders}
      />
    </Layout>
  )
}
