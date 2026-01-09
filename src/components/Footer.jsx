import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { products } from "../pages/products"; // ✅ IMPORTANT
import PrivacyPolicy from "../pages/PrivacyPolicy";
import FAQs from "../pages/FAQs";
import TermsAndConditions from "../pages/TermsAndConditions";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSection = (section) => {
    if (!isMobile) return;
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // ✅ UNIQUE categories from products (same as Navbar / WhatWeOffer)
  const categories = [
    ...new Map(products.map(p => [p.slug, p])).values()
  ];

  return (
    <footer className="site-footer">
      <div className="footer-inner">

        {/* Quick Links */}
        <div className="footer-section">
          <h4 onClick={() => toggleSection("links")}>Quick Links</h4>
          <div className={`footer-content ${isMobile && openSections.links ? "expanded" : ""}`}>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/faqs">FAQs</Link>
            <Link to="/terms-and-conditions">Terms & Conditions</Link>
          </div>
        </div>

        {/* ✅ What We Offer (UPDATED) */}
        <div className="footer-section">
          <h4 onClick={() => toggleSection("offer")}>What We Offer</h4>
          <div className={`footer-content ${isMobile && openSections.offer ? "expanded" : ""}`}>
            {categories.map(cat => (
              <Link key={cat.slug} to={`/product/${cat.slug}`}>
                {cat.category}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4 onClick={() => toggleSection("contact")}>Contact</h4>
          <div className={`footer-content ${isMobile && openSections.contact ? "expanded" : ""}`}>
            <div>03301866660</div>
            <div>Farmtotableofficial1@gmail.com</div>
            <h4>Location</h4>
            <div>Arifwala</div>
          </div>
        </div>

        {/* Follow Us */}
        <div className="footer-section">
          <h4 onClick={() => toggleSection("follow")}>Follow Us</h4>
          <div className={`footer-content ${isMobile && openSections.follow ? "expanded" : ""}`}>
            <a
              href="https://www.instagram.com/farmtotabel?igsh=MWQ1dXp5MTF5NmEyMA=="
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a href="#">Facebook</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} FarmToTable. All rights reserved.</small>
        <small>
          <a
            href="https://wa.me/923021666330"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Developed By Bismillah Pathan
          </a>
        </small>
      </div>
    </footer>
  );
}
