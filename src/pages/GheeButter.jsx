import React from "react";
import "../pages/ProductPage.css"
import {products} from "../pages/products"; // ensure products are imported

export default function GheeButter({ products = [], addToCart }) {
  const gheeProducts = products.filter(p => p.name.toLowerCase().includes("ghee"));

  return (
    <div className="category-page">
      <h1 className="category-title">Ghee & Butter</h1>
      {gheeProducts.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="product-grid">
          {gheeProducts.map(item => (
            <div className="product" key={item.id}>
              <img src={item.image} alt={item.name} />
              <h2>{item.name}</h2>
              <p className="price">PKR {item.price}</p>
              <p className="description">{item.description}</p>
              <div className="stars">
                {"★".repeat(item.stars)}
                {"☆".repeat(5 - item.stars)}
              </div>
              <button
                onClick={() =>
                  addToCart({ id: item.id, name: item.name, price: item.price, quantity: 1 })
                }
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
