'use client';
import Image from "next/image";
import styles from "./GigDetails.module.css";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { baseUrl } from "@/const";
import { useSelector } from "react-redux";
import Link from "next/link";

const GigDetails = () => {
  const searchParams = useSearchParams();
  const gigIdParam = searchParams.get("gigId");
  const [showPopup, setShowPopup] = useState(false);
  const [textInfo, setTextInfo] = useState('');
  const [file, setFile] = useState(null);
  const [packageType, setpackageType] = useState('standard');
  const [gig, setGig] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingOrder, setLoadingOrder] = useState(false);

  const buyer = useSelector((state) => state.user);
  const buyerId = buyer?._id;
const [paymentMethod, setPaymentMethod] = useState("balance");

  useEffect(() => {
    if (gigIdParam) {
      fetch(`${baseUrl}/gigs/getGigById/${gigIdParam}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setGig(data.gig);
            setUser(data.user);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching gig:", err);
          setLoading(false);
        });
    }
  }, [gigIdParam]);

  if (loading) return <p>Loading gig details...</p>;
  if (!gig) return <p>No gig found</p>;
  const pkg = gig?.packages?.[packageType];
 
console.log(gig);
  return (
    <div className={styles.containerGigDetails}>
      <nav className={styles.breadcrumb}>
        <span>🏠 / {gig.category}</span> / <span>{gig.subcategory}</span>
      </nav>

      <h1 className={styles.title}>{gig.gigTitle}</h1>

      <div className={styles.sellerInfo}>
        <Image src={gig.userId.profileUrl} alt="Seller Profile" width={50} height={50} className={styles.profileImage} />
        <div>
          <strong>{gig.userId.firstName} {gig.userId.lastName}</strong> <span className={styles.level}>{gig.userId?.sellerDetails?.level}</span>
          <div className={styles.rating}>★★★★★ <span>(No reviews)</span></div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.leftContent}>
          <div className={styles.imageSlider}>
            <Image src={gig.images?.[0]?.url} alt="Gig Image" width={800} height={500} className={styles.gigheaderImage} />
          </div>

          <section className={styles.aboutSection}>
            <h2>About this gig</h2>
            <h3>{gig.gigTitle} | No Projects Completed</h3>
            <p>{gig.gigDescription}</p>
            <h5 style={{margin:'15px 0', fontSize:'17px'}}>About Seller</h5>
            <p>
            {gig.userId.sellerDetails?.description ? gig.userId.sellerDetails?.description : "No description added"}
            </p>
          </section>

          <section className={styles.techStack}>
            <div>
              <h4>Search Tag</h4>
              <p>#{gig.searchTag}</p>
            </div>
            <div>
              <h4>Positive Keywords</h4>
              <p>{gig.positiveKeywords?.join(", ")}</p>
            </div>
          </section>
        </div>

       
      <div className={styles.packageCard}>
        <div className={styles.tabs}>
          {(gig.offerPackages ? ['basic', 'standard', 'premium'] : ['standard']).map((pkgName) => (
            <span
              key={pkgName}
              className={packageType === pkgName ? styles.active : ''}
              onClick={() => setpackageType(pkgName)}
            >
              {pkgName.charAt(0).toUpperCase() + pkgName.slice(1)}
            </span>
          ))}
        </div>

        <div className={styles.packageCardPadded}>
          <div className={styles.price}>${pkg.price}</div>
          <p className={styles.subscription}>Save up to 20% with <span className={styles.subscribeLink}>Subscribe to Save</span></p>
          <p className={styles.desc}><strong>{pkg.packageName}</strong> — {pkg.description}</p>

          <div className={styles.meta}>
            <span>⏱ {pkg.deliveryTime} Day{pkg.deliveryTime > 1 ? 's' : ''} Delivery</span>
            <span>⟳ {pkg.revisions === -1 ? 'Unlimited' : `${pkg.revisions} Revisions`}</span>
          </div>

          <div className={styles.included}><span>What's Included</span><span>▾</span></div>

          <button className={styles.continueBtn} onClick={() => setShowPopup(true)}>
            Purchase →
          </button>

          <p className={styles.compare}>Compare Packages</p>
          <Link href={`/messages?receiverId=${gig.userId}`}>
            <button className={styles.contactBtn}>Contact Seller</button>
          </Link>
        </div>
      </div>
    </div>
      
      {showPopup && (
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

        {/* Balance option */}
        <label className={styles.paymentOption}>
          <input
            type="radio"
            name="paymentMethod"
            value="balance"
            checked={paymentMethod === "balance"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Pay with balance (${buyer.wallet.balance})
        </label>

        {/* Card option */}
        {buyer.wallet?.cards?.length > 0 ? (
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
        <button className={styles['popupActions-btn']} onClick={() => setShowPopup(false)}>Cancel</button>

<button
  className={styles['popupActions-btn']}
  onClick={async () => {
    setLoadingOrder(true);
    try {
      const formData = new FormData();
      formData.append("gigId", gig._id);
      formData.append("sellerId", gig.userId);
      formData.append("buyerId", buyerId);
      formData.append("packageType", packageType);
      formData.append("totalAmount", pkg.price);
      formData.append("requirements", textInfo);
      formData.append("paymentMethod", paymentMethod);

      if (file) formData.append("file", file);

      const response = await fetch(`${baseUrl}/orders/create`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (result.success) {
        alert("Order placed successfully!");
        setShowPopup(false);
        window.location.reload();
      } else {
        alert(result.message || "Failed to place order");
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("Something went wrong.");
    } finally {
      setLoadingOrder(false);
    }
  }}
  disabled={loading}
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

export default GigDetails;
