import { useState } from "react"
import { ViewTabs } from "./view-tabs/component"
import { PizzaMakerOrdersPage } from "./orders-page/component"
import { PizzaMakerSlotsPage } from "./slots-page/component"

export const PizzaMakerPage = ({
  orderDays,
  setOrderDays
}) => {
  const [activeView, setActiveView] = useState('orders')

  let content

  switch (activeView) {
    case 'orders':
      content = (
        <PizzaMakerOrdersPage />
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
