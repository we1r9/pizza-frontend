export const Slot = ({
  slot,
  onClick,
  className
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
    >
      {slot.time}
    </button>
  )
}
