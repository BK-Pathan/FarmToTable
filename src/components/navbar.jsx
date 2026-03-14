import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import logo2 from "./../assets/images/logo2.png";
import "./navbar.css";
import { products } from "../pages/products"; // ✅ product list

export default function Navbar({ toggleCart, cartCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownMobileOpen, setDropdownMobileOpen] = useState(false);
  const location = useLocation();

  // 🔹 Generate unique categories from products
  const categories = [
    ...new Map(
      products.map(p => [p.category, { slug: p.slug, category: p.category }])
    ).values()
  ];

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="logo">
          <img src={logo2} alt="FarmToTable Logo" />
        </Link>

        {/* Hamburger menu */}
        <button
          className="hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Navigation links */}
        <div className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>

          {/* What We Offer Dropdown */}
          <div
            className={`dropdown ${dropdownMobileOpen ? "active" : ""}`}
            onClick={() =>
              window.innerWidth <= 768 && setDropdownMobileOpen(!dropdownMobileOpen)
            }
          >
            <span className="dropdown-title">What We Offer</span>

            <div className="dropdown-menu">
              {categories.map(cat => (
                <Link
                  key={cat.slug}
                  to={`/products/category/${cat.slug}`} // ✅ correct path
                >
                  {cat.category}  {/* display category name */}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/products">Products</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/feedback" className="feedback-nav-link">
            Reviews
          </Link>
        </div>

        {/* Cart icon */}
        <div className="nav-actions">
          <button className="cart-icon" onClick={toggleCart}>
            <FiShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
        </div>

      </div>
    </nav>
  );
}
