import { useState, useEffect } from "react";
import "./banner.css";

import banner1 from "./../assets/images/image1.png";
import banner2 from "./../assets/images/image2.png";
import banner3 from "./../assets/images/image4.jpg";

export default function Banner() {
  const banners = [
    { img: banner1, link: "#" },
    { img: banner2, link: "#" },
    { img: banner3, link: "#" }
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
