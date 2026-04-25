import { useState } from 'react'
import { useAppContext } from '../../../app/context'
import { EditingModal } from '../editing-modal/component'
import { getOrderStatusLabel } from '../../../shared/lib/getOrderStatusLabel'
import { OrderOverview } from '../order-overview/component'
import { OrderItemsSection } from '../order-items-section/component'
import { OrderCustomerInfo } from '../order-customer-info/component'
import { Toast } from '../../../shared/ui/toast/component'
import { OrderStatusControls } from '../order-status-controls/component'
import { useToast } from '../../../shared/hooks/useToast'
import { PaymentStatusControls } from '../payment-status-controls/component'

import sharedStyles from '../shared-styles.module.css'

export const CurrentOrder = ({ orderId }) => {
  const { activeRole, orders, setOrders } = useAppContext()
  const order = orders.find((order) => order.id === orderId)

  const [currentOrderStatus, setCurrentOrderStatus] = useState(order?.status ?? 'new')
  const [orderStatusIsChanging, setOrderStatusIsChanging] = useState(false)

  const [currentPaymentStatus, setCurrentPaymentStatus] = useState(order?.paymentStatus ?? 'unpaid')
  const [paymentStatusIsChanging, setPaymentStatusIsChanging] = useState(false)

  const [editingType, setEditingType] = useState(null)

  const { toastMessage, showToast } = useToast()

  const handleSaveOrderStatus = () => {
    setOrders((prev) =>
      prev.map((current) =>
        current.id !== order.id
          ? current
          : { ...current, status: currentOrderStatus }
      )
    )

    setOrderStatusIsChanging(false)
    showToast('Статус заказа изменен')

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleSavePaymentStatus = () => {
    setOrders((prev) =>
      prev.map((current) =>
        current.id !== order.id
          ? current
          : { ...current, paymentStatus: currentPaymentStatus }
      )
    )

    setPaymentStatusIsChanging(false)
    showToast('Статус оплаты изменен')

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleSelectOrderStatus = (status) => {
    setOrderStatusIsChanging(status !== order.status)
    setCurrentOrderStatus(status)

    setCurrentPaymentStatus(order.paymentStatus)
    setPaymentStatusIsChanging(false)
  }

  const handleSelectPaymentStatus = (status) => {
    setPaymentStatusIsChanging(status !== order.paymentStatus)
    setCurrentPaymentStatus(status)

    setCurrentOrderStatus(order.status)
    setOrderStatusIsChanging(false)
  }

  return (
    <main className={sharedStyles.main}>
      <OrderOverview order={order} />

      <OrderItemsSection order={order} />

      <OrderCustomerInfo order={order} />

      {activeRole === 'pizza-maker' && (
        <OrderStatusControls
          order={order}
          currentOrderStatus={currentOrderStatus}
          onSelectStatus={handleSelectOrderStatus}
          showCompletedOption
          actionButtonText="Сохранить"
          onActionClick={() => setEditingType('status')}
          isActionVisible={orderStatusIsChanging}
        />
      )}

      {order.paymentMethod === 'on_receipt' && (
        <PaymentStatusControls
          order={order}
          currentPaymentStatus={currentPaymentStatus}
          onSelectStatus={handleSelectPaymentStatus}
          onActionClick={() => setEditingType('payment')}
          isActionVisible={paymentStatusIsChanging}
        />
      )}

      {editingType && (
        <EditingModal
          onClose={() => setEditingType(null)}
          currentOrderStatus={getOrderStatusLabel(currentOrderStatus)}
          handleSaveOrderStatus={handleSaveOrderStatus}
          currentPaymentStatus={currentPaymentStatus}
          handleSavePaymentStatus={handleSavePaymentStatus}
          editingType={editingType}
        />
      )}

      {toastMessage && (
        <Toast toastMessage={toastMessage} />
      )}
    </main>
  )
}
