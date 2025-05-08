import React from "react";
import "./SubmittedRequirements.css";

const SubmittedRequirements = () => {
  return (
    <div className="requirements-container">
      <div className="requirements-header">
        <span>Submitted Requirements</span>
        <span className="arrow">▾</span>
      </div>
      <div className="requirement">
        <p>
          <strong>1. Please upload a document with the specific content you would like this presentation to include.</strong>
          <br />
          I’ve uploaded my presentation material!
        </p>
        <a href="/files/contracts.csv" className="file-link" download>
          📄 contracts.csv
        </a>
      </div>
      <div className="requirement">
        <p>
          <strong>2. Do you have any branding or graphic design requirements?</strong>
          <br />
          Yes, please follow the branding on my company website.
        </p>
      </div>
      <div className="requirement">
        <p>
          <strong>3. Any images or charts to include?</strong>
          <br />
          Nope!
        </p>
      </div>
    </div>
  );
};

export default SubmittedRequirements;
