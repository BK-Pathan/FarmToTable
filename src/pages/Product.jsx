import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./product.css";
import CategorySidebar from "../pages/CategorySidebar.jsx";
import { products } from "../pages/products.js";

import { db } from "../pages/fire.js";
import { collection, addDoc, query, orderBy, serverTimestamp, onSnapshot } from "firebase/firestore";

export default function Product({ addToCart }) {
  const { category } = useParams();

  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error

  // 🔹 REAL-TIME FEEDBACKS
  useEffect(() => {
    const q = query(collection(db, "feedbacks"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setFeedbacks(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // 🔹 FEEDBACK SUBMIT
  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !feedbackText.trim()) {
      setMessage("Please fill all fields.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await addDoc(collection(db, "feedbacks"), {
        name: name.trim(),
        email: email.trim(),
        feedback: feedbackText.trim(),
        rating: Number(rating),
        timestamp: serverTimestamp()
      });

      // Clear form after submit
      setName("");
      setEmail("");
      setFeedbackText("");
      setRating(5);

      setMessage("Feedback submitted successfully ✅");
      setMessageType("success");
    } catch (err) {
      console.error("Submit error:", err);
      setMessage("Something went wrong. Please try again ❌");
      setMessageType("error");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    }
  };

  // 🔹 CATEGORY FILTER
  const normalize = str =>
    str?.toLowerCase().replace(/\s+/g, " ").replace(/&/g, "and").trim();

  const filteredProducts = category
    ? products.filter(p => p.slug === category)
    : products;

  const formattedCategory = category
    ? category.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())
    : "Our Products";

  return (
    <div className="product-page">
      <h1 className="product-title">{formattedCategory}</h1>

      <div className="product-layout">
        <CategorySidebar />

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(item => (
              <div className="product" key={item.id}>
                <img src={item.image} alt={item.name} />
                <h2>{item.name}</h2>
                {item.qty && <p className="product-qty">Quantity: <strong>{item.qty}</strong></p>}
                <p className="price">PKR {item.price}</p>
                <p className="description">{item.description}</p>
                <div className="stars">
                  {"★".repeat(item.stars)}
                  {"☆".repeat(5 - item.stars)}
                </div>
                <button
                  onClick={() =>
                    addToCart({ id: item.id, name: item.name, price: item.price, quantity: 1 })
                  }
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      </div>

    </div>
  );
}
