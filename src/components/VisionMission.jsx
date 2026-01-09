import React from 'react';
import './visionMission.css';

export default function VisionMission(){
  return (
    <section className="vision-mission container">
      <div className="vm-grid">
        <div className="vm-left">
          <div className="vm-block">
            <h3>Vision</h3>
            <p>
              To be the leading provider of fresh, traceable, and sustainably sourced farm products — bringing healthy, delicious food to every kitchen.
            </p>
          </div>
          <div className="vm-block">
            <h3>Mission</h3>
            <p>
              Deliver high-quality, locally sourced produce and essentials while supporting fair trade, reducing food miles, and ensuring transparency across the supply chain.
            </p>
          </div>
        </div>
        <div className="vm-right">
          <img src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=1200&q=60" alt="farm scene" />
        </div>
      </div>
    </section>
  )
}
