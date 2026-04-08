export const ConfirmSlotButton = ({
  children,
  isHidden,
  setCurrentStep
}) => {
  return (
    <div>
      <button
        hidden={isHidden}
        style={{ marginTop: '20px' }}
        onClick={() => setCurrentStep('pizza')}
      >
        {children}
      </button>
    </div>
  )
}
