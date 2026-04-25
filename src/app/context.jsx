import { useState, useEffect, createContext, useContext } from "react"

const AppContext = createContext(null)

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const [activeRole, setActiveRole] = useState(() => {
    return sessionStorage.getItem('activeRole') || 'customer'
  })

  const [orderDays, setOrderDays] = useState(() => {
    const saved = localStorage.getItem('orderDays')
    return saved ? JSON.parse(saved) : []
  })

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders')
    return saved ? JSON.parse(saved) : []
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
    <AppContext.Provider
      value={{
        activeRole,
        setActiveRole,
        orderDays,
        setOrderDays,
        orders,
        setOrders
      }}>
      {children}
    </AppContext.Provider>
  )
}