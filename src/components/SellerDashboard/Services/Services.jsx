'use client';
import React, { useEffect, useState } from 'react';
import './Services.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { baseUrl } from '@/const';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import '@/components/BuyerDashboard/Messages/ZoomPopup/ZoomPopup.css';

const statusMap = {
  ACTIVE: 'active',
  'PENDING APPROVAL': 'pending',
  'REQUIRES MODIFICATON': 'requiresmodification',
  DENIED: 'rejected',
  DRAFT: 'draft',
  PAUSED: 'pause',
};

const Services = () => {
  const user = useSelector((state) => state.user);
  const userId = user?._id;
  const router = useRouter();

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [gigToDelete, setGigToDelete] = useState(null);
  const [apiGigs, setApiGigs] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('ACTIVE');
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-wrapper")) {
        setOpenDropdownIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    if (!userId) {
      return;
    }
    const fetchGigs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/gigs/all/${userId}`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          console.warn(data.message);
          setApiGigs([]); // still allow rendering
        } else {
          setApiGigs(data.gigs);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setApiGigs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, [userId]);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prev) => (prev === index ? null : index));
  };

  const filteredGigs = apiGigs.filter(
    (gig) => gig.status === statusMap[selectedTab]
  );

  const handleDeleteGig = async () => {
  if (!gigToDelete) return;
  setIsDeleting(true);

  try {
    const res = await fetch(`${baseUrl}/gigs/delete/${gigToDelete}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setApiGigs((prev) => prev.filter((gig) => gig._id !== gigToDelete));
      setOpenDropdownIndex(null);
      toast.success("Service has been deleted successfully.");
    } else {
      toast.error(data.message || "Failed to delete gig.");
    }
  } catch (err) {
    console.error("Delete error:", err);
    toast.error("An error occurred while deleting the gig.");
  } finally {
    setIsDeleting(false);
    setShowDeleteModal(false);
    setGigToDelete(null);
  }
};




