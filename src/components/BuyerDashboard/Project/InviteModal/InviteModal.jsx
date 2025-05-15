import React, { useState } from "react";
import "./invitemodal.css";

const InviteModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [priceType, setPriceType] = useState("hourly");
  const [price, setPrice] = useState("");

  // Array with seller names and profile pics
  const availableSellers = [
    { name: "Alice", image: "https://i.pravatar.cc/40?img=1" },
    { name: "Bob", image: "https://i.pravatar.cc/40?img=2" },
    { name: "Charlie", image: "https://i.pravatar.cc/40?img=3" },
  ];

  return (
    <div>
      <button className="give-review-btn" onClick={() => setShowModal(true)}>
        Invite a coworker
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Invite a Coworker</h2>

            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="hourly"
                  checked={priceType === "hourly"}
                  onChange={() => setPriceType("hourly")}
                />
                Hourly Price
              </label>
              <label>
                <input
                  type="radio"
                  value="fixed"
                  checked={priceType === "fixed"}
                  onChange={() => setPriceType("fixed")}
                />
                Fixed Price
              </label>
            </div>

            <label>
              {priceType === "hourly" ? "Hourly Rate ($):" : "Fixed Price ($):"}
              <input
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>

            <div className="seller-list">
              <strong>Available Sellers:</strong>
              <ul>
                {availableSellers.map((seller, index) => (
                  <li key={index} className="seller-item">
                    <img
                      src={seller.image}
                      alt={seller.name}
                      className="seller-img"
                    />
                    <span>{seller.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="done-btn" onClick={() => setShowModal(false)}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InviteModal;
