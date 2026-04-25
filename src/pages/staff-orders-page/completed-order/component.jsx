import { useState } from "react"
import { useAppContext } from "@/app/context"
import { getOrderStatusLabel } from "@/shared/lib/getOrderStatusLabel"
import { EditingModal } from "../editing-modal/component"
import { OrderOverview } from "../order-overview/component"
import { OrderItemsSection } from "../order-items-section/component"
import { OrderCustomerInfo } from "../order-customer-info/component"
import { Toast } from "@/shared/ui/toast/component"
import { OrderStatusControls } from "../order-status-controls/component"
import { useToast } from "@/shared/hooks/useToast"

import sharedStyles from '../shared-styles.module.css'

export const CompletedOrder = ({ orderId }) => {
  const { activeRole, orders, setOrders } = useAppContext()
  const order = orders.find((order) => order.id === orderId)

  const [currentOrderStatus, setCurrentOrderStatus] = useState(order?.status ?? 'new')
  const [orderStatusIsChanging, setOrderStatusIsChanging] = useState(false)

  const [editingType, setEditingType] = useState(null)

  const { toastMessage, showToast } = useToast()

  if (!order) {
    return <p>Заказ не найден</p>
  }

  const handleSelectOrderStatus = (status) => {
    setOrderStatusIsChanging(status !== order.status)
    setCurrentOrderStatus(status)
  }

  const handleReturnOrderToActive = () => {
    setOrders((prev) =>
      prev.map((current) =>
        current.id !== order.id
          ? current
          : { ...current, status: currentOrderStatus }
      )
    )

    setOrderStatusIsChanging(false)
    showToast('Заказ возвращен в работу')

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <main className={sharedStyles.main}>
      <OrderOverview
        order={order}
        showOrderStatus={false}
      />

      <OrderItemsSection order={order} />

      <OrderCustomerInfo order={order} />

      {activeRole === 'pizza-maker' && (
        <OrderStatusControls
          order={order}
          currentOrderStatus={currentOrderStatus}
          onSelectStatus={handleSelectOrderStatus}
          showCompletedOption={false}
          actionButtonText="Вернуть в работу"
          onActionClick={() => setEditingType('return')}
          isActionVisible={orderStatusIsChanging}
        />
      )}

      {editingType && (
        <EditingModal
          onClose={() => setEditingType(null)}
          currentOrderStatus={getOrderStatusLabel(currentOrderStatus)}
          handleReturnOrderToActive={handleReturnOrderToActive}
          editingType={editingType}
        />
      )}

      {toastMessage && (
        <Toast toastMessage={toastMessage} />
      )}
    </main>
  )
}
