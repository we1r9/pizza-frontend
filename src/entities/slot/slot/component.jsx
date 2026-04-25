export const Slot = ({
  slot,
  onClick,
  className,
  isBooked
}) => {
  return (
    <button
      type="button"
      disabled={isBooked}
      className={className}
      onClick={onClick}
    >
      {slot.time}
    </button>
  )
}