const handlePauseGig = async (gigId) => {
  try {
    const res = await fetch(`${baseUrl}/gigs/pause/${gigId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    if (res.ok && data.success) {
      setApiGigs((prev) =>
        prev.map((gig) =>
          gig._id === gigId ? { ...gig, status: 'pause' } : gig
        )
      );
       setOpenDropdownIndex(null);
      toast.success('Gig has been paused successfully.');
    } else {
      toast.error(data.message || 'Failed to pause gig.');
    }
  } catch (err) {
    console.error('Pause error:', err);
    toast.error('An error occurred while pausing the gig.');
  }
};

const handleUnpauseGig = async (gigId) => {
  try {
    const res = await fetch(`${baseUrl}/gigs/unpause/${gigId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    if (res.ok && data.success) {
      setApiGigs((prev) =>
        prev.map((gig) =>
          gig._id === gigId ? { ...gig, status: 'active' } : gig
        )
      );
       setOpenDropdownIndex(null);
      toast.success('Gig has been unpaused successfully.');
    } else {
      toast.error(data.message || 'Failed to unpause gig.');
    }
  } catch (err) {
    console.error('Unpause error:', err);
    toast.error('An error occurred while unpausing the gig.');
  }
};


  return (
    <div className="services-container">
      <div className="services-header">
        <h1>Services</h1>
        <div className="custom-orders-toggle">
          <span>Accepting Custom Orders</span>
          <div className="toggle-switch active"></div>
        </div>
        <Link href="/seller/create-gig">
          <button className="create-gig-btn">CREATE A NEW GIG</button>
        </Link>
      </div>
<div className="tabs">
  {Object.keys(statusMap).map((tab) => {
    const count = apiGigs.filter((g) => g.status === statusMap[tab]).length;

    return (
      <span
        key={tab}
        className={`tab ${selectedTab === tab ? 'active' : ''}`}
        onClick={() => {
          setSelectedTab(tab);
          setOpenDropdownIndex(null); // ✅ close dropdown when switching tabs
        }}
      >
        {tab}
        {count > 0 && <span className="badge">{count}</span>}
      </span>
    );
  })}
</div>


      <div className="gigs-panel">
        <div className="panel-header">
          <span>{selectedTab} GIGS</span>
          <select className="date-filter">
            <option>LAST 30 DAYS</option>
          </select>
        </div>

        <div className="gigs-table">
          <div className="gigs-table-header">
            <input type="checkbox" />
            <span className="col-gig">GIG</span>
            <span className="col">IMPRESSIONS</span>
            <span className="col">CLICKS</span>
            <span className="col">ORDERS</span>
            <span className="col">CANCELLATIONS</span>
            <span></span>
          </div>

          {!loading && filteredGigs.length === 0 ? (
            <div className="no-gigs-message">No gigs posted yet in this category.</div>
          ) : (
            filteredGigs.map((gig, index) => {
              const title = gig.gigTitle || 'Untitled Gig';
              const imageUrl = gig.images?.[0]?.url || '/assets/gigs/dummy.png';
              const stats = gig.stats || {
                impressions: 0,
                clicks: 0,
                orders: 0,
                cancellations: '0%',
              };
const lastModificationRequest =
  gig.status === "requiresmodification" && gig.modificationRequests?.length > 0
    ? gig.modificationRequests[gig.modificationRequests.length - 1]
    : null;

              return (
                <>
                <div className="gigs-row" key={gig._id || index}>
                  <input type="checkbox" />
                  <div className="col-gig" onClick={() => router.push(`/services-details?gigId=${gig._id}&seller=true`)} style={{cursor:'pointer'}}>
                    <Image
                      src={imageUrl}
                      width={40}
                      height={35}
                      alt={title}
                      style={{ objectFit: 'contain' }}
                    />
                    <div>
                      <p className="gig-title">{title}</p>
                    </div>
                  </div>
                  <span className="col">{stats.impressions}</span>
                  <span className="col">{stats.clicks}</span>
                  <span className="col">{stats.orders}</span>
                  <span className="col">{stats.cancellations}</span>
                  <div className="dropdown-wrapper">
                    <button
                      className="dropdown-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(index);
                      }}
                    >
                      ▼
                    </button>
                    {openDropdownIndex === index && (
                      <div className="dropdown-menu">
                     <button onClick={() => router.push(`/seller/create-gig?gigId=${gig._id}&edit=true`)}>Update</button>
{gig.status === 'active' && (
      <button onClick={() => handlePauseGig(gig._id)}>Pause</button>
    )}
     {gig.status === "pause" && (
      <button onClick={() => handleUnpauseGig(gig._id)}>Unpause</button>
    )}
          <button
  onClick={() => {
    setGigToDelete(gig._id);
    setShowDeleteModal(true);
  }}
>
  Delete
</button>

                      </div>
                    )}
                    
                  </div>
          
                </div>
       {gig.status === "requiresmodification" &&
  gig.modificationRequests?.length > 0 && (
    <div className="modification-message">
      <strong>Requires Modification:</strong>
      <ul>
        {gig.modificationRequests.map((req) => (
          <li key={req._id}>
            <strong>{req.field} :</strong> {req.reason}
          </li>
        ))}
      </ul>
    </div>
)}

      </>      
              );
          
            })
          )}
        </div>
      </div>



      {showDeleteModal && (
  <div className="zoom-popup-overlay">
    <div className="zoom-popup">
      <div className="zoom-popup-header">
        <h2>Confirm Deletion</h2>
        <span
          className="close-icon"
          onClick={() => setShowDeleteModal(false)}
        >
          ✕
        </span>
      </div>
      <div className="zoom-popup-content">
        <p className="popup-subtext">
          Are you sure you want to delete this service? This action cannot be
          undone.
        </p>
        <div className="zoom-popup-actions">
          <button
            className="cancel-btn"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
        <button
  className="submit-btn"
  onClick={handleDeleteGig}
  disabled={isDeleting} // disable while deleting
>
  {isDeleting ? (
    <div className="auth-spinner" style={{ width: "20px", height: "20px", borderWidth: "3px" }}></div>
  ) : (
    "Confirm"
  )}
</button>

        </div>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default Services;
