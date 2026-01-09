import React from "react";
import "../pages/ProductPage.css"
export default function GamdumFlour({ addToCart }) {

  const handleAddToCart = () => {
    addToCart({
      id: 8, // unique ID for Gamdum Flour
      name: "Pure Gamdum Ka Ata",
      price: 260, // price per kg
      quantity: 1 // default quantity
    });
  };

  return (
    <section className="product-page">
      <img src="/images/gandum.jpg" alt="Pure Gamdum Ka Ata" />
      <div className="product-info">
        <h1>Pure Gamdum Ka Ata</h1>
        <p className="price">Rs. 260 / kg</p>
        <p>Delivery: 1–2 days</p>
        <p className="in-stock">In Stock</p>
        <p className="feedback">⭐⭐⭐⭐ (4.6/5)</p>
        <h3>Description</h3>
        <p>Gandum ka ata chakki pe fresh peesa jata hai, koi mixing nahi hoti.</p>

        {/* Add to Cart Button */}
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </section>
  );
}
