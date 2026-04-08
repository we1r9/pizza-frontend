import { OrderItems } from "../../../entities/order/order-items/component"

export const OrderConfirmationPage = ({
  setCurrentStep,
  orderItems
}) => {
  return (
    <div>
      <button
        onClick={() => setCurrentStep('pizza')}>
        ← Назад
      </button>
      <OrderItems orderItems={orderItems} />
    </div>
  )
}
