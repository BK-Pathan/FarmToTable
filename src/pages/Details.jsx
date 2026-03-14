import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { products } from "./products";
import { db } from "./fire";
import "../pages/feedback.css";
import "../pages/detail.css";
import { Link } from "react-router-dom";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const navigate = useNavigate();
  const location = useLocation();
  const backPath = location.state?.from || "/products";


  // Feedback state
   const [feedbacks, setFeedbacks] = useState([]);
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [feedbackText, setFeedbackText] = useState("");
   const [rating, setRating] = useState(5);
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState("");
   const [messageType, setMessageType] = useState("");

  if (!product) {
    return <h2 style={{ padding: "40px" }}>Product not found</h2>;
  }

  // Fetch feedbacks for this product from Firebase
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
   <div className="page">



      {/* Product Info */}
      <div className="info">
        <img src={product.image} alt={product.name} className="image" />

        <div className="details">
          <h1 className="name">{product.name}</h1>
          <h2>PKR {product.price}</h2>
          <p><strong>Quantity:</strong> {product.qty}</p>
          <div className="stars">
            {"★".repeat(product.stars)}
            {"☆".repeat(5 - product.stars)}
          </div>
          <p>{product.description}</p>

          {/* Add to Cart */}
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1 })}
          >
            Add to Cart
          </button>

          {/* Back Button */}
          <button className="back-btn" onClick={() => navigate(backPath)}>
            Back
          </button>
        </div>
      </div>
 
      {/* Feedback messages and list outside the card */}
<div
  className="feedback-outside"
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // centers horizontally
    justifyContent: "center", // optional: centers vertically if needed
    width: "100%", // make sure it takes full width
    boxSizing: "border-box",
    textAlign: "center", // center text for smaller screens
  }}
>
  {feedbacks.length > 0 && (
    <h2 className="feedback-heading"
    style={{
        marginTop: "40px",
  }}>See what our customers say</h2>
  )}
  {message && <div className={`msg ${messageType}`}>{message}</div>}

  <div className="feedback-list" style={{ width: "80%", maxWidth: "600px" }}>
    {feedbacks
      .filter(f => f.feedback && f.name)
      .map(f => (
        <div key={f.id} className="feedback-item" style={{ marginBottom: "15px" }}>
          <strong>
            {f.name}{" "}
            {f.email && (
              <span className="feedback-email"
              >({maskEmail(f.email)})</span>
          )}
        </strong>
        <div>{"★".repeat(f.rating) + "☆".repeat(5 - f.rating)}</div>
        <p>{f.feedback}</p>
      </div>
      
    ))}
  </div>
          {/* ✅ Feedback Button */}
                <div className="test-btn-container " style={{ marginTop: "20px" }}>
                  <Link to="/feedback" className="test-btn">
                    Give Your Feedback
                  </Link>
                </div>
</div>
</div>
     
  );
}
