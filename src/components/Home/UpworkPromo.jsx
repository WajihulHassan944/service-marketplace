
import React from "react";

const UpworkPromo = () => {
  return (
    <div className="upwork-container">
      <div className="upwork-left">
        <h1>
          Why businesses<br />turn to Upwork
        </h1>

        <div className="feature">
          <span className="icon">✪</span>
          <div>
            <h3>Proof of quality</h3>
            <p>Check any pro’s work samples, client reviews, and identity verification.</p>
          </div>
        </div>

        <div className="feature">
          <span className="icon">💲</span>
          <div>
            <h3>No cost until you hire</h3>
            <p>Interview potential fits for your job, negotiate rates, and only pay for work you approve.</p>
          </div>
        </div>

        <div className="feature">
          <span className="icon">✔</span>
          <div>
            <h3>Safe and secure</h3>
            <p>Focus on your work knowing we help protect your data and privacy. We’re here with 24/7 support if you need it.</p>
          </div>
        </div>
      </div>
      <img src="/assets/homeThird/person.png" alt="Upwork Character" className="illustration" />
     
      <div className="upwork-right">
        <div className="right-box">
          <h2>
            We’re<br />
            the world’s work<br />
            marketplace
          </h2>
          <div className="rating">
            <span>⭐ 4.9/5</span>
            <p>Clients rate professionals on Upwork</p>
          </div>
          <div className="award">
            <span>🏆 Award winner</span>
            <p>G2’s 2021 Best Software Awards</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpworkPromo;
