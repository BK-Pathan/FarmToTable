import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./whatWeOffer.css";
import { products } from "../pages/products";

export default function WhatWeOffer() {
  const categoriesRef = useRef(null);
  const navigate = useNavigate();

  const uniqueCategories = [
    ...new Map(products.map(p => [p.slug, p])).values()
  ];

  return (
    <section className="gb-whatweoffer">
      <div className="container">

        <div className="section-head">
          <h4>What We Offer</h4>
          <h2>Fresh finds await</h2>
        </div>

        <ul className="categories" ref={categoriesRef}>
          {uniqueCategories.map(c => (
            <li
              key={c.slug}
              className="cat-pill"
              onClick={() => navigate(`/product/${c.slug}`)}
            >
              <img src={c.image} alt={c.category} />
              <span>{c.category}</span>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
