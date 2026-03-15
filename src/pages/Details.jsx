import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { products } from "./products";
import { db } from "./fire";
import "../pages/feedback.css";
import "../pages/detail.css";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { useRef } from "react";

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

  // Related products: same category, excluding current product
  const relatedProducts = products.filter(
    p => p.category === product.category && p.id !== product.id
  );

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
const containerRef = useRef(null);

const scroll = (direction) => {
  const container = containerRef.current;
  if (container) {
    const scrollAmount = 220; // width of one card + gap
    container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  }
};
  // Mask email for privacy
  const maskEmail = (email) => {
    if (!email) return "";
    const [user, domain] = email.split("@");
    const visible = user.slice(0, 2);
    return `${visible}****@${domain}`;
  };
  const scrollCarousel = (direction) => {
  if (containerRef.current) {
    const scrollAmount = 200; // adjust as needed
    if (direction === "left") {
      containerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }
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

          {/* {product.organicInfo && (
            <p className="organic-info">
              <strong>Organic Info:</strong> {product.organicInfo}
            </p>
          )} */}

          {product.keyFeatures && product.keyFeatures.length > 0 && (
            <div className="key-features-section">
              <strong>Benefits:</strong>
              <ul className="key-features">
                {product.keyFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Add to Cart */}
          <div className="button-wrapper">
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
      </div>

{relatedProducts.length > 0 && (
  <div className="related-products-section">
    <h2 className="carousel-title">Related Products</h2>

    <div className="related-products-wrapper">
      {/* Left arrow */}
      <button
        className="carousel-btn left"
        onClick={() => scrollCarousel("left")}
      >
        &#10094;
      </button>

      <div className="related-products-container" ref={containerRef}>
        {relatedProducts.map(item => (
          <div key={item.id} className="related-product-card">
            <Link to={`/product/${item.id}`} state={{ from: backPath }}>
              <img src={item.image} alt={item.name} />
            </Link>
            <h3>{item.name}</h3>
            <p>PKR {item.price}</p>
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        className="carousel-btn right"
        onClick={() => scrollCarousel("right")}
      >
        &#10095;
      </button>
    </div>
  </div>
)}


      {/* Feedback section */}
      <div
        className="feedback-outside"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        {feedbacks.length > 0 && (
          <h2 className="feedback-heading" style={{ marginTop: "40px" }}>
            See what our customers say
          </h2>
        )}
        {message && <div className={`msg ${messageType}`}>{message}</div>}

        <div className="feedback-list" style={{ width: "80%", maxWidth: "600px" }}>
          {feedbacks
            .filter(f => f.feedback && f.name)
            .map(f => (
              <div key={f.id} className="feedback-item" style={{ marginBottom: "15px" }}>
                <strong>
                  {f.name}{" "}
                  {f.email && <span className="feedback-email">({maskEmail(f.email)})</span>}
                </strong>
                <div>{"★".repeat(f.rating) + "☆".repeat(5 - f.rating)}</div>
                <p>{f.feedback}</p>
              </div>
            ))}
        </div>

        {/* Feedback Button */}
        <div className="test-btn-container" style={{ marginTop: "20px" }}>
          <Link to="/feedback" className="test-btn">
            Give Your Feedback
          </Link>
        </div>
      </div>
    </div>
  );
}