import { DateTabs } from "@/entities/slot/date-tabs/component"
import { Slots } from "@/entities/slot/slots/component"
import { isSlotExpired } from "@/shared/lib/isSlotExpired"

import styles from './styles.module.css'

export const SlotSelectionPage = ({
  setScreen,
  orderDays,
  chosenDay,
  selectedDayId,
  setSelectedDayId,
  selectedSlotId,
  setSelectedSlotId,
  setSelectedSlotTime
}) => {

  const availableDays = orderDays.filter((day) =>
    day.availableSlots.some(
      (slot) =>
        !isSlotExpired(day.date, slot.time) &&
        slot.enabled &&
        !slot.booked
    )
  )

  if (!availableDays.length) {
    return (
      <div className={styles.page}>
        <header className={styles.topBar}>
          <span aria-hidden="true" className={styles.logo}>🍕</span>

          <button
            type="button"
            className={styles.ordersButton}
            onClick={() => setScreen('orders')}
          >
            Мои заказы
          </button>
        </header>

        <section className={styles.hero}>
          <h1 className={styles.title}>Добрый день!</h1>

          <div className={styles.emptyState}>
            <p className={styles.subtitle}>
              Свободного времени для заказа пока нет.
            </p>
            <p className={styles.subtitle}>
              Загляните к нам позже
            </p>
            <p
              aria-hidden="true"
              className={styles.emptyStateFace}
            >
              (ಠ‿ಠ)
            </p>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <span aria-hidden="true" className={styles.logo}>🍕</span>
        <button
          type="button"
          className={styles.ordersButton}
          onClick={() => setScreen('orders')}
        >
          Мои заказы
        </button>
      </header>

      <section className={styles.hero}>
        <h1 className={styles.title}>Добрый день!</h1>
        <p className={styles.subtitle}>
          Когда вы хотите получить заказ?
        </p>
      </section>

      <main className={styles.content}>
        <DateTabs
          orderDays={orderDays}
          selectedDayId={selectedDayId}
          setSelectedDayId={setSelectedDayId}
          setSelectedSlotId={setSelectedSlotId}
          setSelectedSlotTime={setSelectedSlotTime}
          className={styles.availableDatesRow}
        />

        <Slots
          key={chosenDay.id}
          setScreen={setScreen}
          chosenDay={chosenDay}
          selectedSlotId={selectedSlotId}
          setSelectedSlotId={setSelectedSlotId}
          setSelectedSlotTime={setSelectedSlotTime}
          className={styles.availableSlotsContainer}
        />
      </main>
    </div>
  )
}
