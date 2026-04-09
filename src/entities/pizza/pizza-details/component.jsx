import { useState } from "react"
import { formatIngredients } from "../../../shared/lib/formatIngredients"
import { AddToOrderButton } from "../../order/add-to-order-button/component"
import { RemovableIngredients } from "../removable-ingredients/component"
import { ToppingsSelection } from "../toppings-selection/component"
import { QuantitySelector } from "../quantity-selector/component"

import styles from './styles.module.css'

export const PizzaDetails = ({
  setCurrentStep,
  selectedPizza,
  setOrderItems,
}) => {
  const [removedIngredients, setRemovedIngredients] = useState([])
  const [addedToppings, setAddedToppings] = useState([])
  const [quantity, setQuantity] = useState(1)

  if (!selectedPizza) return null

  const handleAddToOrder = () => {
    const orderItem = {
      id: crypto.randomUUID(),
      name: selectedPizza.name,
      image: selectedPizza.image,
      price: selectedPizza.price,
      quantity,
      removedIngredients: [...removedIngredients],
      addedToppings: [...addedToppings]
    }

    setOrderItems((prev) => [...prev, orderItem])

    setRemovedIngredients([])
    setAddedToppings([])
    setQuantity(1)
    setCurrentStep('pizza')
  }

  return (
    <div>
      <button
        onClick={() => setCurrentStep('pizza')}>
        ← Назад
      </button>

      <h3>{selectedPizza.name}</h3>

      <div className={styles.pizzaImageWrapper}>
        <img
          src={selectedPizza.image}
          className={styles.pizzaImage}
          alt={selectedPizza.name}
        />
      </div>

      <p>{selectedPizza.description}</p>

      <p>
        <span>Состав: </span>
        {formatIngredients(selectedPizza.ingredients)}
      </p>

      <hr />

      <h4>Убрать из состава</h4>
      <RemovableIngredients
        removableIngredients={selectedPizza.removableIngredients}
        removedIngredients={removedIngredients}
        setRemovedIngredients={setRemovedIngredients}
      />

      <h4>Добавить топпинги</h4>
      <ToppingsSelection
        toppings={selectedPizza.toppings}
        addedToppings={addedToppings}
        setAddedToppings={setAddedToppings}
      />

      <div className={styles.actionsRow}>
        <QuantitySelector
          className={styles.quantityControls}
          quantity={quantity}
          setQuantity={setQuantity}
        />

        <AddToOrderButton onClick={handleAddToOrder}>
          Добавить в заказ
        </AddToOrderButton>
      </div>
    </div>
  )
}
