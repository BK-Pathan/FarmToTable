import React from 'react';
import './advantages.css';

const features = [
  {
    id: 'fresh',
    icon: '🥬',
    title: 'Fresh & Natural',
    description: 'We source the freshest produce and dairy directly from local farms.'
  },
  {
    id: 'handpicked',
    icon: '👐',
    title: 'Handpicked Quality',
    description: 'Every product is selected with care to ensure high quality and freshness.'
  },
  {
    id: 'secure',
    icon: '🔒',
    title: 'Secure Packaging',
    description: 'Safe packaging keeps your order intact and preserves product freshness.'
  },
  {
    id: 'local',
    icon: '🚚',
    title: 'Local Delivery',
    description: 'Fast local deliveries straight to your doorstep for maximum convenience.'
  }
];

export default function Advantages(){
  return (
    <section className="advantages">
      <div className="container">
        <header className="adv-header">
          <h2>Why Choose Us</h2>
          <p className="adv-sub">We bring the best products from farms to your table.</p>
        </header>

        <div className="adv-grid">
          {features.map((f) => (
            <div className="adv-card" key={f.id}>
              <div className="adv-icon" aria-hidden>{f.icon}</div>
              <h3 className="adv-title">{f.title}</h3>
              <p className="adv-desc">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}