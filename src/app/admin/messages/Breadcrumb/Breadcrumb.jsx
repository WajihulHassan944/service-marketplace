import React from 'react';
import Image from 'next/image';
import './Breadcrumb.css';

const Breadcrumb = () => {
  return (
    <div className="breadcrumb-container">
      <div className="breadcrumb-text">
        <h2>Chat</h2>
        <p className="breadcrumb-path">
          <span>Home</span>
          <span className="dot">•</span>
          <span>Chat</span>
        </p>
      </div>
      <div className="breadcrumb-image">
        <Image src="/assets/admin/banner.png" alt="Banner" width={165} height={165} />
      </div>
    </div>
  );
};

export default Breadcrumb;
