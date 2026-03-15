import React from "react";
import { products } from "../pages/products";
import { Link } from "react-router-dom"; // <-- React Router Link
import "./WhatWeOfferCarousel.css";

export default function WhatWeOfferCarousel({ addToCart }) {
  // Duplicate the products array to create infinite loop effect
  const duplicatedProducts = [...products, ...products];

  return (
    <section className="carousel-section">
      <h1 className="carousel-title">What We Offer</h1>

      <div className="slider">
        <div className="slide-track">
          {duplicatedProducts.map((product, idx) => (
            <div className="slide" key={idx}>
              {/* Wrap image in Link to product detail page */}
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}