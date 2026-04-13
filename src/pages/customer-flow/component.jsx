import { useState } from "react"
import { SlotSelectionPage } from "./slot-selection-page/component"
import { PizzaSelectionPage } from "./pizza-selection-page/component"
import { PizzaDetailsPage } from "./pizza-details/component"
import { OrderConfirmationPage } from "./order-confirmation-page/component"
import { PaymentPage } from "./payment-page/component"
import { SuccessPage } from "./success-page/component"
import { OrdersPage } from "./orders-page/component"
import { OrderDetailsPage } from "./order-details-page/component"

export const CustomerFlow = ({
  orderDays,
  orders,
  setOrders
}) => {
  const [currentStep, setCurrentStep] = useState("slot")
  const [activeSlotIndex, setActiveSlotIndex] = useState(0)
  const [selectedSlotId, setSelectedSlotId] = useState(null)
  const [selectedSlotTime, setSelectedSlotTime] = useState(null)
  const [selectedPizza, setSelectedPizza] = useState(null)
  const [orderItems, setOrderItems] = useState([])
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderComment, setOrderComment] = useState('')

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
        <PizzaDetailsPage
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
          setOrderComment={setOrderComment}
        />
      )
      break

    case 'payment':
      content = (
        <PaymentPage
          setCurrentStep={setCurrentStep}
          orderItems={orderItems}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          orderDays={orderDays}
          selectedSlotTime={selectedSlotTime}
          activeSlotIndex={activeSlotIndex}
          setOrders={setOrders}
          orderComment={orderComment}
        />
      )
      break

    case 'success':
      content = (
        <SuccessPage
          setCurrentStep={setCurrentStep}
          orderDays={orderDays}
          selectedSlotTime={selectedSlotTime}
          activeSlotIndex={activeSlotIndex}
          orderItems={orderItems}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          setOrderItems={setOrderItems}
          setOrderComment={setOrderComment}
        />
      )
      break

    case 'orders':
      content = (
        <OrdersPage
          setCurrentStep={setCurrentStep}
          orders={orders}
          setOrders={setOrders}
          setSelectedOrder={setSelectedOrder}
        />
      )
      break

    case 'order-details':
      content = (
        <OrderDetailsPage
          setCurrentStep={setCurrentStep}
          selectedOrder={selectedOrder}
          orderComment={orderComment}
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
