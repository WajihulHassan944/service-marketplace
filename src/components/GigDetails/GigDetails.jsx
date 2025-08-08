'use client';
import Image from "next/image";
import styles from "./GigDetails.module.css";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { baseUrl } from "@/const";
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from "react-redux";
import Link from "next/link";
import GigListSection from "./Gigslist";
import toast from "react-hot-toast";
import { FiShare2 } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FaSpinner , FaCheck} from 'react-icons/fa';
import { FaClock, FaSyncAlt } from 'react-icons/fa';
import './LoadingSpinner.css';
import { FaHome , FaChevronDown} from 'react-icons/fa';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import AboutSec from "./aboutgig/aboutgig";
import { FiSearch } from 'react-icons/fi';
import CapitalizeFirstWord from "@/utils/CapitalizeFirstWord";
const GigDetails = () => {
   const userLoggedIn = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();

  const gigIdParam = searchParams.get("gigId");
 const [openIndex, setOpenIndex] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [textInfo, setTextInfo] = useState('');
  const [file, setFile] = useState(null);
  const [packageType, setpackageType] = useState('standard');
  const [gig, setGig] = useState(null);
  const [sellerAnalytics, setsellerAnalytics] = useState(null);
    const [buyerReviews, setbuyerReviews] = useState(null);
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
console.log("buyer review are: ", buyerReviews);
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
         console.log("mine rev",data.buyerReviews);
            setGig(data.gig);
            setsellerAnalytics(data.sellerAnalytics);
            setUser(data.user);
            setClients(data.clients);
            setbuyerReviews(data.buyerReviews);
            
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching gig:", err);
          setLoading(false);
        });
    }
  }, [gigIdParam]);
    const filteredReviews = useMemo(() => {
    return buyerReviews?.filter((review) =>
      review.review.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, buyerReviews]);

  // Calculate breakdown stats
  const ratingCounts = useMemo(() => {
    const counts = [0, 0, 0, 0, 0]; // Index 0 = 1 star, 4 = 5 stars
    buyerReviews?.forEach((r) => {
      const idx = Math.round(r.overallRating) - 1;
      counts[idx] += 1;
    });
    return counts;
  }, [buyerReviews]);

  const totalReviews = buyerReviews?.length;
  const averageRating =
    buyerReviews?.reduce((acc, r) => acc + r.overallRating, 0) / (totalReviews || 1);

  const getBarWidth = (count) => (totalReviews ? `${(count / totalReviews) * 100}%` : "0%");
if (loading) return (
  <div className="loading-container">
    <FaSpinner className="spinner" />
    <p className="loading-text">Loading gig details...</p>
  </div>
);
  if (!gig) return <p>No gig found</p>;
   const isWishlisted = userLoggedIn?.wishlist?.includes(gig?._id);
 
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

const communicationAvg = buyerReviews?.reduce((acc, r) => acc + r.communicationLevel, 0) / (totalReviews || 1);
const deliveryAvg = buyerReviews?.reduce((acc, r) => acc + r.serviceAsDescribed, 0) / (totalReviews || 1);
const valueAvg = buyerReviews?.reduce((acc, r) => acc + r.recommendToFriend, 0) / (totalReviews || 1);


const handleShareClick = (e) => {
  e.stopPropagation();
  if (!userLoggedIn?._id) return;
 if (!gig) return ;
  const url = `${window.location.origin}/services-details?gigId=${gig._id}&referrerId=${userLoggedIn._id}`;
  navigator.clipboard.writeText(url);
  toast.success('Link copied to clipboard!');
};


  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  return (
    <div className={styles.containerGigDetails}>
      <nav className={styles.breadcrumb}>
        <FaHome style={{ marginRight: "4px", color:'#000000' }} /> / <span>{gig.category}</span> / <span>{gig.subcategory}</span>
      </nav>

      <h1 className={styles.title}><CapitalizeFirstWord>{gig.gigTitle}</CapitalizeFirstWord></h1>

<div className={styles.spaceddivindetails}>
       <div className={styles.sellerInfo}>
      <Image
        src={gig.userId.profileUrl}
        alt="Seller Profile"
        width={60}
        height={60}
        className={styles.profileImage}
      />
      <div>
        <strong>
          <CapitalizeFirstWord>{gig.userId.firstName}</CapitalizeFirstWord>{' '}
          {gig.userId.lastName}
        </strong>
        <span className={styles.level}>{gig.userId?.sellerDetails?.level}</span>

        <div className={styles.rating}>
          {averageRating > 0 ? (
            <>
              {Array.from({ length: 5 }, (_, i) =>
                i < Math.round(averageRating) ? (
                  <FaStar key={i} style={{ color: '#2a3547', marginRight: '2px' }} />
                ) : (
                  <FaRegStar key={i} style={{ color: '#2a3547', marginRight: '2px' }} />
                )
              )}
              <span>
                {' '}
                ({totalReviews} review{totalReviews > 1 ? 's' : ''})
              </span>
            </>
          ) : (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <FaRegStar key={i} style={{ color: '#ccc', marginRight: '2px' }} />
              ))}
              <span> (No reviews yet)</span>
            </>
          )}
        </div>
      </div>
      {clients.length > 0 && (
    <>
    {/* <strong style={{ fontSize: '18px', marginBottom: '10px', display: 'block', paddingTop: '5px'}}>Among my Clients</strong> */}
  
  <div style={{borderRadius: '8px', padding: ' 10px 15px', marginTop: '20px', marginBottom: '20px', }}>
<div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', padding: '15px' }}>
  {clients.map((client) => (
    <div key={client._id} className={styles['client-container']}>
      <img
        src={client.profileUrl}
        alt={client.name}
        className={styles['client-image']}
      />
      <div className={styles['client-name']}>{client.name}</div>

      <div className={styles['client-popup']}>
        <img src={client.profileUrl} alt={client.name} />
        <div style={{ fontWeight: '600' }}>{client.name}</div>
        <div>{client.country}</div>
      </div>
    </div>
  ))}
</div>

  </div> </>
)}
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
            <h3><span>{gig.gigTitle}</span> | <span>{gig.userId?.sellerDetails?.completedOrdersCount === 0 ? (
  <span>No Projects Completed</span>
) : (
  <span>{gig.userId.sellerDetails.completedOrdersCount} Projects Completed</span>
)}</span>
</h3>
            <p className={styles.gigDesc}>{gig.gigDescription}</p>
     
     
     
     
     
     
     
            <h5 className={styles.sellerDetailsTitle}>Get to know {gig.userId.firstName} 
          {gig.userId.lastName}</h5>
   <div className={styles.colDiv}>          <div className={styles.sellerInfo}>
      <Image
        src={gig.userId.profileUrl}
        alt="Seller Profile"
        width={85}
        height={85}
        className={styles.profileImage}
      />
      <div>
        <strong style={{color:'#333'}}>
          <CapitalizeFirstWord>{gig.userId.firstName}</CapitalizeFirstWord>{' '}
          {gig.userId.lastName}
        </strong>
        <span className={styles.level}>{gig.userId?.sellerDetails?.level}</span>
