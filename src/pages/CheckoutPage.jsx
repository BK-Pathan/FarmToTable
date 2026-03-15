import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    note: ""
  });

  const subtotal = cartItems.reduce((total, i) => total + i.price * i.quantity, 0);
  const deliveryCharges = 350;
  const total = subtotal + deliveryCharges;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone || !form.city || !form.address) {
      alert("Please fill all required fields!");
      return;
    }

    const itemsText = cartItems
      .map(
        (i, idx) =>
          `${idx + 1}. ${i.name} x${i.quantity} = Rs ${i.price * i.quantity}`
      )
      .join("\n");

   const msg = `Order Details:

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
City: ${form.city}
Address: ${form.address}
Note: ${form.note}

Cart Items:
${itemsText}

Subtotal: Rs ${subtotal}
Delivery Charges: Rs ${deliveryCharges}
Total: Rs ${total}`;

    const waUrl = `https://wa.me/923301866660?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="checkout-container">
      <div className="checkout-page">

        <h2>Checkout</h2>

        <form
          className="checkout-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >

          {/* LEFT SIDE FORM */}
          <div className="form-section">

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+92 300 1234567"
                 required
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Karachi"
                 required
              />
            </div>

            <div className="form-group full">
              <label>Street Address </label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="123 Main St, Apartment, etc."
                 required
              />
            </div>

            <div className="form-group full">
              <label>Order Note</label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Any special instructions?"
              />
            </div>

          </div>


          {/* RIGHT SIDE ORDER */}
          <div className="order-section">

            <div className="price-summary">

              <h3>Your Order</h3>

              <ul className="order-items">
                {cartItems.length === 0 ? (
                  <li>No items in cart.</li>
                ) : (
                  cartItems.map((item) => (
                    <li key={item.id}>
                      {item.name} x {item.quantity}:
                      <span>Rs {item.price * item.quantity}</span>
                    </li>
                  ))
                )}
              </ul>

              <div className="price-row">
                <span>Subtotal</span>
                <span>Rs {subtotal}</span>
              </div>

              <div className="price-row">
                <span>Delivery Charges</span>
                <span>Rs {deliveryCharges}</span>
              </div>

              <div className="price-row total">
                <strong>Total</strong>
                <strong>Rs {total}</strong>
              </div>

            </div>

            <button type="submit" className="confirm-btn">
              Send to WhatsApp
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}