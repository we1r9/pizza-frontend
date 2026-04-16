import { useState } from "react"
import { OrdersTabs } from "./orders-tabs/component"
import { OrdersList } from "./orders-list/component"
import { CurrentOrder } from "./current-order/component"
import { CompletedOrder } from "./completed-order/component"

export const StaffOrdersPage = ({
  activeRole,
  orders,
  setOrders
}) => {
  const [activeView, setActiveView] = useState('current')
  const [selectedOrderId, setSelectedOrderId] = useState(null)

  const currentOrders = orders.filter(
    (order) =>
      order.status === 'new' ||
      order.status === 'in_progress' ||
      order.status === 'ready'
  )

  const completedOrders = orders.filter((order) => order.status === 'completed')

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

      {activeView === 'current'
        ? <h2>Активные заказы</h2>
        : <h2>Завершенные заказы</h2>
      }

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
          emptyText='Сейчас нет завершенных заказов'
          orderView='completed-order'
          setActiveView={setActiveView}
          setSelectedOrderId={setSelectedOrderId}
        />
      }
    </div>
  )
}
