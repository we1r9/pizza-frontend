import { StaffOrdersPage } from "../staff-orders-page/component"

export const CashierPage = ({
  activeRole,
  orders,
  setOrders
}) => {
  return (
    <StaffOrdersPage
      activeRole={activeRole}
      orders={orders}
      setOrders={setOrders}
    />
  )
}
