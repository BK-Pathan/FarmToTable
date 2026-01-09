import React from 'react';
import './valueCard.css';

export default function ValueCard({ value }){
  return (
    <div className="value-card">
      <div className="value-icon" aria-hidden>{value.icon}</div>
      <h3 className="value-title">{value.title}</h3>
      <p className="value-desc">{value.desc}</p>
    </div>
  );
}
