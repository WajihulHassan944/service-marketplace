import React, { useState, useEffect } from 'react';
import './OrderPopup.css';
import { baseUrl } from '@/const';
import toast from 'react-hot-toast';

const OrderPopup = ({
  buyer,
  gigId,
  messageId,
  buyerId,
  amount,
  description,       // <-- added
  deliveryTime,      // <-- added
  setShowPopup,
}) => {
  const [textInfo, setTextInfo] = useState('');
  const [file, setFile] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('balance');
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [gig, setGig] = useState(null);
console.log(buyer);
  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await fetch(`${baseUrl}/gigs/getGigById/${gigId}`);
        const data = await res.json();
        if (data.success) {
          setGig(data.gig);
        } else {
          alert(data.message || 'Failed to load gig');
        }
      } catch (err) {
        console.error('Fetch gig error:', err);
      }
    };

    fetchGig();
  }, [gigId]);


  const handleSubmit = async () => {
  if (!gig) return;
  setLoadingOrder(true);
  try {
    const formData = new FormData();
    formData.append('gigId', gig._id);
    formData.append('sellerId', gig.userId._id);
    formData.append('buyerId', buyerId);
    formData.append('packageType', 'custom');
    formData.append('totalAmount', amount);
    formData.append('requirements', textInfo);
    formData.append('paymentMethod', paymentMethod);
    formData.append('customDescription', description);
formData.append('customDeliveryTime', deliveryTime);
    if (file) formData.append('file', file);

    // ✅ Log FormData content
    console.log('🧾 FormData content:');
    for (let [key, value] of formData.entries()) {
      if (key === 'file' && value instanceof File) {
        console.log(`${key}: ${value.name} (${value.type}, ${value.size} bytes)`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    const response = await fetch(`${baseUrl}/orders/create`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (result.success) {
      
 try {
   await fetch(`${baseUrl}/messages/update`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    messageId,
    newContent: `
      <div style="background-color: #f7f7f7; border: 1px solid #ccc; padding: 15px; border-radius: 8px; max-width: 400px; ">
        <h3 style="margin-bottom: 10px; color: #28a745;">Custom Offer - ${gig.gigTitle}</h3>
        <p><strong>Amount:</strong> $${amount}</p>
        <p style="margin:7px 0;"><strong>Description:</strong> ${description}</p>
        <p><strong>Delivery Time:</strong> ${deliveryTime} day(s)</p>
        <div style="display: flex; gap: 10px; margin-top: 10px;">
          <button 
            style="padding: 8px 12px; background-color: #6c757d; color: white; border: none; border-radius: 4px; cursor: default;" 
            disabled>
            Offer Accepted
          </button>
          <button 
            class="view-order-btn" 
            data-orderid="${result.order._id}" 
            style="padding: 8px 12px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
            View Order
          </button>
        </div>
      </div>
    `,
  }),
});

  } catch (err) {
    console.error('Failed to update message content:', err);
  }


      toast.success('Order placed successfully!');
      setShowPopup(false);
    } else {
      alert(result.message || 'Failed to place order');
    }
  } catch (err) {
    console.error('Order error:', err);
    alert('Something went wrong.');
  } finally {
    setLoadingOrder(false);
  }
};

  if (!gig) {
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <p>Loading gig details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Provide Additional Information</h3>

        <label>Enter any additional requirements:</label>
        <textarea
          value={textInfo}
          onChange={(e) => setTextInfo(e.target.value)}
          placeholder="Type here..."
        />

        <label className="file-label">Upload Document (PDF/DOC):</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="file-input"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <div className="payment-options">
          <h4>Select Payment Method</h4>

          <label className="payment-option">
            <input
              type="radio"
              name="paymentMethod"
              value="balance"
              checked={paymentMethod === 'balance'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Pay with balance (${buyer.wallet.balance})
          </label>

          {buyer.wallet?.cards?.length > 0 ? (
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Pay with card:
              <span className="card-details">
                <img
                  src={
                    buyer.wallet.cards.find((c) => c.isPrimary)?.brand === 'mastercard'
                      ? '/assets/mastercard.png'
                      : '/assets/visa.png'
                  }
                  alt="Card"
                />
                **** {buyer.wallet.cards.find((c) => c.isPrimary)?.last4}
              </span>
            </label>
          ) : (
            <p>No card available</p>
          )}
        </div>

        <div className="popup-actions">
          <button onClick={() => setShowPopup(false)}>Cancel</button>
          <button onClick={handleSubmit} disabled={loadingOrder}>
            {loadingOrder ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
