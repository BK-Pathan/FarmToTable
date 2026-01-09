import React from "react";
import "./MustardOil.css";

export default function MustardOil({ addToCart }) {

  const handleAddToCart = () => {
    addToCart({
      id: 6, // unique ID for Mustard Oil
      name: "Mustard Oil",
      price: 1800, // price per liter
      quantity: 1
    });
  };

  return (
    <section className="product-page">
      <img src="/images/mustard-oil.jpg" alt="Mustard Oil" />
      <div className="product-info">
        <h1>Mustard Oil</h1>
        <p className="price">Rs. 1,800 / liter</p>
        <p>Delivery: 3 days</p>
        <p className="in-stock">In Stock</p>
        <p className="feedback">⭐⭐⭐⭐⭐ (4.8/5)</p>
        <h3>Description</h3>
        <p>Sarson ka tail cold-press method se nikala jata hai jis se nutrients safe rehte hain.</p>

        {/* Add to Cart Button */}
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </section>
  );
}
