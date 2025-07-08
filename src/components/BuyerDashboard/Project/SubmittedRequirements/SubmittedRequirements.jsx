import React from "react";
import "./SubmittedRequirements.css";

export default function SubmittedRequirements({ order }) {
  if (!order) return null;

  const requirementText = order.requirements;
  const uploadedFiles = Array.isArray(order.files) ? order.files : [];

  return (
    <div className="requirements-container">
      <div className="requirements-header">
        <span>Submitted Requirements</span>
        <span className="arrow">▾</span>
      </div>

      <div className="requirement">
        <p>
          <strong>Requirement:</strong>
          <br />
          {requirementText ? (
            <span>{requirementText}</span>
          ) : (
            <span style={{ color: "#999" }}>No requirements submitted.</span>
          )}
        </p>
      </div>

      <div className="requirement">
        <p>
          <strong>Attached File(s):</strong>
        </p>
        {uploadedFiles.length > 0 ? (
          uploadedFiles.map((file, i) => (
            <a
              key={file._id || i}
              href={file.url}
              className="file-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 Requirements File
            </a>
          ))
        ) : (
          <p style={{ color: "#999" }}>No files attached.</p>
        )}
      </div>
    </div>
  );
}
