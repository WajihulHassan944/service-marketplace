'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { baseUrl } from '@/const';
import './MyPortfolio.css';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Sidebar from '../Sidebar/Sidebar';

const Myportfolio = () => {
  const user = useSelector((state) => state.user);
  const router = useRouter();

  const [portfolios, setPortfolios] = useState([]);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);

  const dropdownRefs = useRef({});

  useEffect(() => {
    if (user?._id) {
      fetch(`${baseUrl}/portfolio/user/${user._id}`)
        .then((res) => res.json())
        .then((data) => {
          setPortfolios(data.portfolios || []);
        })
        .catch((err) => console.error("Failed to load portfolios", err));
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this portfolio?')) return;

    try {
      const res = await fetch(`${baseUrl}/portfolio/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setPortfolios((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert("Failed to delete portfolio");
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const handleEdit = (id) => {
    router.push(`/seller/create-portfolio?portfolioId=${id}`);
  };

  const handleDetails = (id) => {
    router.push(`/seller/portfolio-details?portfolioId=${id}`);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const allRefs = Object.values(dropdownRefs.current);
      const isClickInsideAny = allRefs.some(ref => ref?.contains(e.target));
      if (!isClickInsideAny) setDropdownOpenId(null);
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const renderCard = (item) => (
    <div key={item._id} className="portfolio-card">
      <div
        className="card-dropdown-wrapper"
        ref={(el) => (dropdownRefs.current[item._id] = el)}
      >
        <BsThreeDotsVertical
          className="card-dropdown-icon"
          onClick={(e) => {
            e.stopPropagation();
            setDropdownOpenId(dropdownOpenId === item._id ? null : item._id);
          }}
        />
        {dropdownOpenId === item._id && (
          <div className="card-dropdown-menu">
            <div onClick={() => handleEdit(item._id)}>Edit</div>
            <div onClick={() => handleDelete(item._id)}>Delete</div>
          </div>
        )}
      </div>

      <div onClick={() => handleDetails(item._id)}>
        {item.previewType === 'image' ? (
          <img src={item.imageUrl} alt={item.title} />
        ) : (
          <iframe
            src={item.websiteLink}
            title={item.title}
            className="portfolio-iframe"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        )}
        <div className="card-info">
          <h4>{item.title}</h4>
          <p>{item.description.length > 100 ? item.description.slice(0, 100) + '...' : item.description}</p>

        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="my-portfolio-container">
      <Sidebar />
   <div className='portfolios-wrapper'>
      <div className="portfolio-section">
        <h3 className="portfolio-heading">My Portfolios</h3>
        <div className="portfolio-cards">
          {portfolios
            .filter((p) => p.previewType === 'image')
            .map(renderCard)}
        </div>
      </div>

      <div className="portfolio-section">
        <h3 className="portfolio-heading">Websites</h3>
        <div className="portfolio-cards">
          {portfolios
            .filter((p) => p.previewType === 'link')
            .map(renderCard)}
        </div>
      </div> </div></div>
    </>
  );
};

export default Myportfolio;
