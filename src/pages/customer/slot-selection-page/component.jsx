import { DateTabs } from "../../../entities/slot/date-tabs/component";
import { Slots } from "../../../entities/slot/slots/component";

export const SlotSelectionPage = ({
  orderDays,
  setCurrentStep,
  selectedSlotId,
  setSelectedSlotId,
  setSelectedSlotTime,
  activeSlotIndex,
  setActiveSlotIndex
}) => {
  const chosenDay = orderDays[activeSlotIndex];

  return (
    <div>
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
    </div>
  )
}
