import React from 'react';
import './RevisionRequest.css';

const RevisionRequest = ({ revisionRequests }) => {
  return (
    <div className="rev-box-wrapper">
      <h2 className="rev-box-title">Revision Requests</h2>
      {revisionRequests.length === 0 ? (
        <p className="rev-box-empty">No revision requests yet.</p>
      ) : (
        <ul className="rev-box-list">
          {revisionRequests.map((rev) => (
            <li key={rev._id} className="rev-box-item">
              <div className="rev-box-message">{rev.message}</div>
              <div className="rev-box-date">
                {new Date(rev.requestedAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RevisionRequest;
