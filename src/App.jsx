import { useState } from "react"
import { orderDays } from "./shared/data/order-days"
import { SlotSelectionPage } from "./pages/customer/slot-selection-page/component"
import { PizzaSelectionPage } from "./pages/customer/pizza-selection-page/component"
import { PizzaDetails } from "./entities/pizza/pizza-details/component"
import { OrderConfirmationPage } from "./pages/customer/order-confirmation-page/component"

export const App = () => {
  const [currentStep, setCurrentStep] = useState("slot")

  const [activeSlotIndex, setActiveSlotIndex] = useState(0)
  const [selectedSlotId, setSelectedSlotId] = useState(null)
  const [selectedSlotTime, setSelectedSlotTime] = useState(null)

  const [selectedPizza, setSelectedPizza] = useState(null)
  const [orderItems, setOrderItems] = useState([])

  let content

  switch (currentStep) {
    case 'slot':
      content = (
        <SlotSelectionPage
          setCurrentStep={setCurrentStep}
          orderDays={orderDays}
          activeSlotIndex={activeSlotIndex}
          setActiveSlotIndex={setActiveSlotIndex}
          selectedSlotId={selectedSlotId}
          setSelectedSlotId={setSelectedSlotId}
          setSelectedSlotTime={setSelectedSlotTime}
        />
      )
      break

    case 'pizza':
      content = (
        <PizzaSelectionPage
          setCurrentStep={setCurrentStep}
          orderDays={orderDays}
          activeSlotIndex={activeSlotIndex}
          selectedSlotTime={selectedSlotTime}
          setSelectedPizza={setSelectedPizza}
          orderItems={orderItems}
        />
      )
      break

    case 'pizza-details':
      content = (
        <PizzaDetails
          setCurrentStep={setCurrentStep}
          selectedPizza={selectedPizza}
          setOrderItems={setOrderItems}
        />
      )
      break

    case 'order':
      content = (
        <OrderConfirmationPage
          orderDays={orderDays}
          selectedSlotTime={selectedSlotTime}
          activeSlotIndex={activeSlotIndex}
          setCurrentStep={setCurrentStep}
          orderItems={orderItems}
          setOrderItems={setOrderItems}
        />
      )
      break

    default:
      content = null
  }

  return (
    <div>{content}</div>
  )
}
