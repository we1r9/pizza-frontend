import { CustomerFlow } from "../../pages/customer-flow/component"
import { PizzaMakerPage } from "../../pages/pizza-maker-page/component"
import { CashierPage } from "../../pages/cashier/component"

export const AppContent = ({
  activeRole,
  orderDays,
  setOrderDays,
  orders,
  setOrders
}) => {
  switch (activeRole) {
    case 'customer':
      return (
        <CustomerFlow
          orderDays={orderDays}
          orders={orders}
          setOrders={setOrders}
          setOrderDays={setOrderDays}
        />
      )

    case 'pizza-maker':
      return (
        <PizzaMakerPage
          orderDays={orderDays}
          setOrderDays={setOrderDays}
          activeRole={activeRole}
          orders={orders}
          setOrders={setOrders}
        />
      )

    case 'cashier':
      return (
        <CashierPage
          activeRole={activeRole}
          orders={orders}
          setOrders={setOrders}
        />
      )

    default:
      return null
  }
}
