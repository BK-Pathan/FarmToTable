import React from 'react';
import './testimonials.css';

const reviews = [
  {
    name: 'Ayesha Khan',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80',
    rating: 5,
    feedback: 'Fabulous quality! I love their ghee and honey — pure and fresh.'
  },
  {
    name: 'Bilal Ahmed',
    photo: 'https://i.pinimg.com/736x/0b/ee/65/0bee657357420453ec6425377aa3b793.jpg',
    rating: 4,
    feedback: 'Reliable service and quick delivery. Fresh products every time.'
  },
  {
    name: 'Ali Shah',
    photo: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=80&q=80',
    rating: 5,
    feedback: 'Love the packaging and quality. Highly recommended!'
  },
  {
    name: 'Fatima Shah',
    photo: 'https://i.pinimg.com/736x/dd/8d/49/dd8d49aab5eb4b20c06becdd80f9ca8b.jpg',
    rating: 5,
    feedback: 'All products are good. Highly recommended!'
  }
];

function Stars({ count=5 }){
  const arr = Array.from({length:5});
  return (
    <div className="star-row" aria-hidden>
      {arr.map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < count ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="1" style={{ marginRight: 2 }}>
          <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.796 1.402 8.17L12 18.896l-7.336 3.873 1.403-8.17L.133 9.211l8.2-1.193z"></path>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials(){
  return (
    <section className="testimonials">
      <div className="container">
        <header className="test-header">
          <h2>Customer Testimonials</h2>
          <p className="test-sub">Real feedback from our valued customers</p>
        </header>

        <div className="test-grid">
          {reviews.map((r, idx) => (
            <div className="test-card" key={idx}>
              <div className="test-top">
                <img src={r.photo} className="test-photo" alt={r.name} />
                <div className="test-info">
                  <div className="test-name">{r.name}</div>
                  <Stars count={r.rating} />
                </div>
              </div>
              <p className="test-feedback">{r.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
