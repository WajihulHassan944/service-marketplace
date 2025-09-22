import React, { useState } from "react";
import { FiChevronDown, FiFileText, FiPackage } from "react-icons/fi";
import "./OrderDeliveries.css";

export default function OrderDeliveries({ order }) {
  const [downloadingFile, setDownloadingFile] = useState(null);

  if (!order || !Array.isArray(order.deliveries) || order.deliveries.length === 0) return null;

  // ✅ Universal download function with loader
  const handleDownload = async (url, filename) => {
    try {
      setDownloadingFile(filename);

      const res = await fetch(url);
      if (!res.ok) throw new Error("Network response was not ok");
      const blob = await res.blob();

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();

      window.URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("Download failed", err);
      alert("Failed to download file. Please try again.");
    } finally {
      setDownloadingFile(null);
    }
  };

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
              delivery.files.map((file, i) => {
                const filename = file.originalname || "DeliveryFile";
                return (
                  <button
                    key={file._id || i}
                    className="delivery-file-link"
                    onClick={() => handleDownload(file.url, filename)}
                    disabled={downloadingFile === filename}
                  >
                    <FiFileText style={{ marginRight: "5px" }} />
                    {downloadingFile === filename ? "Downloading..." : filename}
                  </button>
                );
              })
            ) : (
              <p className="text-muted">No files attached.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
