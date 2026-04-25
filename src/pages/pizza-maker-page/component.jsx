import { useEffect, useState } from "react"
import { PizzaMakerSlotsPage } from "./slots-page/component"
import { StaffOrdersPage } from "../staff-orders-page/component"

export const PizzaMakerPage = () => {
  const [pizzaMakerActiveView, setPizzaMakerActiveView] = useState(() => {
    const savedView = sessionStorage.getItem('pizzaMakerActiveView')

    return savedView === 'orders' || savedView === 'slots'
      ? savedView
      : 'slots'
  })

  useEffect(() => {
    sessionStorage.setItem('pizzaMakerActiveView', pizzaMakerActiveView)
  }, [pizzaMakerActiveView])


  let content

  switch (pizzaMakerActiveView) {
    case 'orders':
      content = (
        <StaffOrdersPage
          pizzaMakerActiveView={pizzaMakerActiveView}
          setPizzaMakerActiveView={setPizzaMakerActiveView}
        />
      )
      break

    case 'slots':
      content = (
        <PizzaMakerSlotsPage
          pizzaMakerActiveView={pizzaMakerActiveView}
          setPizzaMakerActiveView={setPizzaMakerActiveView}
        />
      )
      break

    default:
      content = null
  }

  return content
}
