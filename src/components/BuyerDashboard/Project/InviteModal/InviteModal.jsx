import React, { useEffect, useState } from "react";
import "./invitemodal.css";
import { useSelector } from "react-redux";
import { baseUrl } from "@/const";
import toast from "react-hot-toast";

const InviteModal = ({ onClose, order }) => {
  const [availableSellers, setAvailableSellers] = useState([]);
  const [selectedSellers, setSelectedSellers] = useState({});
  const user = useSelector((state) => state.user);
useEffect(() => {
  const fetchSellers = async () => {
    try {
      const res = await fetch(`${baseUrl}/users/getSellersForCowork`);
      const data = await res.json();

      // Extract coworker sellerIds with status "pending" or "accepted"
      const activeCoworkerIds = order?.coworkers
        ?.filter(c => c.status === "pending" || c.status === "accepted")
        .map(c => typeof c.sellerId === "object" ? c.sellerId._id : c.sellerId) || [];

      // Filter sellers
      const filtered = data.data.filter(
        seller =>
          seller._id !== user._id &&
          !activeCoworkerIds.includes(seller._id)
      );

      setAvailableSellers(filtered);
    } catch (err) {
      console.error("Error fetching sellers:", err);
    }
  };

  fetchSellers();
}, [user._id, order]);

  const handleSellerToggle = (sellerId) => {
    setSelectedSellers((prev) => {
      if (prev[sellerId]) {
        const updated = { ...prev };
        delete updated[sellerId];
        return updated;
      } else {
        return {
          ...prev,
          [sellerId]: { priceType: "hourly", rate: "" },
        };
      }
    });
  };

  const calculateTotalRate = () => {
  return Object.values(selectedSellers).reduce((sum, item) => {
    const rate = parseFloat(item.rate);
    if (item.priceType === "hourly") {
      const hours = parseFloat(item.maxHours);
      return sum + (isNaN(rate) || isNaN(hours) ? 0 : rate * hours);
    } else {
      return sum + (isNaN(rate) ? 0 : rate);
    }
  }, 0);
};


  const handleSubmit = async () => {
   const coworkers = Object.entries(selectedSellers).map(([sellerId, data]) => ({
  sellerId,
  priceType: data.priceType,
  rate: parseFloat(data.rate),
  maxHours:
    data.priceType === "hourly" ? parseFloat(data.maxHours) || 0 : undefined,
}));


    const totalRate = calculateTotalRate();
    if (totalRate > order.totalAmount) {
    toast.error(`Total rate exceeds the allowed amount of $${order.totalAmount}`);
      return;
    }

    if (coworkers.some(c => isNaN(c.rate) || c.rate <= 0)) {
      toast.error("All rates must be valid positive numbers.");
      return;
    }

    if (coworkers.length === 0) {
      toast.error("Please select at least one coworker.");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/orders/invite-coworkers/${order._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coworkers }),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Coworkers invited successfully!");
        onClose();
      } else {
        toast.error(result.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Invite failed:", err);
      toast.error("Something went wrong.");
    }
  };

  return (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Invite a Coworker</h2>
      <p><strong>Order Budget: ${order.totalAmount}</strong></p>

      <div className="seller-list">
        <strong>Available Sellers:</strong>
        <ul>
          {availableSellers.map((seller) => {
            const isSelected = selectedSellers[seller._id];
            const data = selectedSellers[seller._id] || {};
            const isHourly = data.priceType === "hourly";
            const rate = parseFloat(data.rate) || 0;
            const maxHours = parseFloat(data.maxHours) || 0;
            const total = isHourly ? rate * maxHours : rate;

            return (
              <li key={seller._id} className="seller-wrapper">
                <div
                  className={`seller-item ${isSelected ? "selected" : ""}`}
                  onClick={() => handleSellerToggle(seller._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={seller.profileUrl || `https://i.pravatar.cc/40?u=${seller._id}`}
                    alt={seller.firstName}
                    className="seller-img"
                  />
                  <span>{seller.firstName} {seller.lastName}</span>
                </div>

                {isSelected && (
                  <div className="price-section">
                    <p><strong>{seller.firstName}'s Price Options:</strong></p>

                    <div className="radio-group">
                      <label>
                        <input
                          type="radio"
                          value="hourly"
                          checked={isHourly}
                          onChange={() =>
                            setSelectedSellers((prev) => ({
                              ...prev,
                              [seller._id]: {
                                ...prev[seller._id],
                                priceType: "hourly",
                              },
                            }))
                          }
                        />
                        Hourly Price
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="fixed"
                          checked={!isHourly}
                          onChange={() =>
                            setSelectedSellers((prev) => ({
                              ...prev,
                              [seller._id]: {
                                ...prev[seller._id],
                                priceType: "fixed",
                                maxHours: "",
                              },
                            }))
                          }
                        />
                        Fixed Price
                      </label>
                    </div>

                    <label>
                      {isHourly ? "Hourly Rate ($):" : "Fixed Price ($):"}
                      <input
                        type="number"
                        min="1"
                        placeholder="Enter rate"
                        value={data.rate}
                        onChange={(e) =>
                          setSelectedSellers((prev) => ({
                            ...prev,
                            [seller._id]: {
                              ...prev[seller._id],
                              rate: e.target.value,
                            },
                          }))
                        }
                      />
                    </label>

                    {isHourly && (
                      <label>
                        {seller.firstName} will be required to work for how many max hours?
                        <input
                          type="number"
                          min="1"
                          placeholder="Enter max hours"
                          value={data.maxHours || ""}
                          onChange={(e) =>
                            setSelectedSellers((prev) => ({
                              ...prev,
                              [seller._id]: {
                                ...prev[seller._id],
                                maxHours: e.target.value,
                              },
                            }))
                          }
                        />
                      </label>
                    )}

                    <div>
                      <strong>Total for {seller.firstName}: ${total.toFixed(2)}</strong>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div style={{ marginTop: "10px" }}>
        <strong>Total Selected: ${calculateTotalRate()}</strong>
      </div>

      <button className="done-btn" onClick={handleSubmit}>
        Invite
      </button>
    </div>
  </div>
);

};

export default InviteModal;
