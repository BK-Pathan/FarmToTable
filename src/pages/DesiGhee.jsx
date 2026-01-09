import React from "react";
import "../pages/ProductPage.css"

export default function DesiGhee({ addToCart }) {

  const handleAddToCart = () => {
    addToCart({
      id: 7, // unique ID for Desi Ghee
      name: "Desi Ghee",
      price: 3200, // price per kg
      quantity: 1 // default quantity
    });
  };

  return (
    <section className="product-page">
      <img src="/images/desi-ghee.jpg" alt="Desi Ghee" />
      <div className="product-info">
        <h1>Desi Ghee</h1>
        <p className="price">Rs. 3,200 / kg</p>
        <p>Delivery: 3–4 days</p>
        <p className="out-stock">Out of Stock</p>
        <p className="feedback">⭐⭐⭐⭐⭐ (5/5)</p>
        <h3>Description</h3>
        <p>Desi ghee makhan ko dheemi aanch par pakakar tayar kiya jata hai.</p>

        {/* Add to Cart Button */}
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </section>
  );
}
