'use client';
import React from 'react';
import './Services.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Services = () => {
  const router = useRouter();
  return (
    <div className="services-container">
      <div className="services-header">
        <h1>Services</h1>
        <div className="custom-orders-toggle">
          <span>Accepting Custom Orders</span>
          <div className="toggle-switch active"></div>
        </div>
        <Link href="/seller/create-gig"><button className="create-gig-btn">CREATE A NEW GIG</button></Link>
      </div>

      <div className="tabs">
        <span className="tab active">ACTIVE <span className="badge">8</span></span>
        <span className="tab">PENDING APPROVAL</span>
        <span className="tab">REQUIRES MODIFICATION</span>
        <span className="tab">DRAFT</span>
        <span className="tab">DENIED</span>
        <span className="tab">PAUSED</span>
      </div>

      <div className="gigs-panel">
        <div className="panel-header">
          <span>ACTIVE GIGS</span>
          <select className="date-filter">
            <option>LAST 30 DAYS</option>
          </select>
        </div>

        <div className="gigs-table">
          <div className="gigs-table-header">
            <input type="checkbox" />
            <span className="col-gig">GIG</span>
            <span className="col">IMPRESSIONS</span>
            <span className="col">CLICKS</span>
            <span className="col">ORDERS</span>
            <span className="col">CANCELLATIONS</span>
            <span className="col">PLANS</span>
          </div>

          {/* Row 1 */}
          <div className="gigs-row" onClick={()=> router.push('/services-details')} style={{cursor:'pointer'}}>
            <input type="checkbox" />
            <div className="col-gig">
              <Image src="/assets/gigs/dummy.png" width={40} height={35} alt="Gig 2" style={{objectFit:'contain'}} />
              <div>
                <p className="gig-title">build a portfolio website, business website with animations</p>
              </div>
            </div>
            <span className="col">291</span>
            <span className="col">0</span>
            <span className="col">0</span>
            <span className="col">0%</span>
            <span className="col plan-action">+ Add Subscription</span>
            <button className="dropdown-btn">▼</button>
          </div>

          {/* Row 2 */}
          <div className="gigs-row" onClick={()=> router.push('/services-details')} style={{cursor:'pointer'}}>
            <input type="checkbox" />
            <div className="col-gig">
              <Image src="/assets/gigs/dummy.png" width={40} height={35} alt="Gig 2" style={{objectFit:'contain'}} />
              <div>
                <p className="gig-title">be your node js developer, react js or next js developer</p>
              </div>
            </div>
            <span className="col">58</span>
            <span className="col">0</span>
            <span className="col">0</span>
            <span className="col">0%</span>
            <span className="col plan-action">+ Add Subscription</span>
            <button className="dropdown-btn">▼</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
