'use client';
import React, { useState } from 'react';
import './billing.css';
import Sidebar from '../Sidebar/Sidebar';
import AddBillingMethod from './BillingModal/BillingModal';
import { useDispatch, useSelector } from 'react-redux';
import TopUpModal from './TopUpModal/TopUpModal';
import { baseUrl } from '@/const';
import Link from 'next/link';

const Billing = () => {
  const user = useSelector((state) => state.user);
  const [loadingCard, setLoadingCard] = useState(null); // ID of card being updated

  const handleSetPrimary = async (cardId) => {
    console.log(cardId);
    setLoadingCard(cardId);
    try {
      const res = await fetch(`${baseUrl}/wallet/set-primary-card`, {
        method: 'Put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          stripeCardId: cardId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message || 'Primary card updated');
        window.location.reload(); // or trigger Redux refresh
      } else {
        alert(data.message || 'Failed to update primary card');
      }
    } catch (err) {
      console.error(err);
      alert('Error setting primary card');
    }
    setLoadingCard(null);
  };

  const handleRemoveCard = async (cardId) => {
    const confirm = window.confirm('Are you sure you want to remove this card?');
    if (!confirm) return;

    setLoadingCard(cardId);
    try {
      const res = await fetch(`${baseUrl}/wallet/remove-card`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          stripeCardId: cardId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message || 'Card removed');
        window.location.reload(); // or trigger Redux refresh
      } else {
        alert(data.message || 'Failed to remove card');
      }
    } catch (err) {
      console.error(err);
      alert('Error removing card');
    }
    setLoadingCard(null);
  };

  return (
    <div className="settings-container">
      <Sidebar />
      <main className="billing-content">
        <h2>Billing & payments</h2>

        <section className="balance-section">
          <div>
            <h3>Balance</h3>
            <p>Your balance is <strong>${user?.wallet?.balance}</strong></p>
          </div>
          {user.currentDashboard === "buyer" ? <TopUpModal /> : <Link href='/seller/payout' className="pay-now">Withdraw</Link>}
        </section>

        <section className="manage-billing">
          <div className="manage-header">
            <h3>Manage billing methods</h3>
            <AddBillingMethod />
          </div>
          <p className="desc">Add, or remove your billing methods</p>

          {user?.wallet?.cards?.length > 0 ? (
            user.wallet.cards.map((card) => {
              const isPrimary = card.isPrimary;
              return (
                <div key={card._id} className={`billing-card ${isPrimary ? 'primary' : ''}`}>
                  <div>
                    {isPrimary && <span className="card-label">Primary</span>}
                    {isPrimary && <p>Your primary billing method is used for all recurring payments</p>}
                    <div className="card-info">
                      <img
                        src={card.brand === 'mastercard' ? '/assets/mastercard.png' : '/assets/visa.png'}
                        alt={card.brand}
                      />
                      <span>{card.brand?.charAt(0).toUpperCase() + card.brand?.slice(1)} ending in {card.last4}</span>
                    </div>
                  </div>
                  <div className="actions">
                    {!isPrimary && (
                      <span
                        className="set-primary"
                        onClick={() => handleSetPrimary(card.stripeCardId)}
                      >
                        {loadingCard === card.stripeCardId ? 'Setting...' : 'Set As Primary'}
                      </span>
                    )}
                    <span
                      className="remove"
                      onClick={() => handleRemoveCard(card.stripeCardId)}
                    >
                      {loadingCard === card.stripeCardId ? 'Removing...' : 'Remove'}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No billing methods added yet.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Billing;
