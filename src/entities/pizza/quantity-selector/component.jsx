export const QuantitySelector = ({
  quantity,
  setQuantity,
  className
}) => {
  return (
    <div className={className}>
      <button
        onClick={() => setQuantity((prev) => prev - 1)}
        disabled={quantity === 1}
      >
        -
      </button>

      <span>{quantity}</span>

      <button
        onClick={() => setQuantity((prev) => prev + 1)}
      >
        +
      </button>
    </div>
  )
}
