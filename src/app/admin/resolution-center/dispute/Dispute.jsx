'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaHashtag, FaEdit } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import './disputeDetails.css';

const Dispute = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetails = async () => {
    try {
      const res = await fetch(
        `https://backend-service-marketplace.vercel.app/api/orders/order-by-id/${orderId}`
      );
      const data = await res.json();
      if (data.success) {
        setOrder(data.order);
      }
    } catch (err) {
      console.error('Error fetching order:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) fetchOrderDetails();
  }, [orderId]);

  const handleAction = async (action) => {
    try {
      const res = await fetch(
        `https://backend-service-marketplace.vercel.app/api/orders/resolution-response/${orderId}?action=${action}&userId=${order?.resolutionRequest?.requestedBy}`,
        { method: 'GET' }
      );
      const data = await res.json();
      if (data.success) {
        alert(`Dispute ${action}ed successfully`);
        fetchOrderDetails(); // Refresh order data
      }
    } catch (err) {
      console.error(`Error performing ${action}:`, err);
    }
  };

  if (loading) return <div className="resolution-wrapper-new">Loading...</div>;
  if (!order) return <div className="resolution-wrapper-new">Order not found</div>;

  const requester =
    order.buyerId._id === order.resolutionRequest.requestedBy
      ? order.buyerId
      : order.sellerId;

  return (
    <div className="resolution-wrapper-new">
      <div className="resolution-card">
        <div className="ticket-no">
          <FaHashtag className="ticket-icon" />
          Ticket No: <strong>{order.resolutionRequest.ticketId}</strong>
        </div>

        <h2 className="resolution-header">Dispute Resolution Details</h2>
        <p className="resolution-description">{order.resolutionRequest.message}</p>

        <div className="resolution-section-title">
          <FaEdit className="section-icon" />
          Dispute Details
        </div>

        <ul className="dispute-info-list">
          <li>
            <strong>Status:</strong> {order.status}
          </li>
          <li>
            <strong>Amount:</strong> ${order.totalAmount}
          </li>
          <li>
            <strong>Reason:</strong> {order.resolutionRequest.reason}
          </li>
          <li>
            <strong>Initiated By:</strong> {requester.firstName} ({requester.email})
          </li>
        </ul>
{order.resolutionRequest?.status === "open" && (
        <div className="dispute-actions">
          <button className="resolution-submit-btn" onClick={() => handleAction('accept')}>
            Accept Dispute
          </button>
          <button className="resolution-reject-btn" onClick={() => handleAction('reject')}>
            Reject Dispute
          </button>
          <a
            href={`/admin/messages?receiverId=${order.resolutionRequest.requestedBy}`}
            className="resolution-msg-btn"
          >
            <FiMessageCircle /> Message Opener
          </a>
        </div>
        )}
      </div>
    </div>
  );
};

export default Dispute;
