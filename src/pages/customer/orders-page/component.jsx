export const OrdersPage = ({ setCurrentStep }) => {
  return (
    <button
      onClick={() => setCurrentStep('slot')}
    >
      ← Назад
    </button>
  )
}
