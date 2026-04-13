import { DateTabs } from "../../../entities/slot/date-tabs/component"
import { Slots } from "../../../entities/slot/slots/component"

import styles from './styles.module.css'

export const SlotSelectionPage = ({
  setCurrentStep,
  orderDays,
  activeSlotIndex,
  setActiveSlotIndex,
  selectedSlotId,
  setSelectedSlotId,
  setSelectedSlotTime
}) => {
  const chosenDay = orderDays[activeSlotIndex]

  return (
    <div className={styles.slotSelectionPage}>
      <h2>Здравствуйте</h2>

      <p>Выберите дату, на которую хотите оформить заказ</p>

      <DateTabs
        orderDays={orderDays}
        onClick={setActiveSlotIndex}
        activeIndex={activeSlotIndex}
      />

      <Slots
        key={chosenDay.id}
        setCurrentStep={setCurrentStep}
        chosenDay={chosenDay}
        selectedSlotId={selectedSlotId}
        setSelectedSlotId={setSelectedSlotId}
        setSelectedSlotTime={setSelectedSlotTime}
      />

      <button
        onClick={() => setCurrentStep('orders')}
        className={styles.ordersPageButton}
      >
        Заказы
      </button>
    </div>
  )
}
