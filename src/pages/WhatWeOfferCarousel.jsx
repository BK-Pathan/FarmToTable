import React from "react";
import { products } from "../pages/products";
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
              <img src={product.image} alt={product.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
