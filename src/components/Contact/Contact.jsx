import React from "react";
import "./style.css";

const Contact = () => {
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
        <form className="contact-form">
          <input type="text" placeholder="Full Name *" required />
          <input type="email" placeholder="Email *" required />
          <input type="text" placeholder="Subject *" required />
          <textarea
            placeholder="I would like to know about... *"
            required
          ></textarea>
          <button type="submit" className="btn-primary">Submit</button>
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
