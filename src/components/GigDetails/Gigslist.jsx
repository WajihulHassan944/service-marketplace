'use client';

import React, { useEffect, useState } from 'react'; // ✅ include useState here
import styles from './Gigs.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGigs } from '@/redux/features/gigsSlice';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { baseUrl } from '@/const';



const GigListSection = ({ userId, excludeGigId, currentGig }) => {
  const dispatch = useDispatch();
  const { gigs, status, error } = useSelector((state) => state.gigs);
const [selectedPackage, setSelectedPackage] = useState(null);
const router = useRouter();
const [showPopup, setShowPopup] = useState(false);
const [textInfo, setTextInfo] = useState('');
const [file, setFile] = useState(null);
const [paymentMethod, setPaymentMethod] = useState("balance");
const [loadingOrder, setLoadingOrder] = useState(false);

const buyer = useSelector((state) => state.user);


  useEffect(() => {
    dispatch(fetchGigs());
  }, [dispatch]);

  const filteredGigs = gigs.filter(
    (gig) => gig.userId?._id === userId && gig._id !== excludeGigId
  );

  const getActivePackages = (packages) => {
    const active = {};
    if (packages?.basic) active.basic = packages.basic;
    if (packages?.standard) active.standard = packages.standard;
    if (packages?.premium) active.premium = packages.premium;
    return active;
  };

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^./, (str) => str.toUpperCase());
  };

  const formatValue = (value) => {
    if (typeof value === 'boolean') return value ? '✔' : '✖';
    if (typeof value === 'number') return value;
    if (value === null || value === undefined) return '—';
    return value.toString();
  };

  const renderPackageTable = (gig) => {
  const activePackages = getActivePackages(gig.packages);
  const columns = Object.keys(activePackages);

  const allKeys = Array.from(
    new Set(
      columns.flatMap((pkgType) => Object.keys(activePackages[pkgType] || {}))
    )
  );

  if (columns.length === 0 || allKeys.length === 0) return null;

  return (
    
    <div className={styles.packageWrapper} key={gig._id}>
      

      <div
        className={styles.packageTable}
        style={{ gridTemplateColumns: `1fr repeat(${columns.length}, 1fr)` }}
      >
        {/* Header Row */}
        <div className={`${styles.headerCell} ${styles.firstCol}`}>Field</div>
        {columns.map((pkgType) => (
          <div key={pkgType} className={styles.headerCell}>
            {pkgType.charAt(0).toUpperCase() + pkgType.slice(1)}
          </div>
        ))}

        {/* Dynamic Rows */}
        {allKeys.map((key) => (
          <React.Fragment key={key}>
            <div className={styles.firstCol}>{formatLabel(key)}</div>
            {columns.map((pkgType) => (
              <div key={pkgType + key} className={styles.cell}>
                {formatValue(activePackages[pkgType][key])}
              </div>
            ))}
          </React.Fragment>
        ))}

        {/* Purchase Button Row */}
        <div className={styles.firstCol}></div>
        {columns.map((pkgType) => (
          <div key={`purchase-${pkgType}`} className={styles.cell}>
            <button
  className={styles.purchaseBtn}
onClick={() => {
  setSelectedPackage({
    gigId: gig._id,
    sellerId: gig.userId._id,
    packageType: pkgType,
    pkg: gig.packages[pkgType],
  });
  setShowPopup(true);
}}

>
  Select
</button>

          </div>
        ))}
      </div>
    </div>
  );
};

  return (
    <div className={styles.container}>
      {currentGig && renderPackageTable(currentGig)}
      {status === 'loading' && <p>Loading gigs...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {filteredGigs.map(renderPackageTable)}
      {showPopup && selectedPackage && (
  <div className={styles.popupOverlay}>
    <div className={styles.popupContent}>
      <h3>Provide Additional Information</h3>

      <label>Enter any additional requirements:</label>
      <textarea
        value={textInfo}
        onChange={(e) => setTextInfo(e.target.value)}
        placeholder="Type here..."
      />

      <label className={styles.fileLabel}>Upload Document (PDF/DOC):</label>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        className={styles.fileInputStyled}
        onChange={(e) => setFile(e.target.files[0])}
      />

      <div className={styles.paymentOptions}>
        <h4>Select Payment Method</h4>

        <label className={styles.paymentOption}>
          <input
            type="radio"
            name="paymentMethod"
            value="balance"
            checked={paymentMethod === "balance"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Pay with balance (${buyer?.wallet?.balance ?? 0})
        </label>

        {buyer?.wallet?.cards?.length > 0 ? (
          <label className={styles.paymentOption}>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Pay with card:
            <span className={styles.cardDetails}>
              <img
                src={
                  buyer.wallet.cards.find((c) => c.isPrimary)?.brand === "mastercard"
                    ? "/assets/mastercard.png"
                    : "/assets/visa.png"
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

      <div className={styles.popupActions}>
        <button
          className={styles['popupActions-btn']}
          onClick={() => setShowPopup(false)}
        >
          Cancel
        </button>

        <button
          className={styles['popupActions-btn']}
          onClick={async () => {
            setLoadingOrder(true);
            try {
              const formData = new FormData();
              formData.append("gigId", selectedPackage.gigId);
              formData.append("sellerId", selectedPackage.sellerId);
              formData.append("buyerId", buyer._id);
              formData.append("packageType", selectedPackage.packageType);
              formData.append("totalAmount", selectedPackage.pkg.price);
              formData.append("requirements", textInfo);
              formData.append("paymentMethod", paymentMethod);
              if (file) formData.append("file", file);
              const referrerId = localStorage.getItem("referrerId");
              if (referrerId) formData.append("referrerId", referrerId);

              const response = await fetch(`${baseUrl}/orders/create`, {
                method: "POST",
                body: formData,
              });

              const result = await response.json();
              if (result.success) {
                localStorage.removeItem("referrerId");
                toast.success("Order placed successfully!");
                setShowPopup(false);
                setSelectedPackage(null);
                router.push("/orders");
              } else {
                toast.error(result.message || "Failed to place order");
              }
            } catch (err) {
              console.error("Order error:", err);
              toast.error("Something went wrong.");
            } finally {
              setLoadingOrder(false);
            }
          }}
          disabled={loadingOrder}
        >
          {loadingOrder ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default GigListSection;
