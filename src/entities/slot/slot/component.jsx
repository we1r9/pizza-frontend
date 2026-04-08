export const Slot = ({ 
  slot,
  isActive,
  onClick,
  className
}) => {
  return (
    <button
      disabled={isActive}
      onClick={onClick}
      className={className}
    >
      {slot.time}
    </button>
  )
}
