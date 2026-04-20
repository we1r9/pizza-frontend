import sharedStyles from '../shared-styles.module.css'

export const OrderStatusControls = ({
  order,
  currentOrderStatus,
  onSelectStatus,
  showCompletedOption = false,
  actionButtonText,
  onActionClick,
  isActionVisible
}) => {

  const isCompletedBlocked =
    currentOrderStatus === 'completed' && order.paymentStatus !== 'paid'

  return (
    <section className={sharedStyles.section}>
      <h2 className={sharedStyles.sectionTitle}>
        Управление статусом
      </h2>

      <div className={sharedStyles.controlsBlock}>
        <div className={sharedStyles.controlGroup}>
          <div className={sharedStyles.buttonsRow}>
            <button
              type='button'
              className={`${sharedStyles.pill} ${order.status === 'new' ? sharedStyles.savedPill : ''} ${currentOrderStatus === 'new' ? sharedStyles.selectedPill : ''}`}
              onClick={() => onSelectStatus('new')}>
              Новый
            </button>

            <button
              type='button'
              className={`${sharedStyles.pill} ${order.status === 'in_progress' ? sharedStyles.savedPill : ''} ${currentOrderStatus === 'in_progress' ? sharedStyles.selectedPill : ''}`}
              onClick={() => onSelectStatus('in_progress')}
            >
              Готовится
            </button>

            <button
              type='button'
              className={`${sharedStyles.pill} ${order.status === 'ready' ? sharedStyles.savedPill : ''} ${currentOrderStatus === 'ready' ? sharedStyles.selectedPill : ''}`}
              onClick={() => onSelectStatus('ready')}
            >
              Готов к выдаче
            </button>

            {showCompletedOption && (
              <button
                type='button'
                className={`${sharedStyles.pill} ${order.status === 'completed' ? sharedStyles.savedPill : ''} ${currentOrderStatus === 'completed' ? sharedStyles.selectedPill : ''}`}
                onClick={() => onSelectStatus('completed')}
              >
                Выдан
              </button>
            )}
          </div>
        </div>
      </div>

      {isActionVisible && (
        <div className={sharedStyles.actionButtonContainer}>
          <button
            type='button'
            disabled={isCompletedBlocked}
            onClick={onActionClick}
            className={`${sharedStyles.actionButton} ${isCompletedBlocked && sharedStyles.actionButtonDisabled}`}
          >
            {actionButtonText}
          </button>

          {isCompletedBlocked && (
            <span className={sharedStyles.actionWarning}>
              Нельзя выдать неоплаченный заказ
            </span>
          )}
        </div>
      )}
    </section>
  )
}
