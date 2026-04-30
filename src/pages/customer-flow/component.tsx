import { useEffect, useState } from "react"
import type { ReactNode } from "react"

import { AnimatePresence, motion as Motion } from 'framer-motion'
import { useAppContext } from "@/app/context"
import { isSlotExpired } from '@/shared/lib/isSlotExpired'
import { preloadImages } from "@/shared/lib/preloadImages"
import { usePizzas } from "@/entities/pizza/model/usePizzas"
import { SlotSelectionPage } from "./slot-selection-page/component"
import { PizzaSelectionPage } from "./pizza-selection-page/component"
import { PizzaDetailsPage } from "./pizza-details-page/component"
import { OrderConfirmationPage } from "./order-confirmation-page/component"
import { PaymentPage } from "./payment-page/component"
import { SuccessPage } from "./success-page/component"
import { OrdersPage } from "./orders-page/component"
import { OrderDetailsPage } from "./order-details-page/component"

type Screen =
  | 'slot'
  | 'pizza'
  | 'pizza-details'
  | 'order'
  | 'payment'
  | 'success'
  | 'orders'
  | 'order-details'

export const CustomerFlow = () => {
  const { orderDays } = useAppContext()
  const { pizzas, loading, error, refetch } = usePizzas()

  useEffect(() => {
    if (pizzas.length > 0) {
      preloadImages(
        pizzas.flatMap((pizza: {
          image: string;
          roundedImage: string
        }) =>
          [pizza.image, pizza.roundedImage].filter(Boolean)
        )
      )
    }
  }, [pizzas])

  const [screen, setScreen] = useState<Screen>('slot')

  const visibleOrderDays = orderDays.filter((day: {
    date: string;
    availableSlots: {
      time: string;
      enabled: boolean;
      booked: boolean
    }[]
  }) =>
    day.availableSlots.some(
      (slot) => !isSlotExpired(day.date, slot.time) && slot.enabled && !slot.booked
    )
  )

  const [selectedDayId, setSelectedDayId] = useState<string | null>(visibleOrderDays[0]?.id ?? null)
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null)
  const [selectedSlotTime, setSelectedSlotTime] = useState<string | null>(null)

  const [selectedPizza, setSelectedPizza] = useState<unknown>(null)
  const [orderItems, setOrderItems] = useState<unknown[]>([])
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'on_receipt' | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<unknown>(null)
  const [orderComment, setOrderComment] = useState<string>('')

  const actualSelectedDayId = visibleOrderDays.some((day: { id: string }) => day.id === selectedDayId)
    ? selectedDayId
    : visibleOrderDays[0]?.id ?? null

  const chosenDay = visibleOrderDays.find((day: { id: string }) => day.id === actualSelectedDayId)

  let content: ReactNode

  switch (screen) {
    case 'slot':
      content = (
        <SlotSelectionPage
          setScreen={setScreen}
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
          setScreen={setScreen}
          chosenDay={chosenDay}
          selectedSlotTime={selectedSlotTime}
          setSelectedPizza={setSelectedPizza}
          orderItems={orderItems}
          pizzas={pizzas}
          loading={loading}
          error={error}
          refetch={refetch}
        />
      )
      break

    case 'pizza-details':
      content = (
        <PizzaDetailsPage
          setScreen={setScreen}
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
          orderComment={orderComment}
          setOrderComment={setOrderComment}
          setScreen={setScreen}
        />
      )
      break

    case 'payment':
      content = (
        <PaymentPage
          setScreen={setScreen}
          orderItems={orderItems}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          chosenDay={chosenDay}
          selectedSlotId={selectedSlotId}
          selectedSlotTime={selectedSlotTime}
          orderComment={orderComment}
        />
      )
      break

    case 'success':
      content = (
        <SuccessPage
          setScreen={setScreen}
          chosenDay={chosenDay}
          selectedSlotTime={selectedSlotTime}
          orderItems={orderItems}
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
          setScreen={setScreen}
          setSelectedOrder={setSelectedOrder}
        />
      )
      break

    case 'order-details':
      content = (
        <OrderDetailsPage
          setScreen={setScreen}
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
        key={screen}
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
