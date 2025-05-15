import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axiosInstance from "../api/axiosInstance";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorField, setErrorField] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorField(null);

    if (!validateEmail(email)) {
      setErrorField("email");
      Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `/user/login/?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`
      );

      const { access_token } = response.data;
      localStorage.setItem("token", access_token);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/home");
    } catch (err) {
      const errorMessage = err.response?.data?.detail || "Login failed";

      if (errorMessage.toLowerCase().includes("email")) {
        setErrorField("email");
        Swal.fire({
          icon: "error",
          title: "Email Not Found",
          text: "Please check your email.",
        });
      } else if (errorMessage.toLowerCase().includes("password")) {
        setErrorField("password");
        Swal.fire({
          icon: "error",
          title: "Incorrect Password",
          text: "Please try again.",
        });
      } else {
        setErrorField("both");
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid username or password.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img
          src="/assets/images/images-2-removebg-preview 1.png"
          alt="Appzlogic Logo"
          className="appzlogic-logo"
        />
        <h1>WELCOME TO RECRUITMENT INTELLIGENCE</h1>
        <img
          src="/assets/images/4630062-removebg-preview.png"
          alt="3D Illustration"
          className="illustration"
        />
      </div>

      <div className="login-right">
        <h2>SIGN IN</h2>
        <form onSubmit={handleLogin} className="input-container">
          <label htmlFor="email">Username</label>
          <input
            type="email"
            id="email"
            placeholder="Enter username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={
              errorField === "email" || errorField === "both"
                ? "error-input"
                : ""
            }
            required
          />

          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={
                errorField === "password" || errorField === "both"
                  ? "error-input"
                  : ""
              }
              required
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
