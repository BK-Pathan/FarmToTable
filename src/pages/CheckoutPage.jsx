import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./CheckoutPage.css";
import Footer from "../components/Footer";

export default function CheckoutPage() {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: ""
  });

  const subtotal = cartItems.reduce((total, i) => total + i.price * i.quantity, 0);
  const deliveryCharges = 350; // ✅ Flat delivery for all cities
  const total = subtotal + deliveryCharges;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone || !form.city || !form.address) {
      alert("Please fill all fields!");
      return;
    }

    // Prepare cart items for WhatsApp message
    const itemsText = cartItems
      .map((i, idx) => `${idx + 1}. ${i.name} x${i.quantity} = Rs ${i.price * i.quantity}`)
      .join("\n");

    const msg = `Order Details:\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCity: ${form.city}\nAddress: ${form.address}\n\nCart Items:\n${itemsText}\n\nSubtotal: Rs ${subtotal}\nDelivery Charges: Rs ${deliveryCharges}\nTotal: Rs ${total}`;

    // Open WhatsApp with pre-filled message
    const waUrl = `https://wa.me/923301866660?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="page">
      <div className="checkout-container">
        <div className="checkout-page">
          <h2>Checkout</h2>

          <label>Name:
            <input type="text" name="name" value={form.name} onChange={handleChange} />
          </label>

          <label>Email:
            <input type="email" name="email" value={form.email} onChange={handleChange} />
          </label>

          <label>Phone:
            <input type="text" name="phone" value={form.phone} onChange={handleChange} />
          </label>

          <label>City:
            <input type="text" name="city" value={form.city} onChange={handleChange} />
          </label>

          <label>Address:
            <textarea name="address" value={form.address} onChange={handleChange} />
          </label>

          {/* Display Cart Items */}
          <div className="cart-preview">
            <h3>Items in Cart:</h3>
            {cartItems.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              <ul>
                {cartItems.map((item, idx) => (
                  <li key={item.id}>
                    {item.name} x{item.quantity} = Rs {item.price * item.quantity}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Price Summary */}
          <div className="price-summary">
            <div className="price-row"><span>Subtotal</span><span>Rs {subtotal}</span></div>
            <div className="price-row"><span>Delivery Charges</span><span>Rs {deliveryCharges}</span></div>
            <div className="price-row total"><strong>Total</strong><strong>Rs {total}</strong></div>
          </div>

          <button className="confirm-btn" onClick={handleSubmit}>Send to WhatsApp</button>
        </div>
      </div>

     
    </div>
  );
}
