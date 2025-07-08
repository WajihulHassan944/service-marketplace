'use client';
import React, { useEffect, useState } from 'react';
import './ResolutionCenter.css';
import { FiMapPin, FiClock } from 'react-icons/fi';
import Link from 'next/link';
import moment from 'moment';

const ResolutionCenter = () => {
  const [disputedOrders, setDisputedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOnlyPending, setShowOnlyPending] = useState(false); 

  useEffect(() => {
    const fetchDisputedOrders = async () => {
      try {
        const res = await fetch('https://backend-service-marketplace.vercel.app/api/orders/disputed');
        const data = await res.json();
        setDisputedOrders(data.disputedOrders || []);
      } catch (err) {
        console.error('Failed to load disputes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDisputedOrders();
  }, []);

  const filteredOrders = showOnlyPending
    ? disputedOrders.filter(
        (order) =>
          order.status === 'disputed' &&
          order.resolutionRequest?.status === 'open'
      )
    : disputedOrders;

  return (
    <div className="resolution-container">
      <h2 className="resolution-heading">Recent Resolutions</h2>
      <p
        className="browse-link"
        onClick={() => setShowOnlyPending(!showOnlyPending)}
        style={{ cursor: 'pointer' }}
      >
        {showOnlyPending ? 'Show All Resolutions' : 'Pending Resolutions →'}
      </p>

      <div className="resolutionCardsWrap">
        {loading ? (
          <p>Loading...</p>
        ) : filteredOrders.length === 0 ? (
          <p style={{ padding: '20px' }}>
            {showOnlyPending
              ? 'No pending disputed orders found.'
              : 'No disputed orders found.'}
          </p>
        ) : (
          filteredOrders.map((order) => (
            <div key={order._id} className="resolution-card">
              <div className="resolution-info">
                <h3 className="resolution-title">
                  Dispute: {order.resolutionRequest?.reason || 'No reason'}
                </h3>
                <div className="resolution-meta">
                  <span>
                    <FiMapPin /> {order.countryOfDisputer || 'Unknown'}
                  </span>
                  <span>
                    <FiClock />{' '}
                    {moment(order.resolutionRequest?.requestedAt).fromNow()}
                  </span>
                </div>
                <div className="resolution-tags">
                  <span>{order.resolutionRequest?.status}</span>
                  <span>{order.status}</span>
                  <span>service dispute</span>
                  <span>admin review</span>
                </div>
              </div>
              <div className="resolution-bid">
                <p className="resolution-amount">${order.totalAmount || 0}</p>
                <p className="resolution-type">
                  {order.resolutionRequest?.status}
                </p>
                <Link
                  href={`/admin/resolution-center/dispute?orderId=${order._id}`}
                >
                  <button className="bid-button">
                    {order.resolutionRequest?.status === 'open'
                      ? 'Resolve'
                      : 'Details'}
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ResolutionCenter;
