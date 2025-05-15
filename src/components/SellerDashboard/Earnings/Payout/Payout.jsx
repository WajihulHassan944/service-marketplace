'use client';
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Payout.css';

const Payout = () => {
  const [customAmount, setCustomAmount] = useState('100.00');
  const [selectedAmount, setSelectedAmount] = useState('other');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('Bank Account ending in 4911');

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className="payout-container">
      <h2 className="payout-title">Get paid now</h2>

      <div className="payout-section">
        <p className="payout-label">Available Balance</p>
        <p className="payout-value">$337.92</p>
      </div>

      <div className="payout-section">
        <p className="payout-label">Payment Method</p>
        <div className="payout-select-wrapper" onClick={toggleDropdown}>
          <div className="payout-select-display">
            {selectedMethod}
            {showDropdown ? <FaChevronUp className='arrowSelect' /> : <FaChevronDown className='arrowSelect' />}
          </div>
          {showDropdown && (
            <div className="payout-dropdown">
              <div
                className="payout-dropdown-item"
                onClick={() => {
                  setSelectedMethod('Bank Account ending in 4911');
                  setShowDropdown(false);
                }}
              >
                Bank Account ending in 4911
              </div>
              <div
                className="payout-dropdown-item"
                onClick={() => {
                  setSelectedMethod('PayPal');
                  setShowDropdown(false);
                }}
              >
                PayPal
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="payout-section">
        <p className="payout-label">Amount</p>
        <div className="payout-radio">
          <label>
            <input
              type="radio"
              name="amount"
              checked={selectedAmount === 'full'}
              onChange={() => setSelectedAmount('full')}
            />
            $337.92
          </label>
          <label>
            <input
              type="radio"
              name="amount"
              checked={selectedAmount === 'other'}
              onChange={() => setSelectedAmount('other')}
            />
            Other amount
          </label>
        </div>
        {selectedAmount === 'other' && (
          <div className="payout-other-input">
            <span className="payout-dollar">$</span>
            <input
              type="text"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
            />
            <span className="payout-currency">USD</span>
          </div>
        )}
      </div>

      <div className="payout-summary">
        <div className="payout-row">
          <span>Withdrawal Fee (per payment)</span>
          <span>$0.00</span>
        </div>
        <div className="payout-row total">
          <span>Total Amount</span>
          <span>${selectedAmount === 'full' ? '337.92' : customAmount}</span>
        </div>
      </div>

      <div className="payout-actions">
        <button className="payout-cancel">Cancel</button>
        <button className="payout-submit">Get Paid</button>
      </div>
    </div>
  );
};

export default Payout;