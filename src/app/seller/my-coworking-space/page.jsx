"use client";
import React, { useEffect, useState } from "react";
import "./CoworkingSpace.css";
import { useSelector } from "react-redux";
import { baseUrl } from "@/const";
import { useRouter } from "next/navigation";
import withAuth from "@/hooks/withAuth";

const CoworkingSpace = () => {
  const user = useSelector((state) => state.user);
  const sellerId = user?._id;
 const router = useRouter();
  const [coworkerData, setCoworkerData] = useState([]);

  useEffect(() => {
    const fetchCoworkerOrders = async () => {
      try {
        const res = await fetch(`${baseUrl}/orders/coworker-orders/${sellerId}`);
        const data = await res.json();
        if (data.success) {
          setCoworkerData(data.orders);
        } else {
          console.error("Failed to fetch coworker orders:", data.message);
        }
      } catch (err) {
        console.error("Error fetching coworker orders:", err);
      }
    };

    if (sellerId) {
      fetchCoworkerOrders();
    }
  }, [sellerId]);

const handleCoworkerAction = async (orderId, action) => {
  const url = `${baseUrl}/orders/response-to-cowork-action/${orderId}/coworker-response?sellerId=${sellerId}&action=${action}`;
  
  console.log("📦 Requesting coworker action with URL:", url);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json", // Ensure backend sends JSON
      },
    });

    const contentType = res.headers.get("content-type");

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ Server responded with status ${res.status}`);
      console.log("🧾 Response body:", errorText);
      throw new Error("Request failed with server error");
    }

    if (!contentType || !contentType.includes("application/json")) {
      const raw = await res.text();
      console.error("❌ Invalid content-type. Expected JSON but got:", contentType);
      console.log("🧾 Raw response body:", raw);
      throw new Error("Invalid response format: expected JSON");
    }

    const data = await res.json();

    if (data.success) {
      console.log(`✅ ${action} successful for order ${orderId}`);
      setCoworkerData((prev) =>
        prev.map((item) =>
          item.orderId === orderId ? { ...item, status: action === "accept" ? "accepted" : "rejected" } : item
        )
      );
    } else {
      console.warn("⚠️ Server responded but action not successful:", data.message || "Unknown issue");
    }
  } catch (err) {
    console.error(`❌ Error performing ${action}:`, err.message || err);
  }
};

  return (
    <div className="coworking-wrapper">
      <h2 className="coworking-heading">Collaborate on Projects</h2>
      <p className="coworking-subheading">Manage incoming coworking requests here.</p>

     <div className="coworking-table">
  <div className="coworking-table-header">
    <span>Order</span>
    <span>Gig Title</span>
    <span>Seller</span>
    <span>Amount</span>
    <span>Type</span>
    <span>Status</span>
  </div>

  {coworkerData.length === 0 ? (
    <div className="no-coworking-message">
      <p>No coworking requests at the moment.</p>
    </div>
  ) : (
    coworkerData.map((item) => (
      <div
        className="coworking-table-row"
        key={item.orderId}
        onClick={() =>
          router.push(`/seller/my-coworking-space-details?orderId=${item.orderId}`)
        }
        style={{ cursor: "pointer" }}
      >
        <div className="order-img-cell">
          <img
            src={item.gigImage || "/assets/gigs/default.png"}
            alt="Gig"
            className="gig-thumbnail"
          />
        </div>
        <span>{item.gigTitle}</span>
        <span>{item.sellerName}</span>
        <span>{item.amount}</span>
        <span>{item.type}</span>

        <div className="status-buttons">
          {item.status === "pending" ? (
            <>
              <button
                className="accept-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCoworkerAction(item.orderId, "accept");
                }}
              >
                Accept
              </button>
              <button
                className="reject-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCoworkerAction(item.orderId, "reject");
                }}
              >
                Reject
              </button>
            </>
          ) : (
            <span className={`status-text ${item.status}`}>{item.status}</span>
          )}
        </div>
      </div>
    ))
  )}
</div>

    </div>
  );
};

export default withAuth(CoworkingSpace);
