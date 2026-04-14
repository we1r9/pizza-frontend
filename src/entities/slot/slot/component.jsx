export const Slot = ({
  slot,
  onClick,
  className,
  isBooked
}) => {
  return (
    <button
      disabled={isBooked}
      onClick={onClick}
      className={className}
    >
      {slot.time}
    </button>
  )
}
