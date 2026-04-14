import { DateTabs } from "../../../entities/slot/date-tabs/component"
import { Slots } from "../../../entities/slot/slots/component"

import styles from './styles.module.css'

export const SlotSelectionPage = ({
  setCurrentStep,
  orderDays,
  chosenDay,
  selectedDayId,
  setSelectedDayId,
  selectedSlotId,
  setSelectedSlotId,
  setSelectedSlotTime
}) => {

  if (!chosenDay) {
    return (
      <div>
        <h2>Здравствуйте</h2>
        <p>Сейчас нет доступных дней для заказа</p>
      </div>
    )
  }

  return (
    <div className={styles.slotSelectionPage}>
      <h2>Здравствуйте</h2>

      <p>Выберите дату, на которую хотите оформить заказ</p>

      <DateTabs
        orderDays={orderDays}
        selectedDayId={selectedDayId}
        setSelectedDayId={setSelectedDayId}
        setSelectedSlotId={setSelectedSlotId}
        setSelectedSlotTime={setSelectedSlotTime}
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
