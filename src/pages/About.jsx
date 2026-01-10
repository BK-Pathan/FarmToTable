import React from "react";
import "./about.css";
import about from "../assets/images/about.png";

export default function About() {
  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay">
          <h1>About Us</h1>
          <p>
            From our farms to your table, we bring you the freshest, healthiest, and safest products with care, trust, and transparency.
          </p>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="about-vision-mission">
        <div className="vision-mission-container">
          <div className="vision-text">
            <h3>Our Vision</h3>
            <p>
              To be the leading provider of natural, high-quality farm products : Ghee, Honey, Seeds, Oils, Pickles, Tea, Dates, Gur, Flour, and more delivering freshness, health, and hygiene directly to our customers.
            </p>
            <h3>Our Mission</h3>
            <p>
              We are committed to sustainability, ethical sourcing, and complete transparency. Every product is carefully selected, processed, and packed with the highest hygiene standards. Our deliveries are handled with care to ensure that every product reaches you safely and in perfect condition.
            </p>
          </div>
          <div className="vision-image">
            <img src={about} alt="Vision" />
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story-center">
        <div className="story-center-container">
          <h2>Our Story</h2>
          <p>
            Founded by <strong>Muhammad Saad Khan Yousfzai</strong>, FarmToTable started with a simple goal: to bring pure, natural, and hygienic farm products straight to your home. With a passion for wholesome foods, Saad envisioned a brand that values health, freshness, and trust.
          </p>
          <p>
            From Ghee and Honey to Seeds, Oils, Pickles, Tea, Dates, Gur, and Flour, every product is carefully packed to maintain hygiene and quality. Our team ensures that deliveries are handled thoughtfully and safely, so you receive your products in perfect condition.
          </p>
          <p>
            Our journey began with local farmers, focusing on quality, hygiene, and sustainability. Today, FarmToTable is a trusted name for households who value healthy, authentic, and fresh products. Every jar, pack, and bottle carries our promise of care and excellence.
          </p>
          <p>
            We believe in nurturing relationships with farmers, customers, and communities while preserving the natural goodness in every product. At FarmToTable, your health, satisfaction, and safety are at the heart of everything we do.
          </p>
        </div>
      </section>
    </main>
  );
}
