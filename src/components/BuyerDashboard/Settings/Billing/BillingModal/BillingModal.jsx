'use client';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./BillingModal.css";
import { baseUrl } from "@/const";
import toast from "react-hot-toast";
import Image from "next/image";
const stripePromise = loadStripe("pk_test_51RbDpx4ainXKK2PaAxl5ehcVkFSyLD4sI6ueZSndoFYKIhko16nsHOnvJznN0YTogJsBezhZSYCJxXW9fLjWzAgY00cv05me5D");

const BillingForm = ({ onClose }) => {
  const user = useSelector((state) => state.user);
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const res = await fetch(`${baseUrl}/wallet/add-billing-method`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        paymentMethodId: paymentMethod.id,
      }),
      credentials: "include", 
    });

    const data = await res.json();
    if (data.success) {
      toast.success(data.message);
      onClose();
      window.location.reload();
    } else {
      setError(data.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
   <div className="custom-modal-overlay">
  <div className="custom-modal-content">
    <div className="flexed-div"><Image src='/assets/stripe_logo.png' alt="stripe logo" width={47} height={47} className="stripeLogo" />
    <h2>Add Billing Method</h2></div>
    <form onSubmit={handleSubmit}>
      <div className="custom-card-element">
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>

      {error && <p className="custom-modal-error">{error}</p>}

      <div className="custom-modal-actions">
        <button
          type="submit"
          className="custom-modal-btn confirm"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Billing Method"}
        </button>
        <button
          type="button"
          className="custom-modal-btn cancel"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>
 );
};

const AddBillingMethod = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="add-btn" onClick={() => setShowModal(true)}>
        Add a New Billing Method
      </button>

      {showModal && (
        <Elements stripe={stripePromise}>
          <BillingForm onClose={() => setShowModal(false)} />
        </Elements>
      )}
    </>
  );
};

export default AddBillingMethod;
