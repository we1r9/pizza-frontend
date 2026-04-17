import { useEffect, useState } from "react"
import { ViewTabs } from "./view-tabs/component"
import { PizzaMakerSlotsPage } from "./slots-page/component"
import { StaffOrdersPage } from "../staff-orders-page/component"

export const PizzaMakerPage = ({
  orderDays,
  setOrderDays,
  activeRole,
  orders,
  setOrders
}) => {
  const [activeView, setActiveView] = useState(() => {
    const savedView = sessionStorage.getItem('pizzaMakerActiveView')

    return savedView === 'orders' || savedView === 'slots'
      ? savedView
      : 'slots'
  })

  useEffect(() => {
    sessionStorage.setItem('pizzaMakerActiveView', activeView)
  }, [activeView])

  let content

  switch (activeView) {
    case 'orders':
      content = (
        <StaffOrdersPage
          activeRole={activeRole}
          orders={orders}
          setOrders={setOrders}
        />
      )
      break

    case 'slots':
      content = (
        <PizzaMakerSlotsPage
          orderDays={orderDays}
          setOrderDays={setOrderDays}
        />
      )
      break

    default:
      content = null
  }

  return (
    <div>
      <ViewTabs
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {content}
    </div>
  )
}
