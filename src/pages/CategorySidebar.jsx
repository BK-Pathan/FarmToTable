import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./categorySidebar.css";

const categories = [

  { id: 0, name: "All Products", path: "/products" },

  { id: 1, name: "Ghee & Butter", path: "/products/category/ghee-butter" },

  { id: 2, name: "Honey", path: "/products/category/honey" },

  { id: 3, name: "Seeds", path: "/products/category/seeds" },

  { id: 4, name: "Oils", path: "/products/category/oils" },

  { id: 5, name: "Achar", path: "/products/category/achar" },

  { id: 6, name: "Tea", path: "/products/category/tea", disabled: true },

  { id: 7, name: "Dates", path: "/products/category/dates" },

  { id: 8, name: "Gur / Jaggery", path: "/products/category/gurjaggery" },

  { id: 9, name: "Flour", path: "/products/category/flour" },

  { id: 10, name: "Other", path: "/products/category/other" },

];

export default function CategorySidebar() {

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleCheckbox = (id, path) => {

    setSelectedCategory(id);

    navigate(path);

  };

  return (

    <>

      {/* DESKTOP SIDEBAR */}
      <div className="category-sidebar desktop-only">

        <h3>Categories</h3>

        <ul>

          {categories.map(cat => (

            <li
              key={cat.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                opacity: cat.disabled ? 0.6 : 1
              }}
            >

              {cat.disabled ? (

                <span className="disabled-category">

                  {cat.name}
                  <small className="coming-soon"> (Coming Soon)</small>

                </span>

              ) : (

                <Link to={cat.path}>
                  {cat.name}
                </Link>

              )}

              {!cat.disabled && (

                <input
                  type="checkbox"
                  checked={selectedCategory === cat.id}
                  onChange={() => handleCheckbox(cat.id, cat.path)}
                />

              )}

            </li>

          ))}

        </ul>

      </div>

      {/* MOBILE VERSION */}
      <div className="mobile-category mobile-only">

        <div
          className="mobile-category-header"
          onClick={() => setOpen(!open)}
        >

          <h3>Filters</h3>

          <span>
            {open ? "▲" : "▼"}
          </span>

        </div>

        {open && (

          <ul className="mobile-category-list">

            {categories.map(cat => (

              <li
                key={cat.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  opacity: cat.disabled ? 0.6 : 1
                }}
              >

                {cat.disabled ? (

                  <span className="disabled-category">

                    {cat.name}
                    <small className="coming-soon"> (Coming Soon)</small>

                  </span>

                ) : (

                  <Link
                    to={cat.path}
                    onClick={() => {

                      handleCheckbox(cat.id, cat.path);

                      setOpen(false);

                    }}
                  >

                    {cat.name}

                  </Link>

                )}

                {!cat.disabled && (

                  <input
                    type="checkbox"
                    checked={selectedCategory === cat.id}
                    onChange={() => {

                      handleCheckbox(cat.id, cat.path);

                      setOpen(false);

                    }}
                  />

                )}

              </li>

            ))}

          </ul>

        )}

      </div>

    </>

  );

}
