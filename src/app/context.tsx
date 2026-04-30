import { useState, useEffect, createContext, useContext } from "react"
import type { ReactNode } from "react"

type Role = 'customer' | 'pizza-maker' | 'cashier'

interface Slot {
  id: string
  time: string
  enabled: boolean
  booked: boolean
}

interface OrderDay {
  id: string
  date: string
  availableSlots: Slot[]
}

interface OrderItem {
  price: number
  quantity: number
  [key: string]: unknown
}

interface Order {
  id: string
  orderNumber: number
  date: string
  time: string | null
  paymentMethod: 'card' | 'on_receipt' | null
  paymentStatus: 'paid' | 'unpaid'
  status: string
  items: OrderItem[]
  totalCost: number
  orderComment: string
}

interface AppContextValue {
  activeRole: Role
  setActiveRole: (role: Role) => void
  orderDays: OrderDay[]
  setOrderDays: React.Dispatch<React.SetStateAction<OrderDay[]>>
  orders: Order[]
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>
}

const AppContext = createContext<AppContextValue | null>(null)

export const useAppContext = (): AppContextValue => {
  const context = useContext(AppContext)

  if (!context) throw new Error()

  return context
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [activeRole, setActiveRole] = useState<Role>(() => {
    return (sessionStorage.getItem('activeRole') as Role) || 'customer'
  })

  const [orderDays, setOrderDays] = useState<OrderDay[]>(() => {
    const saved = localStorage.getItem('orderDays')
    return saved ? JSON.parse(saved) : []
  })

  const [orders, setOrders] = useState<Order[]>(() => {
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
