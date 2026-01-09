import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./categorySidebar.css";

const categories = [
  { id: 0, name: "All Products", path: "/product" },
  { id: 1, name: "Ghee & Butter", path: "/product/ghee-butter" },
  { id: 2, name: "Honey", path: "/product/honey" },
  { id: 3, name: "Seeds", path: "/product/seeds" },
  { id: 4, name: "Oils", path: "/product/oils" },
  { id: 5, name: "Achar", path: "/product/achar" },
  { id: 6, name: "Tea", path: "/product/tea" },
  { id: 7, name: "Dates", path: "/product/dates" },
  { id: 8, name: "Gur / Jaggery", path: "/product/gurjaggery" },
  { id: 9, name: "Flour", path: "/product/flour" },
  { id: 10, name: "Other", path: "/product/other" },
];


export default function CategorySidebar() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleCheckbox = (id, path) => {
    setSelectedCategory(prev => (prev === id ? null : id));
    navigate(path);
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <div className="category-sidebar desktop-only">
        <h3>Categories</h3>
        <ul>
          {categories.map(cat => (
            <li key={cat.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Link to={cat.path}>{cat.name}</Link>
              <input
                type="checkbox"
                checked={selectedCategory === cat.id}
                onChange={() => handleCheckbox(cat.id, cat.path)}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* MOBILE DROPDOWN */}
      <div className="mobile-category mobile-only">
        <div className="mobile-category-header" onClick={() => setOpen(!open)}>
          <h3>Filters</h3>
          <span>{open ? "▲" : "▼"}</span>
        </div>

        {open && (
          <ul className="mobile-category-list">
            {categories.map(cat => (
              <li key={cat.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link
                  to={cat.path}
                  onClick={() => {
                    setOpen(false);
                    handleCheckbox(cat.id, cat.path);
                  }}
                >
                  {cat.name}
                </Link>
                <input
                  type="checkbox"
                  checked={selectedCategory === cat.id}
                  onChange={() => {
                    handleCheckbox(cat.id, cat.path);
                    setOpen(false);
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
