import React from 'react';
import './ResolutionCenter.css';
import { FiMapPin, FiClock } from 'react-icons/fi';
import Link from 'next/link';

const ResolutionCenter = () => {
  return (
    <div className="resolution-container">
      <h2 className="resolution-heading">Recent Resolutions</h2>
      <a href="#" className="browse-link">Pending Resolutions →</a>

<div className='resolutionCardsWrap'>
          <div className="resolution-card">
        <div className="resolution-info">
          <h3 className="resolution-title">Dispute: Late Service Delivery</h3>
          <div className="resolution-meta">
            <span><FiMapPin /> New York</span>
            <span><FiClock /> 10 minutes ago</span>
          </div>
          <div className="resolution-tags">
            <span>urgent</span>
            <span>pending</span>
            <span>service dispute</span>
            <span>admin review</span>
          </div>
        </div>
        <div className="resolution-bid">
          <p className="resolution-amount">$250 - $1,000</p>
          <p className="resolution-type">Under Review</p>
         <Link href="/admin/resolution-center/dispute"> <button className="bid-button">Resolve Now</button></Link>
        </div>
      </div>
           <div className="resolution-card">
        <div className="resolution-info">
          <h3 className="resolution-title">Dispute: Late Service Delivery</h3>
          <div className="resolution-meta">
            <span><FiMapPin /> New York</span>
            <span><FiClock /> 10 minutes ago</span>
          </div>
          <div className="resolution-tags">
            <span>urgent</span>
            <span>pending</span>
            <span>service dispute</span>
            <span>admin review</span>
          </div>
        </div>
        <div className="resolution-bid">
          <p className="resolution-amount">$250 - $1,000</p>
          <p className="resolution-type">Under Review</p>
          
         <Link href="/admin/resolution-center/dispute"> <button className="bid-button">Resolve Now</button></Link>
        </div>
      </div>
</div>
    </div>
  );
};

export default ResolutionCenter;
