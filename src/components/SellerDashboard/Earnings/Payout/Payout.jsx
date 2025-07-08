'use client';
import React, { useState } from 'react';
import './Payout.css';
import Sidebar from '@/components/BuyerDashboard/Settings/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { baseUrl } from '@/const';

const Payout = () => {
  const user = useSelector((state) => state.user);
  const walletBalance = user?.wallet?.balance || 0;

  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('full');
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    const amountToWithdraw = selectedAmount === 'full' ? walletBalance : parseFloat(customAmount);

    if (!amountToWithdraw || isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
      return alert('Please enter a valid amount');
    }

    if (amountToWithdraw > walletBalance) {
      return alert('Amount exceeds available balance');
    }

    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/wallet/withdraw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          amount: amountToWithdraw,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert(data.message || 'Withdrawal successful');
        window.location.reload();
      } else {
        alert(data.message || 'Withdrawal failed');
        console.log(data);
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payout-wrapper">
      <Sidebar />

      <div className="payout-container">
        <h2 className="payout-title">Get paid now</h2>

        <div className="payout-section">
          <p className="payout-label">Available Balance</p>
          <p className="payout-value">${(walletBalance).toFixed(2)}</p>
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
              ${(walletBalance).toFixed(2)}
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
                style={{outline:'none'}}
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
            <span>
              $
              {selectedAmount === 'full'
                ? (walletBalance).toFixed(2)
                : customAmount || '0.00'}
            </span>
          </div>
        </div>

        <div className="payout-actions">
          <button
            className="payout-cancel"
            onClick={() => window.history.back()}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="payout-submit"
            onClick={handleWithdraw}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Get Paid'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payout;
