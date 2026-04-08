import { PizzaCard } from "../pizza-card/component"

import styles from './styles.module.css'

export const PizzaGrid = ({
  pizzas,
  setCurrentStep,
  setSelectedPizza
}) => {
  return (
    <div className={styles.cardContainer}>
      {pizzas.map((pizza) => (
        <PizzaCard
          key={pizza.id}
          pizza={pizza}
          onClick={() => {
            setSelectedPizza(pizza)
            setCurrentStep('pizza-details')
          }}
        />
      ))}
    </div>
  )
}
