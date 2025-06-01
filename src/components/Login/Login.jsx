"use client";
import React, { useState } from "react";
import "./Login.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from '@react-oauth/google';
import {baseUrl} from "../../const";
const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        `${baseUrl}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // for cookie
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok && data.success && Array.isArray(data.user?.role)) {
        const roles = data.user.role;

        // Priority: seller > buyer
        const rolePriority = {
          seller: 1,
          buyer: 2,
        };

        const validRoles = roles.filter((role) =>
          ["seller", "buyer"].includes(role)
        );

        if (validRoles.length === 0) {
          setError("No valid roles found (seller or buyer).");
          return;
        }

        const sortedRoles = validRoles.sort(
          (a, b) => rolePriority[a] - rolePriority[b]
        );
        const topRole = sortedRoles[0];

        if (topRole === "seller") {
          router.push("/seller/dashboard");
        } else if (topRole === "buyer") {
          router.push("/buyer/home");
        } else {
          setError("Unrecognized role.");
        }
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };


const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      console.log('Google Access Token:', tokenResponse.access_token);

      const response = await fetch(`${baseUrl}/users/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ token: tokenResponse.access_token }),
      });

      const data = await response.json();

      if (response.ok) {
        const { topRole } = data;

        if (topRole === "seller") {
          router.push("/seller/dashboard");
        } else if (topRole === "buyer") {
          router.push("/buyer/home");
        } else {
          setError("Unrecognized role.");
        }
      } else {
        setError(data.message || "Google login failed.");
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError("Something went wrong. Please try again.");
    }
  },
  onError: () => {
    setError('Google login was cancelled or failed.');
  },
});
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log in</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn green-btn">
            Continue
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <div className="separator">
          <hr />
          <span>or</span>
          <hr />
        </div>

        <button className="login-btn google-btn" onClick={() => googleLogin()}>
          <img
            src="/assets/google.jpeg"
            style={{ borderRadius: "50%" }}
            alt="Google"
            className="google-icon"
          />
          Continue with Google
        </button>

        <div className="signup-text">
          <hr />
          <span>Don't have an account?</span>
          <hr />
        </div>

        <Link href="/register" className="navLink">
          <button className="login-btn outline-btn">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
