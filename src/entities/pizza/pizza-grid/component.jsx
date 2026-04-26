import { PizzaCard } from "../pizza-card/component"

import styles from './styles.module.css'

export const PizzaGrid = ({
  pizzas,
  setScreen,
  setSelectedPizza,
  orderItems
}) => {
  const getSelectedPizzaCount = (pizzaName) => {
    return orderItems
      .filter((item) => item.name === pizzaName)
      .reduce((total, item) => total + (item.quantity ?? 1), 0)
  }

  return (
    <div className={styles.cardContainer}>
      {pizzas.map((pizza) => {
        const selectedPizzaCount = getSelectedPizzaCount(pizza.name)

        return (
          <PizzaCard
            key={pizza.id}
            pizza={pizza}
            selectedPizzaCount={selectedPizzaCount}
            onClick={() => {
              setSelectedPizza(pizza)
              setScreen('pizza-details')
            }}
          />
        )
      })}
    </div>
  )
}
