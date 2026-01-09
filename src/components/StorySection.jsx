import React from 'react';
import './storySection.css';

export default function StorySection(){
  return (
    <section className="story-section container">
      <div className="story-grid">
        <div className="story-text">
          <h2>Our Story</h2>
          <p>
            FarmToTable started from a small team of passionate growers and food-lovers who wanted to change the way the community accesses fresh produce. We worked with local farms, learned the routes of their produce, and built a platform where quality and trust come first. Our approach is deeply rooted in supporting small scale farmers, maintaining transparency from harvest to home and reducing the time between picking and table.
          </p>
          <p>
            Over the years, we expanded our range to include dairy, pantry essentials, and carefully curated farm products. Our focus remains the same: providing wholesome food with minimal processing, fair pricing, and consistent quality.
          </p>
        </div>
        <div className="story-img">
          <img src="https://images.unsplash.com/photo-1496701285024-e029b5d3f3fb?auto=format&fit=crop&w=1000&q=60" alt="farm products"/>
        </div>
      </div>
    </section>
  )
}
