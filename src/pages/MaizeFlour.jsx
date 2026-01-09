import React from "react";
import "./MaizeFlour.css";

export default function MaizeFlour({ addToCart }) {

  const handleAddToCart = () => {
    addToCart({
      id: 4, // unique ID for Maize Flour
      name: "Maize Flour (Makki Ka Ata)",
      price: 320, // price per kg
      quantity: 1 // default quantity
    });
  };

  return (
    <section className="product-page">
      <img src="/images/makki.jpg" alt="Maize Flour" />
      <div className="product-info">
        <h1>Maize Flour (Makki Ka Ata)</h1>
        <p className="price">Rs. 320 / kg</p>
        <p>Delivery: 2 days</p>
        <p className="in-stock">In Stock</p>
        <p className="feedback">⭐⭐⭐⭐ (4.4/5)</p>
        <h3>Description</h3>
        <p>Makki ka ata fresh pees kar banaya jata hai, bina kisi preservative ke.</p>

        {/* Add to Cart Button */}
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </section>
  );
}
