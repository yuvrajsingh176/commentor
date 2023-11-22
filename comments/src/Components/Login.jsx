import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = "http://localhost:8000/api/v1/auth"; // Replace with your actual backend URL

    try {
      const response = await fetch(
        `${apiUrl}/${isLogin ? "login" : "register"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
            username: isLogin ? undefined : username,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      localStorage.setItem("token",data.token)
        navigate("/data"); // Use navigate to change the route
      } else {
        const errorData = await response.json();
        console.error(`${isLogin ? "Login" : "Register"} failed:`, errorData);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="label">{isLogin ? "Login" : "Register"}</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <label className="label">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="auth-input"
        />

        {!isLogin && (
          <>
            <label className="label">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="auth-input"
            />
          </>
        )}

        <label className="label">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="auth-input"
        />

        <button type="submit" className="auth-button">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p className="auth-toggle" onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Don't have an account? Register here."
          : "Already have an account? Login here."}
      </p>
    </div>
  );
};

export default AuthForm;
