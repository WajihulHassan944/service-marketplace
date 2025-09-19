import React, { useState, useEffect } from 'react';
import './CustomOfferPopup.css';
import { baseUrl } from '@/const';
import toast from 'react-hot-toast';
const CustomOfferPopup = ({ sellerId, buyerId, onClose }) => {
  const [gigs, setGigs] = useState([]);
  const [selectedGig, setSelectedGig] = useState(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await fetch(`${baseUrl}/gigs/all/${sellerId}`);
        const data = await res.json();
        if (data.success) {
          setGigs(data.gigs);
        }
      } catch (err) {
        console.error("Error fetching gigs:", err);
      }
    };
    fetchGigs();
  }, [sellerId]);

  const handleSendOffer = async () => {
    if (!selectedGig || !amount || !description || !deliveryTime) {
      alert("Please fill all fields.");
      return;
    }

    setIsSubmitting(true);
const offerCard = `
  <div style="background-color: #f7f7f7; border: 1px solid #ccc; padding: 15px; border-radius: 8px; max-width: 400px; ">
    <h3 style="margin-bottom: 10px; color: #28a745;">Custom Offer - ${selectedGig.gigTitle}</h3>
    <p><strong>Amount:</strong> $${amount}</p>
    <p style="margin:7px 0;"><strong>Description:</strong> ${description}</p>
    <p><strong>Delivery Time:</strong> ${deliveryTime} day(s)</p>
    <div style="display: flex; gap: 10px; margin-top: 10px;">
      <button 
        data-gigid="${selectedGig._id}" 
        data-amount="${amount}"
        data-description="${description}"
        data-deliverytime="${deliveryTime}"
        class="accept-offer-btn"
        style="padding: 8px 12px; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Accept Offer
      </button>
      <button 
        class="delete-offer-btn"
        style="padding: 8px 12px; background-color: #000000; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Delete Offer
      </button>
    </div>
  </div>
`;




    try {
      await fetch(`${baseUrl}/messages/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: sellerId,
          receiverId: buyerId,
          message: offerCard
        })
      });
      toast.success("Offer sent!");
      onClose();
    } catch (err) {
      console.error("Message send error:", err);
      toast.error("Failed to send offer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="custom-offer-overlay">
      <div className="custom-offer-container">
        <h2>Send Custom Offer</h2>

        <label>Select Gig</label>
        <select
          value={selectedGig?._id || ''}
          onChange={(e) => {
            const gig = gigs.find(g => g._id === e.target.value);
            setSelectedGig(gig);
          }}
        >
          <option value="">-- Select a gig --</option>
          {gigs.map((gig) => (
            <option key={gig._id} value={gig._id}>{gig.gigTitle}</option>
          ))}
        </select>

        <label>Amount ($)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <label>Delivery Time (days)</label>
        <input
          type="number"
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
        />

        <div className="custom-offer-buttons">
          <button onClick={onClose} className="cancel-btn">Cancel</button>
          <button onClick={handleSendOffer} disabled={isSubmitting} className="send-btn">
            {isSubmitting ? 'Sending...' : 'Send Offer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomOfferPopup;
