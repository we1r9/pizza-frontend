export const pizzas = [
  {
    id: "pizza-altayskaya",
    name: "Алтайская",
    price: 650,
    weight: 700,
    description:
      "Пицца из дровяной печи на тонком тесте с тянущейся моцареллой и ароматным маслом со специями из местных травах.",
    ingredients: [
      "томатный соус",
      "ветчина",
      "моцарелла",
      "томаты",
      "базилик",
      "масло"
    ],
    removableIngredients: [
      "томаты",
      "базилик",
      "масло"
    ],
    toppings: [
      {
        id: "extra-ham",
        name: "ветчина",
        price: 90,
        weight: 60
      },
      {
        id: "extra-mozzarella",
        name: "моцарелла",
        price: 80,
        weight: 70
      }
    ],
    image: "/src/assets/altayskaya.png"
  },
  {
    id: "pizza-cheese",
    name: "Сырная",
    price: 700,
    weight: 700,
    description:
      "Пицца из дровяной печи на тонком тесте с нежным сливочным соусом, насыщенным сырным вкусом и ароматным маслом со специями из местных травах.",
    ingredients: [
      "сливочный соус",
      "моцарелла",
      "чеддер",
      "пармезан",
      "масло"
    ],
    removableIngredients: [
      "масло",
    ],
    toppings: [
      {
        id: "extra-mozzarella",
        name: "моцарелла",
        price: 80,
        weight: 70
      }
    ],
    image: "/src/assets/cheese.png"
  },
  {
    id: "pizza-pepperoni",
    name: "Пепперони",
    price: 700,
    weight: 700,
    description:
      "Пицца из дровяной печи на тонком тесте с пряной колбаской пепперони, тянущейся моцареллой и насыщенным томатным соусом.",
    ingredients: [
      "томатный соус",
      "пепперони",
      "моцарелла"
    ],
    removableIngredients: [
      "пепперони"
    ],
    toppings: [
      {
        id: "extra-pepperoni",
        name: "пепперони",
        price: 90,
        weight: 55
      },
      {
        id: "extra-mozzarella",
        name: "моцарелла",
        price: 80,
        weight: 70
      }
    ],
    image: "/src/assets/pepperoni.png"
  }
]