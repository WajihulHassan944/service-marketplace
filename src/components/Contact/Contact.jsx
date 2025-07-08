"use client";

import React, { useState } from "react";
import "./style.css";
import { baseUrl } from "@/const";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/email/contact-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg(data.message || "Your message has been sent!");
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Section 1: Get in Touch */}
      <section className="contact-hero">
        <h1>Get in touch</h1>
        <p>
          Fill out the form below and a Toptal representative will contact you
          as soon as possible. <br />
          For immediate assistance, please call our sales line or email our customer support.
        </p>
      </section>

      {/* Section 3: Contact Form */}
      <section className="contact-form-section">
        <img
          src="/assets/contact/map.png"
          alt="Map Background"
          className="map-background"
        />
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name *"
            required
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject *"
            required
            value={formData.subject}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="I would like to know about... *"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          {successMsg && <p className="success-msg">{successMsg}</p>}
          {errorMsg && <p className="error-msg">{errorMsg}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </section>

      {/* Section 2: Join Toptal */}
      <section className="contact-join">
        <img
          src="/assets/contact/map.png"
          alt="Graphic"
          className="contact-join-image"
        />
        <h2>Toptal Connects the Top 3% of Freelance Talent All Over The World.</h2>
      </section>

      <section className="contact-cta">
        <p className="join-text">Join the Toptal community.</p>

        <div className="join-buttons">
          <button className="btn-primary">Hire Top Talent</button>
          <span>or</span>
          <button className="btn-outline">Apply as a Freelancer</button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
