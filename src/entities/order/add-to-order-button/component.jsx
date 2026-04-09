export const AddToOrderButton = ({
  children,
  onClick
}) => {

  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}
