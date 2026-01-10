import { FiX, FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./cartPanel.css";

export default function CartPanel({
  isOpen,
  onClose,
  cartItems,
  increaseQty,
  decreaseQty,
  removeItem
}) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryChargesDefault = 350; // default DC in cart panel
  const total = subtotal + deliveryChargesDefault;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>

        {/* Cart Header */}
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button onClick={onClose} className="close-btn">
            <FiX size={22} />
          </button>
        </div>

        {/* Cart Body */}
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <p className="empty-text">Cart is empty</p>
          ) : (
            cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="item-info">
                  <strong>{item.name}</strong>
                  <span>Rs {item.price}</span>
                </div>

                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item.id)}>
                    <FiMinus size={16} color="black" />
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQty(item.id)}>
                    <FiPlus size={16} color="black" />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Price Summary */}
        {cartItems.length > 0 && (
          <div className="price-summary">
            <div className="price-row">
              <span>Subtotal</span>
              <span>Rs {subtotal}</span>
            </div>

            <div className="price-row">
              <span>Delivery Charges</span>
              <span>Rs {deliveryChargesDefault}</span>
            </div>

            <div className="price-row total">
              <strong>Total</strong>
              <strong>Rs {total}</strong>
            </div>
          </div>
        )}

        {/* Checkout Button */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <button
              className="checkout-btn"
              onClick={() => {
                onClose(); // Close the cart panel
                navigate("/checkout", { state: { cartItems } }); // Navigate to checkout
              }}
            >
              Checkout
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
