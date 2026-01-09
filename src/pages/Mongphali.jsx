import React from "react";
import "./Mongphali.css";

export default function Mongphali({ addToCart }) {

  const handleAddToCart = () => {
    addToCart({
      id: 5, // unique ID for Mongphali
      name: "Mongphali",
      price: 450, // price per kg
      quantity: 1
    });
  };

  return (
    <section className="product-page">
      <img src="/images/mongphali.jpg" alt="Mongphali" />
      <div className="product-info">
        <h1>Mongphali</h1>
        <p className="price">Rs. 450 / kg</p>
        <p>Delivery: 2–3 days</p>
        <p className="in-stock">In Stock</p>
        <p className="feedback">⭐⭐⭐⭐⭐ (4.7/5)</p>
        <h3>Description</h3>
        <p>Mongphali natural farms se hasil ki jati hai aur hand cleaned hoti hai.</p>

        {/* Add to Cart Button */}
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </section>
  );
}
