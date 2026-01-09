import React from "react";
import "./BrownSugar.css";

export default function BrownSugar({ addToCart }) {

  const handleAddToCart = () => {
    addToCart({
      id: 2, // unique ID for Brown Sugar
      name: "Brown Sugar",
      price: 550, // price per kg
      quantity: 1 // default 1
    });
  };

  return (
    <main className="main-content">
      <section className="product-page">
        <img src="/images/brown-sugar.jpg" alt="Brown Sugar Product" />
        <div className="product-info">
          <h1>Brown Sugar</h1>
          <p className="price">Rs. 550 / kg</p>
          <p>Delivery: 2 days</p>
          <p className="in-stock">In Stock</p>
          <p className="feedback">⭐⭐⭐⭐ (4.5/5)</p>
          <h3>Description</h3>
          <p>
            Brown sugar gannay ke ras se banayi jati hai bina kisi chemical
            process ke.
          </p>

          {/* Add to Cart Button */}
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </section>
    </main>
  );
}
