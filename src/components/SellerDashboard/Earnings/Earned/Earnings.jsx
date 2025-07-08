'use client';
import React, { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import './Earnings.css';

const tooltipTexts = {
  'Work In Progress': 'Payments for ongoing work.',
  'In Review': 'Pending client review.',
  'Pending': 'Waiting for processing.',
  'Available': 'Funds ready to withdraw.',
};

const Earnings = () => {
  const user = useSelector((state) => state.user);
  const wallet = user?.wallet;

  const [visibleTooltip, setVisibleTooltip] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);

  const transactions = wallet?.transactions || [];
  const visibleTransactions = transactions.slice(0, visibleCount);

  const formatCurrency = (amount) => {
    return `$${(amount / 100).toFixed(2)}`;
  };

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
      <h3>{formatCurrency(value)}</h3>
      {isAvailable && <span>Last payment: {transactions[0] ? formatCurrency(transactions[0].amount) : '$0.00'}</span>}
    </div>
  );

  return (
    <div className="earnings-container">
      <div className="earnings-summary">
        {renderBox('Work In Progress', wallet?.walletStatus?.workInProgress || 0)}
        {renderBox('In Review', wallet?.walletStatus?.inReview || 0)}
        {renderBox('Pending', 0)}
        {renderBox('Available', wallet?.balance || 0, true)}
      </div>

      <div className="earnings-notice">
        <p>
          Checkout or withdraw your available balances now.{' '}
          <Link href="/settings/billing">Add payment card</Link> or
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
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {visibleTransactions.map((tx, index) => (
              <tr key={tx._id || index}>
                <td data-label="Date">{new Date(tx.createdAt).toLocaleDateString()}</td>
                <td data-label="Type">{tx.type}</td>
                <td data-label="Description">{tx.description}</td>
                <td data-label="Amount">{formatCurrency(tx.amount)}</td>
                <td data-label="ID">{tx._id}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {visibleCount < transactions.length && (
          <button className="earnings-load-more" onClick={() => setVisibleCount(prev => prev + 3)}>
            Load more transactions
          </button>
        )}

        <p className="earnings-note">Note: This report is updated every hour.</p>
      </div>
    </div>
  );
};

export default Earnings;
