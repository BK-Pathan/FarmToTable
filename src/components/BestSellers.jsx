import React from 'react';
import './bestSellers.css';
import ProductCard from './ProductCard';

import desiGhee1kg from '../assets/images/desi.png';
import desiGhee500g from '../assets/images/ghee.png';
import honey1kg from '../assets/images/hone.jpg';
import honey500g from '../assets/images/sle.jpg';

const products = [
  { id: 'ghee-1', title: 'Desi Ghee Pure Buffalo– 1kg', description: 'Pure traditional desi ghee for healthier cooking and taste.', price: 'PKR 3500', image: desiGhee1kg },
  { id: 'ghee-2', title: 'Desi Ghee Pure Cow– 1kg', description: 'Rich desi ghee packed with nutrients and flavor.', price: 'PKR 3500', image: desiGhee500g },
  { id: 'honey-1', title: 'Small Bee honey-1kg', description: 'Pure 100% natural and organic honey. Collected from small bees. ', price: 'PKR 4000', image: honey1kg },
  { id: 'honey-2', title: 'Pure Honey – 500g', description: 'Delicious natural honey with floral notes.', price: 'PKR 1200', image: honey500g },
];

export default function BestSellers({ addToCart }) {
  return (
    <section className="bs-section">
      <div className="bs-wrap container">
        <header className="bs-top">
          <h2>Best Sellers</h2>
          <p className="bs-subtitle">Our most-loved pantry essentials</p>
        </header>

        <div className="bs-grid">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={() =>
                addToCart({
                  id: p.id,
                  name: p.title,
                  price: Number(p.price.replace('PKR ', '').replace(',', '')),
                })
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
