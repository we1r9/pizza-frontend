import sharedStyles from '../shared-styles.module.css'

export const PaymentStatusControls = ({
  order,
  currentPaymentStatus,
  onSelectStatus,
  onActionClick,
  isActionVisible
}) => {
  
  return (
    <section className={sharedStyles.section}>
      <h3 className={sharedStyles.sectionTitle}>Управление статусом оплаты</h3>

      <div className={sharedStyles.controlsBlock}>
        <div className={sharedStyles.controlGroup}>

          <div className={sharedStyles.buttonsRow}>
            <button
              type='button'
              className={`${sharedStyles.pill} ${order.paymentStatus === 'unpaid' ? sharedStyles.savedPill : ''} ${currentPaymentStatus === 'unpaid' ? sharedStyles.selectedPill : ''}`}
              onClick={() => onSelectStatus('unpaid')}
            >
              Не оплачено
            </button>

            <button
              type='button'
              className={`${sharedStyles.pill} ${order.paymentStatus === 'paid' ? sharedStyles.savedPill : ''} ${currentPaymentStatus === 'paid' ? sharedStyles.selectedPill : ''}`}
              onClick={() => onSelectStatus('paid')}
            >
              Оплачено
            </button>
          </div>
        </div>
      </div>

      {isActionVisible && (
        <button
          type='button'
          onClick={onActionClick}
          className={sharedStyles.actionButton}
        >
          Сохранить
        </button>
      )}
    </section>
  )
}
