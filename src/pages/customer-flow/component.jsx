import { AnimatePresence, motion as Motion } from 'framer-motion'

import { useEffect, useState } from "react"
import { isSlotExpired } from '../../shared/lib/isSlotExpired'
import { preloadImages } from "../../shared/lib/preloadImages"
import { pizzas } from "../../shared/data/pizzas"
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
  setOrders,
  setOrderDays
}) => {
  useEffect(() => {
    preloadImages(pizzas.map((pizza) => pizza.image))
  }, [])

  const [currentStep, setCurrentStep] = useState('slot')

  const visibleOrderDays = orderDays.filter((day) =>
    day.availableSlots.some(
      (slot) => !isSlotExpired(day.date, slot.time) && slot.enabled
    )
  )

  const [selectedDayId, setSelectedDayId] = useState(visibleOrderDays[0]?.id ?? null)
  const [selectedSlotId, setSelectedSlotId] = useState(null)
  const [selectedSlotTime, setSelectedSlotTime] = useState(null)

  const [selectedPizza, setSelectedPizza] = useState(null)
  const [orderItems, setOrderItems] = useState([])
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderComment, setOrderComment] = useState('')

  const actualSelectedDayId = visibleOrderDays.some((day) => day.id === selectedDayId)
    ? selectedDayId
    : visibleOrderDays[0]?.id ?? null

  const chosenDay = visibleOrderDays.find((day) => day.id === actualSelectedDayId)

  let content

  switch (currentStep) {
    case 'slot':
      content = (
        <SlotSelectionPage
          setCurrentStep={setCurrentStep}
          orderDays={orderDays}
          chosenDay={chosenDay}
          selectedDayId={actualSelectedDayId}
          setSelectedDayId={setSelectedDayId}
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
          chosenDay={chosenDay}
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
          chosenDay={chosenDay}
          selectedSlotId={selectedSlotId}
          selectedSlotTime={selectedSlotTime}
          orderItems={orderItems}
          setOrderItems={setOrderItems}
          setOrderComment={setOrderComment}
          setCurrentStep={setCurrentStep}
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
          chosenDay={chosenDay}
          selectedSlotId={selectedSlotId}
          selectedSlotTime={selectedSlotTime}
          setOrders={setOrders}
          setOrderDays={setOrderDays}
          orderComment={orderComment}
        />
      )
      break

    case 'success':
      content = (
        <SuccessPage
          setCurrentStep={setCurrentStep}
          chosenDay={chosenDay}
          selectedSlotTime={selectedSlotTime}
          orderItems={orderItems}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          setOrderItems={setOrderItems}
          setOrderComment={setOrderComment}
          setSelectedSlotId={setSelectedSlotId}
          setSelectedSlotTime={setSelectedSlotTime}
        />
      )
      break

    case 'orders':
      content = (
        <OrdersPage
          setCurrentStep={setCurrentStep}
          orders={orders}
          setOrders={setOrders}
          setOrderDays={setOrderDays}
          setSelectedOrder={setSelectedOrder}
        />
      )
      break

    case 'order-details':
      content = (
        <OrderDetailsPage
          setCurrentStep={setCurrentStep}
          selectedOrder={selectedOrder}
        />
      )
      break

    default:
      content = null
  }

  return (
    <AnimatePresence mode="wait">
      <Motion.div
        key={currentStep}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        {content}
      </Motion.div>
    </AnimatePresence>
  )
}
