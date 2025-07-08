"use client";
import React, { useState } from "react";
import "./login.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/const";
import { loginUser, setCurrentDashboard } from "@/redux/features/userSlice";
import { useDispatch } from "react-redux";
const Login = () => {
  const router = useRouter();
const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
setLoading(true);

  try {
    const res = await fetch(`${baseUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email: username, password }),
    });

    const data = await res.json();
    console.log("Admin login response:", data);

    if (
      res.ok &&
      data.success &&
      Array.isArray(data.user?.role) &&
      (data.user.role.includes("admin") || data.user.role.includes("superadmin"))
    ) {
      const userDetailsRes = await fetch(`${baseUrl}/users/userdetails`, {
        method: "GET",
        credentials: "include",
      });

      const userDetailsData = await userDetailsRes.json();

      if (userDetailsRes.ok && userDetailsData.success) {
        // Dispatch Redux user
        dispatch(loginUser(userDetailsData.user));

        // Determine top role
        const validRoles = data.user.role.filter((r) =>
          ["admin", "superadmin"].includes(r)
        );
        const rolePriority = { superadmin: 1, admin: 2 };
        const sortedRoles = validRoles.sort((a, b) => rolePriority[a] - rolePriority[b]);
        const topRole = sortedRoles[0];
        dispatch(setCurrentDashboard(topRole));
        router.push("/admin");
      } else {
        setError("Failed to fetch user details.");
      }
    } else {
      setError("Invalid credentials or unauthorized role.");
    }
  } catch (err) {
    console.error("Login error:", err);
    setError("Something went wrong. Please try again.");
  }
  finally{
    setLoading(false);
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

         <button type="submit" className="login-button" disabled={loading}>
  {loading ? <span className="loader"></span> : "Sign In"}
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
