import React, { useState, useEffect } from "react";

import "./feedback.css";

import { db } from "./fire";
import {
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot
} from "firebase/firestore";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // 🔹 Real-time feedbacks
  useEffect(() => {
    const q = query(collection(db, "feedbacks"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, snap =>
      setFeedbacks(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
    return () => unsub();
  }, []);

  const handleSubmit = async () => {
    if (!name || !email || !feedbackText) {
      setMessage("Please fill all fields");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
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

      setMessage("Feedback submitted successfully ✅");
      setMessageType("success");
    } catch {
      setMessage("Something went wrong ❌");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Mask email for privacy
  const maskEmail = (email) => {
    if (!email) return "";
    const [user, domain] = email.split("@");
    const visible = user.slice(0, 2); // first 2 letters visible
    return `${visible}****@${domain}`;
  };

  return (
    <div className="feedback-page">

      {/* Card with only form */}
      <div className="feedback-container">
        <h1>Customer Feedback</h1>

        <div className="feedback-form">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your Name"
          />
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your Email"
          />
          <textarea
            value={feedbackText}
            onChange={e => setFeedbackText(e.target.value)}
            placeholder="Write feedback..."
          />

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
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </div>

      {/* Feedback messages and list outside the card */}
      <div className="feedback-outside">
        {feedbacks.length > 0 && (
          <h2 className="feedback-heading">See what our customers say</h2>
        )}
        {message && <div className={`msg ${messageType}`}>{message}</div>}

        <div className="feedback-list">
          {feedbacks.map(f => (
            <div key={f.id} className="feedback-item">
              <strong>
                {f.name}{" "}
                {f.email && (
                  <span className="feedback-email">
                    ({maskEmail(f.email)})
                  </span>
                )}
              </strong>
              <div>{"★".repeat(f.rating) + "☆".repeat(5 - f.rating)}</div>
              <p>{f.feedback}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
