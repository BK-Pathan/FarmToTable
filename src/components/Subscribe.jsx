import React, { useState } from 'react';
import './subscribe.css';

export default function Subscribe(){
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      setStatus('Please enter a valid email');
      return;
    }
    setStatus('Thanks for subscribing!');
    console.log('Subscribed', email);
    setEmail('');
  }

  return (
    <section className="subscribe">
      <div className="container">
        <div className="sub-inner">
          <div className="sub-text">
            <h2>Join Our Newsletter</h2>
            <p className="sub-desc">Get the latest updates, deals and seasonal picks delivered straight to your inbox.</p>
          </div>

          <form className="sub-form" onSubmit={handleSubmit} aria-label="Subscribe form">
            <input type="email" placeholder="Enter your email" value={email} onChange={(e)=> setEmail(e.target.value)} aria-label="Email" />
            <button type="submit" className="btn-sub">Subscribe</button>
          </form>
          { status && <div className="sub-status">{status}</div> }
        </div>
      </div>
    </section>
  )
}
