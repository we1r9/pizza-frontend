import { useState, useEffect } from 'react'
import { supabase } from '@/shared/api/supabase'

import altayskayaImage from '@/assets/altayskaya.webp'
import cheeseImage from '@/assets/cheese.webp'
import pepperoniImage from '@/assets/pepperoni.webp'
import altayskayaRoundedImage from '@/assets/altayskaya-rounded.webp'
import cheeseRoundedImage from '@/assets/cheese-rounded.webp'
import pepperoniRoundedImage from '@/assets/pepperoni-rounded.webp'

const imageMap = {
  'altayskaya.webp': altayskayaImage,
  'cheese.webp': cheeseImage,
  'pepperoni.webp': pepperoniImage,
  'altayskaya-rounded.webp': altayskayaRoundedImage,
  'cheese-rounded.webp': cheeseRoundedImage,
  'pepperoni-rounded.webp': pepperoniRoundedImage,
}

export const usePizzas = () => {
  const [pizzas, setPizzas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const fetchPizzas = async () => {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.from('pizzas').select('*')

      if (error) {
        setError(error)
        setLoading(false)
        return
      }

      const mapped = data.map((pizza) => ({
        id: pizza.id,
        name: pizza.name,
        price: pizza.price,
        weight: pizza.weight,
        description: pizza.description,
        ingredients: pizza.ingredients,
        removableIngredients: pizza.removable_ingredients,
        toppings: pizza.toppings ?? [],
        image: imageMap[pizza.image],
        roundedImage: imageMap[pizza.rounded_image],
      }))

      setPizzas(mapped)
      setLoading(false)
    }

    fetchPizzas()
  }, [attempt])

  const refetch = () => setAttempt((n) => n + 1)

  return { pizzas, loading, error, refetch }
}
