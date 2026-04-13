export const Tab = ({
  children,
  onClick,
  isActive,
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        disabled={isActive}
      >
        {children}
      </button>
    </div>
  )
}
