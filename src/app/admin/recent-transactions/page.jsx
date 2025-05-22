'use client';
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './RecentTransactions.css';
import EarningAnalytics from './analytics-section/EarningAnalytics';

const Page = () => {
  return (
  <> <EarningAnalytics />
  
  <div className="dashboard-container">     
      <div className="card recent-transactions">
        <h2>Recent Transactions</h2>
        <p className="subtitle">How to Secure Recent Transactions</p>
        <div className="timeline">
          {[
            { time: '09:30 am', color: 'purple', desc: 'Payment received from John Doe of $385.90' },
            { time: '10:00 am', color: 'blue', desc: <><strong>New sale recorded</strong><br /><span className="link">#ML–3467</span></> },
            { time: '12:00 am', color: 'green', desc: 'Payment was made of $64.95 to Michael' },
            { time: '09:30 am', color: 'orange', desc: <><strong>New sale recorded</strong><br /><span className="link">#ML–3467</span></> },
            { time: '09:30 am', color: 'red', desc: <><strong>New arrival recorded</strong><br /><span className="link">#ML–3467</span></> },
            { time: '12:00 am', color: 'green', desc: 'Payment Done' },
          ].map((item, index, arr) => (
            <div key={index} className="timeline-item">
              <span className="time">{item.time}</span>
              <div className="dot-line-wrap">
                <span className={`dot ${item.color}`}></span>
                {index < arr.length - 1 && <div className="line"></div>}
              </div>
              <span className="desc">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card product-performances">
        <div className="header">
          <div>
            <h2>Product Performances</h2>
            <p className="subtitle">What Impacts Product Performance?</p>
          </div>
          <div className="custom-select">
            <span>March 2024</span>
            <FaChevronDown className="dropdown-icon" />
          </div>
        </div>
        <div className="table">
          <div className="table-header">
            <span>Assigned</span>
            <span>Progress</span>
            <span>Priority</span>
            <span>Budget</span>
          </div>

          {[
            ['Minecraf App', 'Jason Roy', 'product-1.jpg', '73.2%', 'low'],
            ['Web App Project', 'Mathew Flintoff', 'product-2.jpg', '56.8%', 'medium'],
            ['Modernize Dashboard', 'Anil Kumar', 'product-3.jpg', '25%', 'very-high'],
            ['Dashboard Co', 'George Cruize', 'product-1.jpg', '96.3%', 'high'],
          ].map(([name, by, img, progress, priority], i) => (
            <div className="table-row" key={i}>
              <div className="assigned">
                <img src={`/assets/admin/${img}`} alt={name} />
                <div>
                  <div className="name">{name}</div>
                  <div className="by">{by}</div>
                </div>
              </div>
              <span>{progress}</span>
              <span className={`badge ${priority}`}>{priority.replace('-', ' ')}</span>
              <span>$3.5k</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Page;
