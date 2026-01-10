import React, { useState, useEffect } from "react";
import { db } from "./fire";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";
import "./feedback.css";

export default function Feedback() {
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

  return (
    <div className="feedback-page">
      <h1>Share Your Experience</h1>

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

      <h2>All Feedbacks</h2>
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
  );
}
