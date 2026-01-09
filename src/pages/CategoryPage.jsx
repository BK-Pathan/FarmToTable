import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../pages/products"; // import products
import "./CategorySidebar.css";

export default function CategoryPage({ addToCart }) {
  const { category } = useParams();

  // Filter products by category
  const filteredProducts = products.filter(p => p.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="category-page">
      <h1 className="category-title">{category}</h1>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(item => (
            <div className="product" key={item.id}>
              <img src={item.image} alt={item.name} />
              <h2>{item.name}</h2>
              <p className="price">PKR {item.price}</p>
              <div className="stars">
                {"★".repeat(item.stars)}
                {"☆".repeat(5 - item.stars)}
              </div>
              <button onClick={() => addToCart({...item, quantity: 1})}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}
