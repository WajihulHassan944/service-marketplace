'use client';
import Image from "next/image";
import styles from "./GigDetails.module.css";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { baseUrl } from "@/const";
import { useSelector } from "react-redux";
import Link from "next/link";
import GigListSection from "./Gigslist";
import toast from "react-hot-toast";
import { FiShare2 } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import './LoadingSpinner.css';
import { FaHome } from 'react-icons/fa';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const GigDetails = () => {
   const userLoggedIn = useSelector((state) => state.user);
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
  const [clients, setClients] = useState([]);
const router = useRouter();
  const buyer = useSelector((state) => state.user);
  const buyerId = buyer?._id;
const [paymentMethod, setPaymentMethod] = useState("balance");
const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [fade, setFade] = useState(false);

const changeImage = (newIndex) => {
  setFade(true);
  setTimeout(() => {
    setCurrentImageIndex(newIndex);
    setFade(false);
  }, 200); // Match half of transition duration for smoothness
};

const handlePrevImage = () => {
  const newIndex =
    currentImageIndex === 0 ? gig.images.length - 1 : currentImageIndex - 1;
  changeImage(newIndex);
};

const handleNextImage = () => {
  const newIndex =
    currentImageIndex === gig.images.length - 1 ? 0 : currentImageIndex + 1;
  changeImage(newIndex);
};


useEffect(() => {
  const referrerIdFromUrl = searchParams.get("referrerId");
  const existingReferrerId = localStorage.getItem("referrerId");

  if (referrerIdFromUrl && !existingReferrerId) {
    localStorage.setItem("referrerId", referrerIdFromUrl);
  }
}, []);

  useEffect(() => {
    if (gigIdParam) {
      fetch(`${baseUrl}/gigs/getGigById/${gigIdParam}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setGig(data.gig);
            setUser(data.user);
            setClients(data.clients);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching gig:", err);
          setLoading(false);
        });
    }
  }, [gigIdParam]);
  const isWishlisted = userLoggedIn?.wishlist?.includes(gig._id);
  
if (loading) return (
  <div className="loading-container">
    <FaSpinner className="spinner" size={40} />
    <p className="loading-text">Loading gig details...</p>
  </div>
);
  if (!gig) return <p>No gig found</p>;
  const pkg = gig?.packages?.[packageType];
 

  const toggleWishlist = async (e) => {
    e.stopPropagation(); // prevent card click

    if (!userLoggedIn?._id) {
      toast.error("Please log in to use the wishlist.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/users/toggle-wishlist`, {
        method: 'POST',
       credentials: 'include',
headers: {
  'Content-Type': 'application/json',
}
,
        body: JSON.stringify({ gigId: gig._id }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        window.location.reload();
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Toggle wishlist error:", err);
      toast.error("Error toggling wishlist.");
    } finally {
      setLoading(false);
    }
  };



const handleShareClick = (e) => {
  e.stopPropagation();
  if (!userLoggedIn?._id) return;
 if (!gig) return ;
  const url = `${window.location.origin}/services-details?gigId=${gig._id}&referrerId=${userLoggedIn._id}`;
  navigator.clipboard.writeText(url);
  toast.success('Link copied to clipboard!');
};
  return (
    <div className={styles.containerGigDetails}>
      <nav className={styles.breadcrumb}>
        <span><FaHome style={{ marginRight: "4px", marginTop:'5px' }} /> / {gig.category}</span> / <span>{gig.subcategory}</span>
      </nav>

      <h1 className={styles.title}>{gig.gigTitle}</h1>

<div className={styles.spaceddivindetails}>
        <div className={styles.sellerInfo}>
        <Image src={gig.userId.profileUrl} alt="Seller Profile" width={50} height={50} className={styles.profileImage} />
        <div>
          <strong>{gig.userId.firstName} {gig.userId.lastName}</strong> <span className={styles.level}>{gig.userId?.sellerDetails?.level}</span>
          <div className={styles.rating}>★★★★★ <span>(No reviews)</span></div>
        </div>
      </div>

<div className={styles.btnsgigDetailswrap}>
  {userLoggedIn?._id && userLoggedIn.currentDashboard === "buyer" && (
  <button className={styles.sharebtn} onClick={handleShareClick}>
    <FiShare2 size={18} />
  </button>
)}
 <button
  className={`heart-btn ${isWishlisted ? 'wishlisted' : ''}`}
  onClick={toggleWishlist}
  disabled={loading}
>
  {isWishlisted ? <AiFillHeart size={20} color="#e0245e" /> : <AiOutlineHeart size={20} />}
</button>
</div>


</div>

      <div className={styles.mainContent}>
        <div className={styles.leftContent}>
      
      


<div className={styles.imageSlider}>
  {gig.images?.length > 0 && (
    <>
     <Image
  src={gig.images[currentImageIndex].url}
  alt={`Gig Image ${currentImageIndex + 1}`}
  width={800}
  height={500}
  className={`${styles.gigheaderImage} ${fade ? styles['fade-out'] : ''}`}
/>

      {gig.images.length > 1 && (
        <>
          <button onClick={handlePrevImage} className={styles.arrowLeft}>‹</button>
          <button onClick={handleNextImage} className={styles.arrowRight}>›</button>
        </>
      )}
    </>
  )}
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
 
     <GigListSection 
  excludeGigId={gig._id}
  currentGig={gig}  
/>
     {clients.length > 0 && (
  <div style={{border: '1px solid black',padding: ' 0px 12px', width: '100%', marginTop: '20px', }}>
    <strong style={{ fontSize: '18px', marginBottom: '10px', display: 'block' }}>Among my Clients</strong>
    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
      {clients.map((client) => (
        <div key={client._id} style={{ textAlign: 'center', maxWidth: '100px' }}>
          <img
            src={client.profileUrl}
            alt={client.name}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '6px',
            }}
          />
          <div style={{ fontSize: '14px', fontWeight: '500' }}>{client.name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{client.country}</div>
        </div>
      ))}
    </div>
  </div>
)}
        </div>

       
      <div className={styles.packageCard}>
        <div className={styles.tabs}>
        {(
  gig.packages?.basic &&
  gig.packages?.standard &&
  gig.packages?.premium
    ? ['basic', 'standard', 'premium']
    : ['standard']
).map((pkgName) => (
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
          <Link href={`/messages?receiverId=${gig.userId._id}`}>
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
      formData.append("sellerId", gig.userId._id);
      formData.append("buyerId", buyerId);
      formData.append("packageType", packageType);
      formData.append("totalAmount", pkg.price);
      formData.append("requirements", textInfo);
      formData.append("paymentMethod", paymentMethod);

      if (file) formData.append("file", file);

const referrerId = localStorage.getItem("referrerId");
console.log(referrerId);
if (referrerId) {
  formData.append("referrerId", referrerId);
}
      const response = await fetch(`${baseUrl}/orders/create`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (result.success) {
        localStorage.removeItem("referrerId");
       toast.success("Order placed successfully!");
        setShowPopup(false);
        router.push('/orders');
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
