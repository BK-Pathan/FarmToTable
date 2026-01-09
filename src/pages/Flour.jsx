import React from "react";
import "../pages/ProductPage.css"

export default function Flour({ products, addToCart }) {
  const flourProducts = products.filter(p => p.category === "Flour");

  return (
    <div className="category-page">
      <h1 className="category-title">Flour</h1>
      <div className="product-grid">
        {flourProducts.map(item => (
          <div className="product" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p className="price">PKR {item.price}</p>
            <p className="description">{item.description}</p>
            <div className="stars">
              {"★".repeat(item.stars)}
              {"☆".repeat(5 - item.stars)}
            </div>
            <button onClick={() => addToCart({ ...item, quantity: 1 })}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
