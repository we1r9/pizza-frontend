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
  
  return (
    <section className={sharedStyles.section}>
      <h3 className={sharedStyles.sectionTitle}>Управление статусом заказа</h3>

      <div className={sharedStyles.controlsBlock}>
        <div className={sharedStyles.controlGroup}>
          <div className={sharedStyles.buttonsRow}>
            <button
              type='button'
              className={`${sharedStyles.pill} ${order.status === 'new' ? sharedStyles.savedPill : ''} ${currentOrderStatus === 'new' ? sharedStyles.selectedPill : ''}`}
              onClick={() => onSelectStatus('new')}
            >
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
        <button
          type='button'
          onClick={onActionClick}
          className={sharedStyles.actionButton}
        >
          {actionButtonText}
        </button>
      )}
    </section>
  )
}
