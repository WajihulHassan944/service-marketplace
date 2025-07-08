import React, { useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "@/const";
import "./TopUpModal.css";

const TopUpModal = () => {
  const user = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const primaryCard = user?.wallet?.cards?.find((card) => card.isPrimary);

  const handleTopUp = async () => {
    if (!amount || isNaN(amount)) return alert("Enter a valid amount");
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/wallet/add-funds`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, amount: Number(amount) }),
      });

      const data = await res.json();
      if (data.success) {
        alert(data.message || "Top-up success.");
        window.location.reload();
      } else {
        alert(data.message || "Top-up failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <>
      <button className="pay-now" onClick={() => setShowModal(true)}>Top up</button>

      {showModal && (
        <div className="topup-overlay">
          <div className="topup-container">
            <h2 className="topup-title">Top Up Balance</h2>
            <p className="topup-note">Payment will be deducted from your primary card:</p>

            {primaryCard ? (
              <div className="topup-card">
                <img
                  src={primaryCard.brand === "mastercard" ? "/assets/mastercard.png" : "/assets/visa.png"}
                  alt={primaryCard.brand}
                />
                <span>**** **** **** {primaryCard.last4}</span>
                <span>Exp: {primaryCard.expMonth}/{primaryCard.expYear}</span>
              </div>
            ) : (
              <p className="topup-nocard">No primary card found.</p>
            )}

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="topup-input"
            />

            <div className="topup-actions">
              <button className="topup-btn topup-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="topup-btn topup-confirm" onClick={handleTopUp} disabled={loading}>
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopUpModal;
