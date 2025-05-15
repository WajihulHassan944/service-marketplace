'use client';
import React, { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import './Earnings.css';
import Link from 'next/link';

const dummyTransactions = [
  { date: 'Mar 11, 2017', type: 'VAT', description: 'VAT - Service Fee - Ref ID', amount: '($17.50)', balance: '$332.50' },
  { date: 'Mar 11, 2017', type: 'Service Fee', description: 'Service Fee - Fixed Price - Ref ID', amount: '($87.50)', balance: '$350.00' },
  { date: 'Mar 11, 2017', type: 'Fixed Price', description: 'Invoice for Iestone 1 -', amount: '$437.50', balance: '$437.50' },
  { date: 'Mar 10, 2017', type: 'Service Fee', description: 'Service Fee - Ref ID 102', amount: '($20.00)', balance: '$500.00' },
  { date: 'Mar 09, 2017', type: 'Bonus', description: 'Project Bonus - Ref ID 99', amount: '$50.00', balance: '$520.00' },
  { date: 'Mar 08, 2017', type: 'Payment', description: 'Invoice for Project X', amount: '$300.00', balance: '$470.00' },
  { date: 'Mar 07, 2017', type: 'VAT', description: 'VAT - Ref ID 88', amount: '($15.00)', balance: '$170.00' },
];

const tooltipTexts = {
  'Work In Progress': 'Payments for ongoing work.',
  'In Review': 'Pending client review.',
  'Pending': 'Waiting for processing.',
  'Available': 'Funds ready to withdraw.',
};

const Earnings = () => {
  const [visibleTooltip, setVisibleTooltip] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const visibleTransactions = dummyTransactions.slice(0, visibleCount);

  const loadMore = () => setVisibleCount((prev) => prev + 3);

  const renderBox = (label, value, isAvailable = false) => (
    <div className={`earnings-box${isAvailable ? ' available' : ''}`}>
      <div className="box-label">
        <p>{label}</p>
        <div
          className="tooltip-icon"
          onMouseEnter={() => setVisibleTooltip(label)}
          onMouseLeave={() => setVisibleTooltip(null)}
        >
          <FaQuestionCircle size={14} color="#999" />
          {visibleTooltip === label && (
            <div className="tooltip-content">{tooltipTexts[label]}</div>
          )}
        </div>
      </div>
      <h3>{value}</h3>
      {isAvailable && <span>Last payment: $0.00</span>}
    </div>
  );

  return (
    <div className="earnings-container">
      <div className="earnings-summary">
        {renderBox('Work In Progress', '$0.00')}
        {renderBox('In Review', '$0.00')}
        {renderBox('Pending', '$0.00')}
        {renderBox('Available', '$332.50', true)}
      </div>

      <div className="earnings-notice">
        <p>
          Checkout or withdraw your available balances now.{' '}
          <Link href="/buyer/settings/billing">Add payment card</Link> or
        </p>
        <Link href="/seller/payout"><button>Get Paid Now</button></Link>
      </div>

      <div className="earnings-transactions">
        <h4>Recent Transactions (Last 30 Days)</h4>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {visibleTransactions.map((tx, index) => (
              <tr key={index}>
                <td data-label="Date">{tx.date}</td>
                <td data-label="Type">{tx.type}</td>
                <td data-label="Description">{tx.description}</td>
                <td data-label="Amount">{tx.amount}</td>
                <td data-label="Balance">{tx.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {visibleCount < dummyTransactions.length && (
          <button className="earnings-load-more" onClick={loadMore}>
            Load more transactions
          </button>
        )}

        <p className="earnings-note">Note: This report is updated every hour.</p>
      </div>
    </div>
  );
};

export default Earnings;
