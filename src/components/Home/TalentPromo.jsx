import React from "react";
import Image from "next/image";


const TalentPromo = () => {
  return (
    <section className="talent-container">
      <div className="talent-image">
        <img src="/assets/homeThird/one.png" alt="Talent working" fill priority />
      </div>

      <div className="talent-content">
        <p className="talent-label">For talent</p>
        <h1>Find great work</h1>
        <p className="talent-subtext">
          Meet clients you’re excited to work with and take your career or
          business to new heights.
        </p>

        <div className="talent-links">
          <div>Find opportunities for every stage of your freelance career</div>
          <div>Control when, where, and how you work</div>
          <div>Explore different ways to earn</div>
        </div>

        <button className="talent-button">Find opportunities</button>
      </div>
    </section>
  );
};

export default TalentPromo;
