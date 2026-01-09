import React from "react";
import "../pages/ProductPage.css"
import { products } from "../pages/products"; // import products array

export default function GurJaggery({ addToCart }) {
  const gurProducts = products.filter(p => p.category === "Gur / Jaggery");

  return (
    <div className="category-page">
      <h1 className="category-title">Gur / Jaggery</h1>
      {gurProducts.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="product-grid">
          {gurProducts.map(item => (
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
      )}
    </div>
  );
}
