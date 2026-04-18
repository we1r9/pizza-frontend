import { pizzas } from "../../../shared/data/pizzas"
import { SelectedSlotInfo } from "../../../entities/slot/selected-slot-info/component"
import { PizzaGrid } from "../../../entities/pizza/pizza-grid/component"
import { GoToCartButton } from "../../../entities/order/go-to-cart-button/component"

import { ArrowLeft, ShoppingBasket } from 'lucide-react'

import styles from './styles.module.css'

export const PizzaSelectionPage = ({
  setCurrentStep,
  chosenDay,
  selectedSlotTime,
  setSelectedPizza,
  orderItems
}) => {

  const totalCost = orderItems.reduce(
    (sum, orderItem) => sum + orderItem.price * orderItem.quantity, 0
  )

  return (
    <>
      <header className={styles.topBar}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => setCurrentStep('slot')}>
          <ArrowLeft size={16} strokeWidth={2} />
          Назад
        </button>

        <div className={styles.selectedSlotInfo}>
          <SelectedSlotInfo
            chosenDay={chosenDay}
            selectedSlotTime={selectedSlotTime}
          />
        </div>
      </header>

      <main className={styles.content}>
        <h1 className={styles.sectionTitle}>Выберите пиццу</h1>

        <PizzaGrid
          pizzas={pizzas}
          setSelectedPizza={setSelectedPizza}
          setCurrentStep={setCurrentStep}
          orderItems={orderItems}
        />

        <div className={styles.actionRow}>
          <GoToCartButton
            orderItems={orderItems}
            onClick={() => setCurrentStep('order')}>
            <>
              <span>{totalCost} ₽</span>
              <ShoppingBasket size={18} strokeWidth={2} />
            </>
          </GoToCartButton>
        </div>
      </main>
    </>
  )
}
