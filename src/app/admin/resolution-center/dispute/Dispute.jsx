'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaHashtag, FaEdit } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import './disputeDetails.css';
import toast from 'react-hot-toast';
import { baseUrl } from '@/const';
const Dispute = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
const [processingAction, setProcessingAction] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetails = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/orders/order-by-id/${orderId}`
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
    setProcessingAction(action);
    const res = await fetch(
      `${baseUrl}/orders/resolution-response/${orderId}?action=${action}&userId=${order?.resolutionRequest?.requestedBy}&isAdmin=true`,
      { method: 'GET' }
    );
    const data = await res.json();
    if (data.success) {
      toast.success(`Dispute ${action}ed successfully`);
      await fetchOrderDetails();
    }
  } catch (err) {
    console.error(`Error performing ${action}:`, err);
  } finally {
    setProcessingAction(null);
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
        <h5 className='resolution-dispute-message'>Dispute Message:</h5>
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
         <button
  className="resolution-submit-btn"
  onClick={() => handleAction('accept')}
  disabled={processingAction === 'accept'}
>
  {processingAction === 'accept' ? <div className="spinner" /> : 'Accept Dispute'}
</button>

<button
  className="resolution-reject-btn"
  onClick={() => handleAction('reject')}
  disabled={processingAction === 'reject'}
>
  {processingAction === 'reject' ? <div className="spinner" /> : 'Reject Dispute'}
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
