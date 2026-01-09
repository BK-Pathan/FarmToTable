import React, { useState, useRef, useEffect } from "react";
import "./contactPage.css";

export default function ContactPage() {

  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 8;
      const rotateY = ((x - centerX) / centerX) * -8;

      card.style.transform = `
        translateY(-50%)
        perspective(900px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.04)
      `;
    };

    const reset = () => {
      card.style.transform = `
        translateY(-50%)
        perspective(900px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
      `;
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", reset);

    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", reset);
    };
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappNumber = "+923301866660";
    const text = `Name: ${form.name}%0AEmail: ${form.email}%0APhone: ${form.phone}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <section className="contact-page">
      <div className="contact-container">

        {/* LEFT SIDEBAR */}
        <div className="contact-sidebar" ref={cardRef}>
          <h3>Contact Info</h3>
          <p>Farmtotableofficial1@gmail.com</p>
          <p>0330 1866660</p>
        </div>

        {/* RIGHT FORM */}
        <div className="contact-form-container">
          <h2>Have Any Question?</h2>

          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <div className="row-inputs">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <textarea
              name="message"
              placeholder="Write your message here..."
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Submit Message</button>
          </form>
        </div>

      </div>
    </section>
  );
}
