import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ← Add this
import "./banner.css";

import banner1 from "./../assets/images/image1.png";
import banner2 from "./../assets/images/image2.png";
import banner3 from "./../assets/images/image4.jpg";
import banner4 from "./../assets/images/tes.png";

export default function Banner() {
  const banners = [
    { 
      img: banner1, 
      link: "",
      headline: "Pure Taste. Real Quality.",
      subtext: "Farm-fresh products you can trust for your family.",
      cta: "Shop Now"
    },
    { 
      img: banner2, 
      link: "",
      headline: "Healthy Living Starts Here",
      subtext: "Natural, chemical-free products for a better lifestyle.",
      cta: "Explore Products"
    },
    { 
      img: banner3, 
 link: "",
headline: "Taste Freshness, Delivered Fast",
subtext: "Limited stock — order today & savor the difference.",
cta: "Get Yours Now"
    },
    { 
  img: banner4, // nayi image ka path, tum apni assets me rakh sakte ho
  link: "", // ya kisi coming soon page ka link
  headline: "More Goodness Coming Soon",
  subtext: "Stay tuned! Exciting new products will be available shortly.",
  cta: "Stay Tuned"
}
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="banner-container">
      <a href={banners[current].link}>
        <img
          src={banners[current].img}
          alt={`Banner ${current + 1}`}
          className="banner-image"
        />

        {/* Banner Text */}
        <div className="banner-text">
          <h1 className="banner-headline">{banners[current].headline}</h1>
          <p className="banner-subtext">{banners[current].subtext}</p>
          <button className="banner-cta">{banners[current].cta}</button>
        </div>
      </a>

      <div className="banner-dots">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`dot ${current === index ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}
