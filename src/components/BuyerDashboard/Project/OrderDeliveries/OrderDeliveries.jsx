import React from "react";
import { FiChevronDown, FiFileText, FiPackage } from "react-icons/fi";
import "./OrderDeliveries.css";

export default function OrderDeliveries({ order }) {
  if (!order || !Array.isArray(order.deliveries) || order.deliveries.length === 0) return null;

  return (
    <div className="deliveries-container">
      <div className="deliveries-header">
        <div className="header-left">
          <FiPackage size={20} />
          <span>Order Deliveries</span>
        </div>
        <FiChevronDown size={20} className="header-arrow" />
      </div>

      {order.deliveries.map((delivery, index) => (
        <div className="delivery-box" key={index}>
          <div className="delivery-title">Delivery {index + 1}</div>

          <div className="delivery-detail">
            <strong>Message:</strong>
            <p>{delivery.message || <span className="text-muted">No message provided.</span>}</p>
          </div>

          <div className="delivery-detail">
            <strong>Delivered At:</strong>
            <p>{new Date(delivery.deliveredAt).toLocaleString()}</p>
          </div>

          <div className="delivery-detail">
            <strong>Attached File(s):</strong>
            {delivery.files && delivery.files.length > 0 ? (
              delivery.files.map((file, i) => (
                <a
                  key={file._id || i}
                  href={file.url}
                  className="delivery-file-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiFileText style={{ marginRight: "5px" }} />
                  {file.originalname || "Delivery File"}
                </a>
              ))
            ) : (
              <p className="text-muted">No files attached.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
