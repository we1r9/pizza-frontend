import { useState } from "react"
import { formatIngredients } from "@/shared/lib/formatIngredients"
import { RemovableIngredients } from "@/entities/pizza/removable-ingredients/component"
import { ToppingsSelection } from "@/entities/pizza/toppings-selection/component"
import { AddToOrderButton } from "@/entities/order/add-to-order-button/component"

import { X, Plus } from 'lucide-react'

import styles from './styles.module.css'

export const PizzaDetailsPage = ({
  setCurrentStep,
  selectedPizza,
  setOrderItems,
}) => {
  const [removedIngredients, setRemovedIngredients] = useState([])
  const [addedToppings, setAddedToppings] = useState([])

  if (!selectedPizza) return null

  const toppingsTotalPrice = addedToppings.reduce(
    (total, topping) => total + topping.price,
    0
  )

  const totalPrice = selectedPizza.price + toppingsTotalPrice

  const handleAddItemToOrder = () => {
    const normalizedRemovedIngredients = [...removedIngredients].sort()

    const normalizedAddedToppingIds = [...addedToppings]
      .map((topping) => topping.id)
      .sort()

    setOrderItems((prev) => {
      const existingItem = prev.find((orderItem) => {
        const orderItemRemovedIngredients = [...orderItem.removedIngredients].sort()

        const orderItemAddedToppingIds = [...orderItem.addedToppings]
          .map((topping) => topping.id)
          .sort()

        const sameName = orderItem.name === selectedPizza.name
        const sameRemovedIngredients =
          JSON.stringify(orderItemRemovedIngredients) === JSON.stringify(normalizedRemovedIngredients)
        const sameAddedToppings =
          JSON.stringify(orderItemAddedToppingIds) === JSON.stringify(normalizedAddedToppingIds)

        return sameName && sameRemovedIngredients && sameAddedToppings
      })

      if (existingItem) {
        return prev.map((orderItem) =>
          orderItem.id === existingItem.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        )
      }

      const newOrderItem = {
        id: crypto.randomUUID(),
        name: selectedPizza.name,
        image: selectedPizza.image,
        roundedImage: selectedPizza.roundedImage,
        price: totalPrice,
        quantity: 1,
        removedIngredients: [...removedIngredients],
        addedToppings: [...addedToppings]
      }

      return [...prev, newOrderItem]
    })

    setRemovedIngredients([])
    setAddedToppings([])
    setCurrentStep('pizza')
  }

  return (
    <>
      <header className={styles.topBar}>
        <button
          type="button"
          aria-label="Назад к меню"
          className={styles.backButton}
          onClick={() => setCurrentStep('pizza')}
        >
          <X size={20} strokeWidth={2.2} />
        </button>
      </header>

      <main className={styles.pageMain}>
        <div className={styles.pizzaImageWrapper}>
          <img
            src={selectedPizza.image}
            className={styles.pizzaImage}
            alt={selectedPizza.name} />
        </div>

        <h2 className={styles.pizzaName}>
          {selectedPizza.name}
        </h2>

        <div className={styles.descriptionWrapper}>
          <p>{selectedPizza.description}</p>
        </div>

        <p className={styles.ingredientsPill}>
          <span className={styles.ingredientsLabel}>Состав: </span>
          <span className={styles.ingredientsText}>
            {formatIngredients(selectedPizza.ingredients)}
          </span>
        </p>

        <div className={styles.toppingsSelectionWrapper}>
          <h3 className={styles.sectionTitle}>Добавить по вкусу</h3>

          <ToppingsSelection
            toppings={selectedPizza.toppings}
            addedToppings={addedToppings}
            setAddedToppings={setAddedToppings} />
        </div>

        <div className={styles.removableIngredientsWrapper}>
          <h3 className={styles.sectionTitle}>Убрать ингредиенты</h3>

          <RemovableIngredients
            removableIngredients={selectedPizza.removableIngredients}
            removedIngredients={removedIngredients}
            setRemovedIngredients={setRemovedIngredients} />
        </div>

        <div className={styles.actionsRow}>
          <AddToOrderButton onClick={handleAddItemToOrder}>
            <Plus size={22} strokeWidth={2} />

            <span
              key={totalPrice}
              className={styles.priceValue}>
              {totalPrice} ₽
            </span>
          </AddToOrderButton>
        </div>
      </main>
    </>
  )
}
