import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Globe } from "lucide-react";
import "./SellerClients.css";

const HoverCard = ({ client, position }) => {
  if (!client || !position) return null;

  return createPortal(
    <div
      className="sellerClients-hoverCard"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div className="hoverCard-header">
        <img
          src={client.profileUrl}
          alt={client.name}
          className="hoverCard-logo"
        />
      </div>
      <span className="hoverCard-name">About my work with {client.name}</span>

      <div className="hoverCard-meta">
        <Globe size={14} className="hoverCard-icon" />
        <span>{client.country}</span>
      </div>
      <p className="hoverCard-desc">{client.description}</p>
      <p className="hoverCard-date">
        {client.workMonth} {client.workYear}
      </p>
    </div>,
    document.body
  );
};

const SellerClients = ({ clients = [] }) => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const [hoveredClient, setHoveredClient] = useState(null);
  const [hoverPos, setHoverPos] = useState(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const checkArrows = () => {
        setShowLeft(el.scrollLeft > 0);
        setShowRight(el.scrollWidth > el.clientWidth + el.scrollLeft);
      };
      checkArrows();
      el.addEventListener("scroll", checkArrows);
      window.addEventListener("resize", checkArrows);
      return () => {
        el.removeEventListener("scroll", checkArrows);
        window.removeEventListener("resize", checkArrows);
      };
    }
  }, []);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.firstChild?.offsetWidth || 250;
      const visibleCount = 2;
      scrollRef.current.scrollBy({
        left:
          dir === "left"
            ? -(itemWidth * visibleCount)
            : itemWidth * visibleCount,
        behavior: "smooth",
      });
    }
  };

  const handleMouseEnter = (client, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredClient(client);
    setHoverPos({
      top: rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX,
    });
  };

  const handleMouseLeave = () => {
    setHoveredClient(null);
    setHoverPos(null);
  };

  if (!clients.length) return null;

  return (
    <div className="sellerClients">
      <div className="sellerClients-repeatBox">
        <div className="repeat-icon">
          <img src="/assets/trophy.png" alt="trophy" />
        </div>
        <h2>People keep coming back!</h2>
        <h3>This seller has many repeat buyers.</h3>
      </div>

      <div className="sellerClients-sliderWrapper">
        {showLeft && (
          <button
            className="sellerClients-arrow left"
            onClick={() => scroll("left")}
          >
            <ChevronLeft size={17} />
          </button>
        )}

        <h3 className="sellerClients-title">Among my clients</h3>

        <div className="sellerClients-slider" ref={scrollRef}>
          {clients.map((client) => (
            <div
              className="sellerClients-item"
              key={client._id}
              onMouseEnter={(e) => handleMouseEnter(client, e)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={client.profileUrl}
                alt={client.name}
                className="sellerClients-logo"
              />
              <span className="sellerClients-name">{client.name}</span>
            </div>
          ))}
        </div>

        {showRight && (
          <button
            className="sellerClients-arrow right"
            onClick={() => scroll("right")}
          >
            <ChevronRight size={17} />
          </button>
        )}
      </div>

      {/* Portal Hover Card */}
      <HoverCard client={hoveredClient} position={hoverPos} />
    </div>
  );
};

export default SellerClients;
