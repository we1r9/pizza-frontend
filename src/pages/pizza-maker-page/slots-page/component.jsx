import { useState } from "react"
import { formatDate } from "../../../shared/lib/formatDate"
import { EditSlotsModal } from "./edit-slots-modal/component"
import { AddSlotsModal } from "./add-slots-modal/component"

import styles from './styles.module.css'

export const PizzaMakerSlotsPage = ({
  orderDays,
  setOrderDays
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const visibleDays = orderDays.filter((day) =>
    day.availableSlots.some((slot) => !slot.expired)
  )

  const renderDaySlots = (day) => {
    const activeSlots = day.availableSlots.filter((slot) => !slot.expired && slot.enabled)

    if (!activeSlots.length) {
      return <p>Нет активных слотов на эту дату</p>
    }

    return activeSlots.map((slot) => (
      <button
        key={slot.id}
        disabled={slot.booked}
      >
        {slot.time}
      </button>
    ))
  }

  return (
    <div>
      <div className={styles.actionsRow}>
        {visibleDays.length > 0 && (
          <button onClick={() => setIsEditing(true)}>
            Редактировать слоты
          </button>
        )}

        <button onClick={() => setIsAdding(true)}>
          + Добавить слоты
        </button>
      </div>

      <div>
        <div>
          {visibleDays.length
            ? <h3>Доступные слоты</h3>
            : <div>
              <h3>Сейчас нет доступных слотов</h3>
              <p>Добавьте новые слоты, чтобы открыть запись для клиентов</p>
            </div>}
        </div>

        {visibleDays.map((day) => (
          <div key={day.id}>
            <h3>{formatDate(day.date)}</h3>
            {renderDaySlots(day)}
          </div>
        ))}
      </div>

      {isEditing &&
        <EditSlotsModal
          onClose={() => setIsEditing(false)}
          orderDays={orderDays}
          setOrderDays={setOrderDays}
        />}

      {isAdding &&
        <AddSlotsModal
          onClose={() => setIsAdding(false)}
          orderDays={orderDays}
          setOrderDays={setOrderDays}
        />}
    </div>
  )
}
