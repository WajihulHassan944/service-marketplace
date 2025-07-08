import React from "react";
import "./RecentFiles.css";

export default function RecentFiles({ order }) {
  if (!order) return null;

  const files = [];

  // Add gig PDF (if exists)
  if (order.gigId?.pdf?.url) {
    files.push({
      name: "Gig Overview.pdf",
      url: order.gigId.pdf.url,
      type: "pdf",
    });
  }

  // Add submitted requirements files (if any)
  if (Array.isArray(order.files)) {
    order.files.forEach((file, index) => {
      files.push({
        name: `Requirement File ${index + 1}`,
        url: file.url,
        type: "uploaded",
      });
    });
  }

  return (
    <div className="recent-files-container">
      <div className="recent-files-header">Recent Files</div>

      {files.length === 0 ? (
        <p style={{ padding: "1rem", color: "#999" }}>No files submitted yet.</p>
      ) : (
        files.map((file, i) => (
          <a
            key={i}
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="file-card"
          >
            <div className="file-info">
              <img
                src="/assets/gigs/file.png"
                alt={file.name}
                className="file-icon"
              />
              <div>
                <p className="file-name">{file.name}</p>
                <p className="file-meta">{file.type === "pdf" ? "Gig PDF" : "User upload"}</p>
              </div>
            </div>
            <div className="file-options">↗</div>
          </a>
        ))
      )}
    </div>
  );
}
