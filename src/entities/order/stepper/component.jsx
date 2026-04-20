import { Check } from 'lucide-react'

import styles from './styles.module.css'

export const Stepper = ({ selectedOrder }) => {
  const statusSteps = [
    { key: 'new', label: 'Принят' },
    { key: 'in_progress', label: 'Готовится' },
    { key: 'ready', label: 'Готов' },
    { key: 'completed', label: 'Выдан' }
  ]

  const currentStepIndex = statusSteps.findIndex((step) => step.key === selectedOrder.status)

  const isCompletedOrder = selectedOrder.status === 'completed'

  return (
    <div
      className={`
        ${styles.stepper}
        ${isCompletedOrder ? styles.stepperCompleted : ''}
      `}
    >
      {statusSteps.map((step, index) => {
        const isCompleted = index <= currentStepIndex

        const isLast = index === statusSteps.length - 1

        return (
          <div
            key={step.key}
            className={`
              ${styles.stepperItem}
              ${!isLast ? styles.stepperItemGrow : ''}
            `}
          >
            <div className={styles.stepperCore}>
              <div
                className={`
                  ${styles.stepCircle}
                  ${isCompleted ? styles.stepCircleActive : ''
                  }
                `}
              >
                {isCompleted ? (
                  <span className={styles.stepCircleMark}>
                    <Check size={14} strokeWidth={2.5} className={styles.stepCheckMark} />
                  </span>
                ) : (
                  <span className={styles.stepCircleDot} />
                )}
              </div>

              <span
                className={`
                  ${styles.stepLabel}
                  ${isCompleted ? styles.stepLabelActive : ''
                  }
                `}
              >
                {step.label}
              </span>
            </div>

            {!isLast && (
              <div
                className={`
                  ${styles.stepLine}
                  ${index < currentStepIndex ? styles.stepLineActive : ''
                  }
                `}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
