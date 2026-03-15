import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./product.css";
import CategorySidebar from "../pages/CategorySidebar.jsx";
import { products } from "../pages/products.js";

import { db } from "../pages/fire.js";
import {
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot
} from "firebase/firestore";

export default function Product({ addToCart }) {

  // ✅ get category from URL
  const params = useParams();
  const category = params.category || null;

  // ===== States =====
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // ===== Filter Products =====
  const filteredProducts = category
    ? products.filter(product => product.slug === category)
    : products;

  // ===== Category Title =====
  const formattedCategory = category
    ? category
        .replace(/-/g, " ")
        .replace(/\b\w/g, letter => letter.toUpperCase())
    : "Our Products";

  // ===== Firebase Feedback Listener =====
  useEffect(() => {

    const q = query(
      collection(db, "feedbacks"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, snapshot => {

      const feedbackList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setFeedbacks(feedbackList);

    });

    return () => unsubscribe();

  }, []);

  // ===== Feedback Submit =====
  const handleSubmit = async () => {

    if (!name.trim() || !email.trim() || !feedbackText.trim()) {

      setMessage("Please fill all fields");
      setMessageType("error");
      return;

    }

    try {

      setLoading(true);

      await addDoc(collection(db, "feedbacks"), {

        name,
        email,
        feedback: feedbackText,
        rating,
        timestamp: serverTimestamp()

      });

      setName("");
      setEmail("");
      setFeedbackText("");
      setRating(5);

      setMessage("Feedback submitted successfully");
      setMessageType("success");

    }
    catch (error) {

      setMessage("Error submitting feedback");
      setMessageType("error");

    }
    finally {

      setLoading(false);

      setTimeout(() => {

        setMessage("");
        setMessageType("");

      }, 3000);

    }

  };

  return (

  <div className="product-page">

  {/* Title */}
  <h1 className="product-title">
    {formattedCategory}
  </h1>

  <div className="product-layout">

    {/* Sidebar */}
    <CategorySidebar />

    {/* Products */}
    <div className="product-grid">

      {filteredProducts.length > 0 ? (

        filteredProducts.map(item => (

          <div
            className="product"
            key={item.id}
          >

            {/* Wrap entire card content in Link */}
            <Link
              to={`/product/${item.id}`}
              state={{ from: window.location.pathname }}
              className="product-link"
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <h2>{item.name}</h2>

{/* <p className="Qty">
                PKR {item.qty}
              </p> */}
              <p className="price">
                PKR {item.price}
              </p>

              {/* Optionally, stars */}
              {/* <div className="stars">
                {"★".repeat(item.stars)}
                {"☆".repeat(5 - item.stars)}
              </div> */}
            </Link>

            {/* Add to Cart button stays outside Link */}
            <div className="product-buttons">
              <button onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>

          </div>

        ))

      ) : (

        <h2>
          No products found
        </h2>

      )}

    </div>

  </div>

</div>

  );

}
