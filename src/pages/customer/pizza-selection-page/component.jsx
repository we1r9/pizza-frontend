import { pizzas } from "../../../shared/data/pizzas";
import { SelectedSlotInfo } from "../../../entities/slot/selected-slot-info/component";
import { PizzaGrid } from "../../../entities/pizza/pizza-grid/component";
import { GoToCartButton } from "../../../entities/order/go-to-cart-button/component";

export const PizzaSelectionPage = ({
  setCurrentStep,
  orderDays,
  activeSlotIndex,
  selectedSlotTime,
  setSelectedPizza,
  orderItems
}) => {

  return (
    <div>
      <button
        onClick={() => setCurrentStep('slot')}>
        ← Назад
      </button>

      <h3>Вы делаете заказ на</h3>
      <SelectedSlotInfo
        orderDays={orderDays}
        selectedSlotTime={selectedSlotTime}
        activeSlotIndex={activeSlotIndex}
      />

      <h3>Выберите товары</h3>
      <PizzaGrid
        pizzas={pizzas}
        setSelectedPizza={setSelectedPizza}
        setCurrentStep={setCurrentStep}
      />

      <GoToCartButton
        orderItems={orderItems}
        onClick={() => setCurrentStep('order')}
      />
    </div>
  )
}
