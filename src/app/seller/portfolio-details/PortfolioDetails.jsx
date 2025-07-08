'use client';

import React, { useEffect, useState } from 'react';
import './portfolioDetails.css';
import Sidebar from '@/components/BuyerDashboard/Settings/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { baseUrl } from '@/const';

const PortfolioDetails = () => {
  const user = useSelector((state) => state.user);
  const searchParams = useSearchParams();
  const portfolioId = searchParams.get('portfolioId');

  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    if (portfolioId) {
      fetch(`${baseUrl}/portfolio/single/${portfolioId}`)
        .then((res) => res.json())
        .then((data) => {
          setPortfolio(data.portfolio);
        })
        .catch((err) => console.error('Failed to fetch portfolio details', err));
    }
  }, [portfolioId]);

  if (!portfolio) {
    return (
      <div className="portfolio-details-container">
        <Sidebar />
        <div className="portfolio-details-loading">Loading portfolio details...</div>
      </div>
    );
  }

  return (
    <div className="portfolio-details-container">
      <Sidebar />
      <div className="portfolio-details-content">
        <h2 className="portfolio-details-title">{portfolio.title}</h2>
        <div className="portfolio-preview-box">
          {portfolio.previewType === 'image' ? (
            <img
              src={portfolio.imageUrl}
              alt={portfolio.title}
              className="portfolio-preview-image"
            />
          ) : (
            <iframe
              src={portfolio.websiteLink}
              title={portfolio.title}
              className="portfolio-preview-iframe"
             sandbox="allow-scripts allow-same-origin allow-popups"
            />
          )}
        </div>
        <p className="portfolio-description">{portfolio.description}</p>
      </div>
    </div>
  );
};

export default PortfolioDetails;
