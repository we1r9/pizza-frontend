import { useEffect, useState } from "react"
import { OrdersTabs } from "./orders-tabs/component"
import { OrdersList } from "./orders-list/component"
import { CurrentOrder } from "./current-order/component"
import { CompletedOrder } from "./completed-order/component"

import sharedStyles from './shared-styles.module.css'

export const StaffOrdersPage = ({
  activeRole,
  orders,
  setOrders
}) => {
  const [activeView, setActiveView] = useState(() => {
    const savedView = sessionStorage.getItem('staffOrdersActiveView')
    return savedView === 'current' || savedView === 'completed'
      ? savedView
      : 'current'
  })

  useEffect(() => {
    if (activeView === 'current' || activeView === 'completed') {
      sessionStorage.setItem('staffOrdersActiveView', activeView)
    }
  }, [activeView])

  const [selectedOrderId, setSelectedOrderId] = useState(null)

  const sortOrdersByDateAndTime = (orders, direction = 'asc') => {
    return [...orders].sort((a, b) => {
      const dateCompare =
        direction === 'asc'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date)

      if (dateCompare !== 0) return dateCompare

      return direction === 'asc'
        ? a.time.localeCompare(b.time)
        : b.time.localeCompare(a.time)
    })
  }

  const currentOrders = sortOrdersByDateAndTime(
    orders.filter((order) =>
      order.status === 'new' ||
      order.status === 'in_progress' ||
      order.status === 'ready'
    ),
    'asc'
  )

  const completedOrders = sortOrdersByDateAndTime(
    orders.filter((order) => order.status === 'completed'),
    'desc'
  )

  const isCurrentView = activeView === 'current'
  const ordersTitle = isCurrentView ? 'Активные заказы' : 'Завершенные заказы'
  const ordersCount = isCurrentView ? currentOrders.length : completedOrders.length

  const handleReturn = () => {
    activeView === 'current-order'
      ? setActiveView('current')
      : setActiveView('completed')

    setSelectedOrderId(null)
  }

  if (activeView === 'current-order') {
    return (
      <div>
        <button onClick={handleReturn}>
          ← Назад
        </button>

        <CurrentOrder
          key={selectedOrderId}
          orders={orders}
          orderId={selectedOrderId}
          activeRole={activeRole}
          setOrders={setOrders}
        />
      </div>
    )
  }

  if (activeView === 'completed-order') {
    return (
      <div>
        <button onClick={handleReturn}>
          ← Назад
        </button>

        <CompletedOrder
          key={selectedOrderId}
          orders={orders}
          orderId={selectedOrderId}
          activeRole={activeRole}
          setOrders={setOrders}
        />
      </div>
    )
  }

  return (
    <div>
      <OrdersTabs
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <h2>
        {ordersTitle}
        {ordersCount > 0 && (
          <span className={sharedStyles.ordersCountBadge}>
            {ordersCount}
          </span>
        )}
      </h2>

      {activeView === 'current'
        ? <OrdersList
          orders={currentOrders}
          emptyText='Сейчас нет активных заказов. Новые заказы появятся здесь.'
          orderView='current-order'
          setActiveView={setActiveView}
          setSelectedOrderId={setSelectedOrderId}
        />
        : <OrdersList
          orders={completedOrders}
          emptyText='Пока что нет завершенных заказов.'
          orderView='completed-order'
          setActiveView={setActiveView}
          setSelectedOrderId={setSelectedOrderId}
        />
      }
    </div>
  )
}
