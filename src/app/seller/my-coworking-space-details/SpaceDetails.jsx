'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { FiMessageCircle, FiUser, FiDollarSign, FiClipboard } from 'react-icons/fi';
import './my-coworking-space-details.css';
import { baseUrl } from '@/const';

const SpaceDetails = () => {
  const [order, setOrder] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${baseUrl}/orders/order-by-id/${orderId}`);
        const data = await res.json();
        if (data.success) {
          setOrder(data.order);
        }
      } catch (err) {
        console.error("❌ Error fetching order:", err);
      }
    };
    if (orderId) fetchOrder();
  }, [orderId]);

  if (!order) return <div className="order-details-container">Loading...</div>;

  const {
    gigId,
    sellerId,
    buyerId,
    totalAmount,
    packageDetails,
    requirements,
    files,
    createdAt,
    status,
    coworkers
  } = order;

  const coworker = coworkers?.find(c => c.sellerId?._id === user?._id);

  return (
    <div className="order-details-container">
      <h2 className="order-details-heading">Order #{order._id.slice(-4)}</h2>
      <p className="order-details-date">PLACED ON {new Date(createdAt).toDateString()}</p>
      <p className="order-details-purchased">
        BUYER <span className="order-details-vendor">{buyerId?.firstName} {buyerId?.lastName}</span>
      </p>
      <span className="order-details-status">{status?.toUpperCase()}</span>

      <h3 className="order-details-subheading">Order details</h3>
      <table className="order-details-table">
        <thead>
          <tr>
            <th>Package</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{gigId?.gigTitle} ({order.packageType})</td>
            <td>${totalAmount}</td>
          </tr>
          <tr>
            <td className="order-details-bold">Requirements:</td>
            <td>{requirements}</td>
          </tr>
          {files?.length > 0 && (
            <tr>
              <td className="order-details-bold">Files:</td>
              <td>
                {files.map((f) => (
                  <a key={f._id} href={f.url} target="_blank" rel="noreferrer">
                    View File
                  </a>
                ))}
              </td>
            </tr>
          )}
          <tr>
            <td className="order-details-bold">Total:</td>
            <td>${totalAmount}</td>
          </tr>
        </tbody>
      </table>

      {/* --- Seller Info --- */}
      <h3 className="order-details-subheading">Seller</h3>
      <div className="order-details-billing order-details-billing-cowork">
       <div> {sellerId?.profileUrl && (
          <img src={sellerId.profileUrl} alt="Seller" className="profile-image" />
        )}
        <p><FiUser /> {sellerId?.firstName} {sellerId?.lastName}</p></div>
        <button
          className="message-button"
          onClick={() => router.push(`/messages?receiverId=${sellerId?._id}`)}
        >
           Message Seller
        </button>
      </div>

      {/* --- Coworker Info (only for logged-in user) --- */}
      {coworker && (
        <>
          <h3 className="order-details-subheading">Your Coworking Info</h3>
          <div className="order-details-billing">
            {coworker.sellerId?.profileUrl && (
              <img src={coworker.sellerId.profileUrl} alt="Coworker" className="profile-image" />
            )}
            <p><FiUser /> {coworker.sellerId?.firstName} {coworker.sellerId?.lastName}</p>
            <p><FiDollarSign /> Rate: ${coworker.rate}</p>
            <p><FiClipboard /> Type: {coworker.priceType}</p>
            <p>Status: <span className={`status-text ${coworker.status}`}>{coworker.status}</span></p>
          </div>
        </>
      )}
    </div>
  );
};

export default SpaceDetails;
