import React, { useState } from 'react';
import './newsletterCTA.css';

export default function NewsletterCTA(){
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      setStatus('Enter a valid email address');
      return;
    }
    setStatus('Thanks for subscribing!');
    setEmail('');
  }

  return (
    <section className="newsletter-cta">
      <div className="container cta-inner">
        <div className="cta-text">
          <h2>Nuts about health? Join our newsletter</h2>
          <p>Weekly tips, seasonal highlights, and members-only offers.</p>
        </div>
        <form className="cta-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Your email address" value={email} onChange={(e)=> setEmail(e.target.value)} aria-label="Email address" />
          <button type="submit" className="btn-cta">Subscribe</button>
        </form>
      </div>
      {status && <div className="cta-status">{status}</div>}
    </section>
  )
}
