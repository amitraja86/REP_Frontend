// import React, { useState } from "react";
// import "./styles/Login.css"; 

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     console.log("Logging in with:", email, password);
    
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div className="input-group">
//           <label htmlFor="email">Email / Username</label>
//           <input
//             type="text"
//             id="email"
//             placeholder="Enter your email or username"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div className="input-group">
//           <label htmlFor="password">Password</label>
//           <div className="password-container">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button type="button" onClick={() => setShowPassword(!showPassword)}>👁️</button>
//           </div>
//         </div>

//         <div className="checkbox-group">
//           <label>
//             <input type="checkbox" /> Remember Me
//           </label>
//           <a href="#">Forgot Password?</a>
//         </div>

//         <button type="submit" className="login-btn">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

//..............................................................................................

// import React, { useState } from "react";
// import "./styles/Login.css"; 
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); // ✅ Corrected

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/v2/user/login/?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
//       );
//       console.log("Login successful:", response.data);
//       const { access_token } = response.data;
//       localStorage.setItem("token", access_token); // Store token
//       navigate("/Home"); // ✅ Navigates correctly
//     } catch (err) {
//       console.error("Login failed:", err);
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       {error && <p className="error-message">{error}</p>}
//       <form onSubmit={handleLogin}>
//         <div className="input-group">
//           <label htmlFor="email">Username</label>
//           <input
//             type="text"
//             id="email"
//             placeholder="Enter your username"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div className="input-group">
//           <label htmlFor="password">Password</label>
//           <div className="password-container">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button type="button" onClick={() => setShowPassword(!showPassword)}>👁️</button>
//           </div>
//         </div>

//         <div className="checkbox-group">
//           <label>
//             <input type="checkbox" /> Remember Me
//           </label>
//           <a href="#">Forgot Password?</a>
//         </div>

//         <button type="submit" className="login-btn">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import illustration from "./images/4630062-removebg-preview.png";
import appzlogicLogo from "./images/images-2-removebg-preview 1.png";
import "./styles/Login.css";

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
      alert("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v2/user/login/?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      );

      const { access_token } = response.data;
      localStorage.setItem("token", access_token);
      navigate("/home");
    } catch (err) {
      const errorMessage = err.response?.data?.detail || "Login failed";

      if (errorMessage.toLowerCase().includes("email")) {
        setErrorField("email");
        alert("Email not found. Please check your email.");
      } else if (errorMessage.toLowerCase().includes("password")) {
        setErrorField("password");
        alert("Incorrect password. Please try again.");
      } else {
        setErrorField("both");
        alert("Invalid username or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={appzlogicLogo} alt="Appzlogic Logo" className="appzlogic-logo" />
        <h1>WELCOME TO RECRUITMENT INTELLIGENCE</h1>
        <img src={illustration} alt="3D Illustration" className="illustration" />
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
            className={errorField === "email" || errorField === "both" ? "error-input" : ""}
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
              className={errorField === "password" || errorField === "both" ? "error-input" : ""}
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
