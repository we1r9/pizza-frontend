export const AddToOrderButton = ({
  children,
  onClick
}) => {

  return (
    <button
      style={{ marginTop: "20px" }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
