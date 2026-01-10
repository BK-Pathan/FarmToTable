import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./product.css";
import CategorySidebar from "../pages/CategorySidebar.jsx";
import { products } from "../pages/products.js";

import { db } from "../pages/fire";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";

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

  // FETCH FEEDBACKS
  const fetchFeedbacks = async () => {
    try {
      const q = query(collection(db, "feedbacks"), orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      setFeedbacks(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

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

      setName("");
      setEmail("");
      setFeedbackText("");
      setRating(5);

      setMessage("Feedback submitted successfully ✅");
      setMessageType("success");

      fetchFeedbacks();
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

  // 🔹 CATEGORY FILTER: normalize for spaces, &, and case
  const normalize = str =>
    str
      ?.toLowerCase()
      .replace(/\s+/g, " ") // multiple spaces
      .replace(/&/g, "and") // replace & with 'and'
      .trim();

 const filteredProducts = category
  ? products.filter(p => p.slug === category)
  : products;

  // FORMATTED CATEGORY TITLE
 const formattedCategory = category
  ? category
      .replace(/-/g, " ")
      .replace(/\b\w/g, l => l.toUpperCase())
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
                {item.qty && (
    <p className="product-qty">
      Quantity: <strong>{item.qty}</strong>
    </p>
  )}
                <p className="price">PKR {item.price}</p>
                <p className="description">{item.description}</p>
                <div className="stars">
                  {"★".repeat(item.stars)}
                  {"☆".repeat(5 - item.stars)}
                </div>
                <button
                  onClick={() =>
                    addToCart({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      quantity: 1
                    })
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

      {/* FEEDBACK SECTION */}
      <div className="feedback-section">
        <h2>Share Your Experience</h2>

        {message && <div className={`feedback-message ${messageType}`}>{message}</div>}

        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your Email" />
        <textarea value={feedbackText} onChange={e => setFeedbackText(e.target.value)} placeholder="Write feedback..." />

        <div className="star-rating">
          {[1, 2, 3, 4, 5].map(s => (
            <span
              key={s}
              className={s <= rating ? "star filled" : "star"}
              onClick={() => setRating(s)}
            >
              ★
            </span>
          ))}
        </div>

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>

        <div className="all-feedbacks">
          {feedbacks.map(fb => (
            <div key={fb.id} className="feedback-item">
              <p>
                <strong>{fb.name}</strong>
                {fb.email && ` (${fb.email})`}
              </p>
              <div>
                {"★".repeat(fb.rating)}
                {"☆".repeat(5 - fb.rating)}
              </div>
              <p>{fb.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
