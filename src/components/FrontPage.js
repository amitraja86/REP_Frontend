import React from "react";
import "../components/styles/FrontPage.css"; // Import the CSS file
import logo from "../components/images/Appzlogic logo.png";
import interviewImage from "../components/images/Screenshot 2025-04-01 at 11.18.18 AM.png"; // Ensure the path is correct
import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();
// const navLogin = async(e) => {
//   e.preventDefault();
//     setError("");
//   // Logic for login button click 
//   navigate("/login"); // Redirect to login page
// }
const FrontPage = () => {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">RECRUITMENT INTELLIGENCE</h1>
        <ul className="nav-links">
          <li>Home</li>
          <li>About Us</li>
          <li>Services</li>
          <li>FAQs</li>
        </ul>
        <button className="login-btn">Login</button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <img src={logo} alt="Appzlogic Logo" className="logo-img" />
        <div className="hero-text">
          <h2>Ace Your Interviews with Confidence</h2>
          <p>
            Prepare for interviews quickly with real insights and guidance from
            experts. Get practical resources to enhance your confidence and
            performance.
          </p>
          <div className="hero-buttons">
            <button className="btn primary">Get Started</button>
            <button className="btn secondary">Learn More</button>
          </div>
        </div>
        <img
          src={interviewImage}
          alt="Interview preparation"
          className="hero-image"
        />
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Unlock Your Interview Potential with Our Comprehensive Features</h2>
        <div className="features-grid">
          <div className="feature-card">Prepare with Real Questions</div>
          <div className="feature-card">Insights from Experts</div>
          <div className="feature-card">Tips for Interview Confidence</div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial">
        <h2>Prepare for Your Next Interview</h2>
        <p>
          Unlock your potential with structured interview questions and expert
          insights.
        </p>
        <button className="btn primary">Start Now</button>
      </section>

      {/* FAQs */}
      <section className="faqs">
        <h2>FAQs</h2>
        <details>
          <summary>What services do you offer?</summary>
          <p>We provide interview preparation materials and expert guidance.</p>
        </details>
        <details>
          <summary>How can I register?</summary>
          <p>Click on the Sign Up button to create an account.</p>
        </details>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Recruitment Intelligence. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FrontPage;
