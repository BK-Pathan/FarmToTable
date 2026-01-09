import React from "react";
import "../pages/ProductPage.css"

export default function Honey({ addToCart }) {

  const handleAddToCart = () => {
    addToCart({
      id: 1, // unique ID for Honey
      name: "Honey",
      price: 2200, // price per kg
      quantity: 1 // default 1 since no qty selector
    });
  };

  return (
    <section className="product-page">
      <img src="/images/honey.jpg" alt="Honey" />
      <div className="product-info">
        <h1>Honey</h1>
        <p className="price">Rs. 2,200 / kg</p>
        <p>Delivery: 2–3 days</p>
        <p className="in-stock">In Stock</p>
        <p className="feedback">⭐⭐⭐⭐⭐ (4.8/5)</p>
        <h3>Description</h3>
        <p>Ye shehad pahari ilaqon se collect kiya jata hai. Isme koi sugar ya chemicals add nahi kiye jate.</p>

        {/* Add to Cart Button */}
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </section>
  );
}
