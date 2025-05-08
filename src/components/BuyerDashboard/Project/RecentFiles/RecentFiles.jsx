import React from "react";
import "./RecentFiles.css";

const RecentFiles = () => {
  return (
    <div className="recent-files-container">
      <div className="recent-files-header">Recent Files</div>
      <div className="file-card">
        <div className="file-info">
          <img
            src="/assets/gigs/avatar.png"
            alt="CSV File"
            className="file-icon"
          />
          <div>
            <p className="file-name">contracts.csv</p>
            <p className="file-meta">3.8 KB · 1 minute ago</p>
          </div>
        </div>
        <div className="file-options">⋯</div>
      </div>
    </div>
  );
};

export default RecentFiles;
