import React from "react";
import "../pages/ProductPage.css"

export default function Tea({ products, addToCart }) {
  const teaProducts = products.filter(p => p.category === "Tea");

  return (
    <div className="category-page">
      <h1 className="category-title">Tea</h1>
      <div className="product-grid">
        {teaProducts.map(item => (
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
