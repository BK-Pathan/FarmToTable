import React from "react";
import "./product.css";

export default function DesiGhee({ addToCart }) {
  return (
    <div className="product-page">
      <h1 className="product-title">Desi Ghee Pure Buffalo</h1>

      <div className="product-layout">
        <div className="product-detail-container">
          <img
            src="/images/desi-ghee.jpg" // ✅ Apna image path
            alt="Desi Ghee Pure Buffalo"
          />
          <div className="product-info">
            <p className="price">PKR 3500</p>
            <p>Quantity: 1KG</p>
            <p className="description">
              Made from pure buffalo milk. Prepared using traditional methods. Free from chemicals and preservatives & Rich taste.
            </p>
            <div className="stars">
              ★★★★★
            </div>
            <button
              onClick={() =>
                addToCart({
                  id: 1,
                  name: "Desi Ghee Pure Buffalo",
                  price: 3500,
                  quantity: 1,
                })
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
