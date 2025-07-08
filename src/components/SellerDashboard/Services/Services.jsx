'use client';
import React, { useEffect, useState } from 'react';
import './Services.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { baseUrl } from '@/const';
import { useSelector } from 'react-redux';

const statusMap = {
  ACTIVE: 'active',
  'PENDING APPROVAL': 'pending',
  DENIED: 'rejected',
  'REQUIRES MODIFICATION': 'modification',
  DRAFT: 'draft',
  PAUSED: 'paused',
};

const Services = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const userId = user?._id;
  const router = useRouter();

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [apiGigs, setApiGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('ACTIVE');

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

  const handleDeleteGig = async (gigId) => {
  try {
    const res = await fetch(`${baseUrl}/gigs/delete/${gigId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    if (res.ok && data.success) {
      setApiGigs((prev) => prev.filter((gig) => gig._id !== gigId));
    } else {
      alert(data.message || 'Failed to delete gig.');
    }
  } catch (err) {
    console.error('Delete error:', err);
    alert('An error occurred while deleting the gig.');
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
        onClick={() => setSelectedTab(tab)}
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
            <span className="col">PLANS</span>
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

              return (
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
                  <span className="col plan-action">+ Add Subscription</span>
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
                     <button onClick={() => handleDeleteGig(gig._id)}>Delete</button>

                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
