import { useState } from "react"
import { formatDate } from "../../../shared/lib/formatDate"
import { EditSlotsModal } from "./edit-slots-modal/component"
import { AddSlotsModal } from "./add-slots-modal/component"
import { isSlotExpired } from "../../../shared/lib/isSlotExpired"
import { PizzaMakerViewTabs } from "../pizza-maker-view-tabs/component"

import { Pencil, Plus } from 'lucide-react'

import styles from './styles.module.css'

export const PizzaMakerSlotsPage = ({
  orderDays,
  setOrderDays,
  pizzaMakerActiveView,
  setPizzaMakerActiveView
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const visibleDays = orderDays.filter((day) =>
    day.availableSlots.some(
      (slot) => !isSlotExpired(day.date, slot.time) || slot.booked
    )
  )

  const hasVisibleDays = visibleDays.length > 0

  const renderDaySlots = (day) => {
    const displaySlots = day.availableSlots.filter(
      (slot) =>
        (!isSlotExpired(day.date, slot.time) || slot.booked) && slot.enabled
    )

    if (!displaySlots.length) {
      return (
        <p className={styles.emptyActiveSlotsText}>
          На эту дату нет актуальных слотов
        </p>
      )
    }

    return displaySlots.map((slot) => (
      <span
        key={slot.id}
        className={`
          ${styles.slotPill}
          ${slot.booked && styles.bookedPill}`}>
        {slot.time}
      </span>
    ))
  }

  return (
    <>
      <PizzaMakerViewTabs
        pizzaMakerActiveView={pizzaMakerActiveView}
        setPizzaMakerActiveView={setPizzaMakerActiveView}
      />

      <div className={styles.actionsRow}>
        {hasVisibleDays > 0 && (
          <>
            <button
              className={`${styles.actionButton} ${styles.editSlotsButton}`}
              onClick={() => setIsEditing(true)}>
              <Pencil size={11.5} strokeWidth={2} />
              Редактировать
            </button>

            <button
              className={`${styles.actionButton} ${styles.addSlotsButton}`}
              onClick={() => setIsAdding(true)}>
              <Plus size={16} strokeWidth={2} />
              Добавить слоты
            </button>
          </>
        )}
      </div>

      <div className={styles.titleRow}>
        {hasVisibleDays
          ? <h2 className={styles.title}>
            Актуальные слоты
          </h2>
          : <section className={styles.fallbackSection}>
            <h3 className={styles.emptyStateTitle}>
              Сейчас нет доступных слотов
            </h3>

            <p className={styles.emptyStateText}>
              Добавьте новые слоты, чтобы открыть запись для клиентов
            </p>

            <button
              className={styles.addSlotsButtonStart}
              onClick={() => setIsAdding(true)}>
              <Plus size={16} strokeWidth={2} />

              Добавить слоты
            </button>
          </section>}
      </div>

      {visibleDays.map((day) => (
        <section
          key={day.id}
          className={styles.section}>
          <h3 className={styles.dateTitle}>
            {formatDate(day.date)}
          </h3>

          <div className={styles.slotsContainer}>
            {renderDaySlots(day)}
          </div>
        </section>
      ))}

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
    </>
  )
}
