import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import CartPanel from "./pages/CartPanel";
import CheckoutPage from "./pages/CheckoutPage";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQs from "./pages/FAQs";
import TermsAndConditions from "./pages/TermsAndConditions";

import Home from "./pages/Home";
import About from "./pages/About";
import WhatWeOffer from "./components/WhatWeOffer";
import ContactPage from "./pages/ContactPage";
import Product from "./pages/Product";

function App() {
  // ✅ Load cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Invalid cart data", e);
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);

  // ✅ Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // 🛒 Cart functions
  const addToCart = (product) => {
    setCartItems(items => {
      const existing = items.find(item => item.id === product.id);
      if (existing) {
        return items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const toggleCart = () => setCartOpen(prev => !prev);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <Navbar toggleCart={toggleCart} cartCount={cartCount} />

      <CartPanel
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        removeItem={removeItem}
      />

      <Routes>
  {/* Home */}
  <Route path="/" element={<Home addToCart={addToCart} />} />

  {/* Checkout */}
  <Route path="/checkout" element={<CheckoutPage />} />

  {/* About & Contact */}
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<ContactPage />} />
  <Route path="/whatweoffer" element={<WhatWeOffer />} />

  {/* Products */}
  <Route path="/product" element={<Product addToCart={addToCart} />} />
  <Route path="/products" element={<Product addToCart={addToCart} />} />
  <Route path="/product/:category" element={<Product addToCart={addToCart} />} />

  {/* ✅ Footer Pages */}
  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
  <Route path="/faqs" element={<FAQs />} />
  <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
</Routes>
 <Footer/>
    </Router>
   
  );
}

export default App;
