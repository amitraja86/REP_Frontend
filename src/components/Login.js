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

import React, { useState } from "react";
import "./styles/Login.css"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ Corrected

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/user/login/?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      );
      console.log("Login successful:", response.data);
      const { access_token } = response.data;
      localStorage.setItem("token", access_token); // Store token
      navigate("/Home"); // ✅ Navigates correctly
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Username</label>
          <input
            type="text"
            id="email"
            placeholder="Enter your username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>👁️</button>
          </div>
        </div>

        <div className="checkbox-group">
          <label>
            <input type="checkbox" /> Remember Me
          </label>
          <a href="#">Forgot Password?</a>
        </div>

        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;

