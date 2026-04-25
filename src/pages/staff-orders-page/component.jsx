import { useEffect, useState } from "react"
import { useAppContext } from "../../app/context"
import { OrdersTabs } from "./orders-tabs/component"
import { OrdersList } from "./orders-list/component"
import { CurrentOrder } from "./current-order/component"
import { CompletedOrder } from "./completed-order/component"
import { PizzaMakerViewTabs } from "../pizza-maker-page/pizza-maker-view-tabs/component"

import { ArrowLeft } from "lucide-react"

import sharedStyles from './shared-styles.module.css'

export const StaffOrdersPage = ({
  pizzaMakerActiveView,
  setPizzaMakerActiveView
}) => {
  const { activeRole, orders } = useAppContext()
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
      <>
        <header>
          <button
            type="button"
            className={sharedStyles.backButton}
            onClick={handleReturn}
          >
            <ArrowLeft size={16} strokeWidth={2} />
            Назад
          </button>
        </header>

        <CurrentOrder
          key={selectedOrderId}
          orderId={selectedOrderId}
        />
      </>
    )
  }

  if (activeView === 'completed-order') {
    return (
      <>
        <header>
          <button
            type="button"
            className={sharedStyles.backButton}
            onClick={handleReturn}
          >
            <ArrowLeft size={16} strokeWidth={2} />
            Назад
          </button>
        </header>

        <CompletedOrder
          key={selectedOrderId}
          orderId={selectedOrderId}
        />
      </>
    )
  }

  return (
    <>
      <header>
        {activeRole === 'pizza-maker' && (
          <PizzaMakerViewTabs
            pizzaMakerActiveView={pizzaMakerActiveView}
            setPizzaMakerActiveView={setPizzaMakerActiveView} />
        )}

        <OrdersTabs
          activeView={activeView}
          setActiveView={setActiveView} />
      </header>

      <div className={sharedStyles.ordersTitleWrapper}>
        <span className={sharedStyles.ordersTitle}>
          {ordersTitle}
        </span>

        {ordersCount > 0 && (
          <span className={sharedStyles.ordersCountBadge}>
            {ordersCount}
          </span>
        )}
      </div>

      {activeView === 'current'
        ? <OrdersList
          orders={currentOrders}
          emptyText='Сейчас нет активных заказов'
          orderView='current-order'
          setActiveView={setActiveView}
          setSelectedOrderId={setSelectedOrderId}
        />
        : <OrdersList
          orders={completedOrders}
          emptyText='Пока что нет завершенных заказов'
          orderView='completed-order'
          setActiveView={setActiveView}
          setSelectedOrderId={setSelectedOrderId}
        />
      }
    </>
  )
}
