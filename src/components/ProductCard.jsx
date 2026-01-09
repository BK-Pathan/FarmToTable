import React from 'react';
import './productCard.css';

export default function ProductCard({ product, onAddToCart }) {
  const { image, title, description, price } = product;

  return (
    <article className="pc">
      <div className="pc-img-wrap">
        <img src={image} alt={title} className="pc-img" />
      </div>
      <div className="pc-body">
        <h3 className="pc-title">{title}</h3>
        <p className="pc-desc">{description}</p>
        <div className="pc-footer">
          <div className="pc-price">{price}</div>
          <button className="pc-btn-add" type="button" onClick={onAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