<h1 className={styles.specialty}>{gig.userId?.sellerDetails?.speciality}</h1>
        <div className={styles.rating}>
          {averageRating > 0 ? (
            <>
              {Array.from({ length: 5 }, (_, i) =>
                i < Math.round(averageRating) ? (
                  <FaStar key={i} style={{ color: '#2a3547', marginRight: '2px' }} />
                ) : (
                  <FaRegStar key={i} style={{ color: '#2a3547', marginRight: '2px' }} />
                )
              )}
              <span>
                {' '}
                ({totalReviews} review{totalReviews > 1 ? 's' : ''})
              </span>
            </>
          ) : (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <FaRegStar key={i} style={{ color: '#ccc', marginRight: '2px' }} />
              ))}
              <span> (No reviews yet)</span>
            </>
          )}
        </div>
      </div>

    </div>
    <Link href={`/messages?receiverId=${gig.userId._id}`} className={styles.contactme}>Contact me</Link>

    </div>
    
    
            <AboutSec seller={gig.userId} sellerAnalytics={sellerAnalytics} />

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
    style={{cursor:'pointer'}}
  >
    {pkgName.charAt(0).toUpperCase() + pkgName.slice(1)}
  </span>
))}

        </div>

        <div className={styles.packageCardPadded}>
          <div className={styles.flexedDivDetailsGig}>
            <h3>Package includes</h3>
            <div className={styles.price}>${pkg.price}</div>
          </div>
          <p className={styles.subscription}><span className={styles.subscribeLink}>{pkg.packageName}</span></p>
          <p className={styles.descPackageRight}>{pkg.description}</p>

       <div className={styles.meta}>
      <span style={{marginRight:'20px'}} className={styles.metaDescPackage}>
        <FaClock style={{ marginRight: '6px' }} />
        {pkg.deliveryTime} Day{pkg.deliveryTime > 1 ? 's' : ''} Delivery
      </span>
      <span className={styles.metaDescPackage}>
        <FaSyncAlt style={{ marginRight: '6px' }} />
        {pkg.revisions === -1 ? 'Unlimited' : `${pkg.revisions} Revisions`}
      </span>
    </div>

          <div className={styles.included}><span>Included in package</span><span>▾</span></div>
