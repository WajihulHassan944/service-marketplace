"use client";
import React, { useState } from "react";
import "./login.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/const";

const Login = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
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
          credentials: "include", // send and receive cookies
          body: JSON.stringify({ email: username, password }),
        }
      );

      const data = await res.json();
      console.log("Admin login response:", data);

      if (
        res.ok &&
        data.success &&
        Array.isArray(data.user?.role) &&
        (data.user.role.includes("admin") || data.user.role.includes("superadmin"))
      ) {
        // Store user info if you want, token is in HttpOnly cookie so not accessible via JS
        localStorage.setItem("user", JSON.stringify(data.user));

        router.push("/admin");
      } else {
        setError("Invalid credentials or unauthorized role.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container-admin">
      <div className="login-card">
        <div className="login-header">
          <Image
            src="/logo.png"
            alt="Modernize Logo"
            className="login-logo"
            width={70}
            height={70}
            style={{ objectFit: "contain" }}
          />
          <h2 className="login-title">doTask Admin</h2>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="login-options">
            <label className="rememberLabel">
              <input type="checkbox" defaultChecked /> Remember this Device
            </label>
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">
            Sign In
          </button>

          <div className="login-footer">
            Browse website? <a href="/">Click here</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