<div className={styles.includedList}>
  {Object.entries(pkg)
    .filter(([key]) => key !== 'description') // exclude only 'description'
    .slice(0, 7) // limit to first 7 items
    .map(([key, value], index) => (
      <div key={index} className={styles.includedItem}>
        <FaCheck style={{ color: 'black', marginRight: '8px' }} />
        <span style={{ textTransform: 'capitalize' }}>
          {key.replace(/([A-Z])/g, ' $1')} {typeof value === 'boolean' ? '' : `- ${value}`}
        </span>
      </div>
    ))}
</div>
          <button className={styles.continueBtn} onClick={() => setShowPopup(true)}>
            Purchase →
          </button>

          <Link href={`/messages?receiverId=${gig.userId._id}`}>
            <button className={styles.contactBtn}>Contact Seller</button>
          </Link>
        </div>
      </div>
    </div>
      
      {showPopup && (
  <div className={styles.popupOverlay}>
    <div className={styles.popupContent}>
    <button
        className={styles.closeButton}
        onClick={() => setShowPopup(false)}
        aria-label="Close popup"
      >
        <RxCross2 size={22} />
      </button>
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
          Pay with balance (${buyer?.wallet?.balance})
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

 <section className={styles.faqSectionGigDetails}>
      <h2 className={styles.faqTitle}>FAQ</h2>

      {gig.faqs && gig.faqs.length > 0 ? (
        gig.faqs.map((faq, index) => (
          <div key={faq._id} className={styles.faqItem}>
  <div className={styles.faqHeader} onClick={() => toggleFAQ(index)}>
    <span className={styles.questionText}>
      <strong>Q:</strong> {faq.question}
    </span>
    <FaChevronDown
      className={`${styles.faqArrow} ${openIndex === index ? styles.open : ''}`}
    />
  </div>

  {/* ✅ Always render .faqBody, just toggle class */}
  <div className={`${styles.faqBody} ${openIndex === index ? styles.open : ''}`}>
    <p>{faq.answer}</p>
  </div>
</div>

        ))
      ) : (
        <p className={styles.noFaqMsg}>No FAQs available for this gig.</p>
      )}
    </section>

   <section className={styles.reviewsSection}>
      <h2>Reviews</h2>

      <div className={styles.reviewSummary}>
        <div className={styles.leftStats}>
          <p><strong>{totalReviews} reviews for this Gig</strong></p>

        <div className={styles.ratingRow}>
  <span className={styles.fixedWidth}>Seller communication level</span>
  <div className={styles.bar}>
    <div
      className={styles.filled}
      style={{ width: `${(communicationAvg / 5) * 100}%` }}
    ></div>
  </div>
  <span>★{communicationAvg.toFixed(1)}</span>
</div>
<div className={styles.ratingRow}>
  <span className={styles.fixedWidth}>Quality of delivery</span>
  <div className={styles.bar}>
    <div
      className={styles.filled}
      style={{ width: `${(deliveryAvg / 5) * 100}%` }}
    ></div>
  </div>
  <span>★ {deliveryAvg.toFixed(1)}</span>
</div>
<div className={styles.ratingRow}>
  <span className={styles.fixedWidth}>Value of delivery</span>
  <div className={styles.bar}>
    <div
      className={styles.filled}
      style={{ width: `${(valueAvg / 5) * 100}%` }}
    ></div>
  </div>
  <span>★ {valueAvg.toFixed(1)}</span>
</div>

        </div>

        <div className={styles.rightStats}>
          <div className={styles.totalStars}>
            <span>{"★".repeat(Math.round(averageRating))}</span>
            <strong>{averageRating.toFixed(1)}</strong>
          </div>

         
        </div>
      </div>

      <div className={styles.reviewFilters}>
        <input
          type="text"
          placeholder="Search reviews"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      <button type="button" className="search-btn">
  <FiSearch size={18} />
</button>
        <select>
          <option>Most relevant</option>
        </select>
      </div>

      {filteredReviews.map((review, index) => (
        <div key={index} className={styles.reviewCard}>
          <div className={styles.userInfo}>
            <img src={review.reviewedByBuyer.profileUrl} alt="avatar" />
            <div>
              <strong>
                {review.reviewedByBuyer.firstName} {review.reviewedByBuyer.lastName}
              </strong>
              <div className={styles.location}>{review.reviewedByBuyer.country}</div>
            </div>
          </div>
          <div className={styles.stars}>
            {"★".repeat(Math.round(review.overallRating))}{" "}
           <span>{review.overallRating.toFixed(1)}</span> •{" "}
<span>
  {new Date(review.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  })}
</span>

          </div>
          <p>{review.review}</p>
        </div>
      ))}
    </section>





    </div>
  );
};

export default GigDetails;
