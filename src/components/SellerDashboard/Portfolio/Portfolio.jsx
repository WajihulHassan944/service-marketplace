'use client';
import Image from "next/image";
import Head from "next/head";
import "./Portfolio.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { baseUrl } from "@/const";
export default function Portfolio() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const name = searchParams.get("name") || "User";
 
  const [portfolios, setPortfolios] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (userId) {
      fetch(`${baseUrl}/portfolio/user/${userId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) setPortfolios(data.portfolios);
        });
    }
  }, [userId]);

  const filtered = portfolios.filter(p => {
    if (filter === "All") return true;
    if (filter === "Images" && p.previewType === "image") return true;
    if (filter === "Websites" && p.previewType === "link") return true;
    return false;
  });

  return (
    <>
      <Head>
        <title>Top Designers</title>
      </Head>

      <main className="container-portfolio-seller-page">
        <h1 className="main-title">Discover {name}'s Portfolio</h1>
        <p className="subtitle">
          Explore work from the most recent and accomplished achievements of mine to take on your next project
        </p>

        <div className="filter-bar">
          {["All", "Images", "Websites"].map(btn => (
            <button
              key={btn}
              className={filter === btn ? "active" : ""}
              onClick={() => setFilter(btn)}
            >
              {btn}
            </button>
          ))}
          <button className="popular-btn">
            <FontAwesomeIcon icon={faFilter} style={{ width: '12px', height: '12px', marginRight: '8px' }} />
            Filters
          </button>
        </div>

        <div className="card-row-seller-portfolio">
          {filtered.map((card, index) => (
            <div className="card" key={index}>
              {card.previewType === "image" ? (
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  width={300}
                  height={200}
                  className="card-img"
                />
              ) : (
                <>
                  <iframe
                    src={card.websiteLink}
                    title={card.title}
                    className="portfolio-iframe"
                    style={{
                      width: "300px",
                      height: "200px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                    }}
                  />
                   </>
              )}
              <div className="card-details">
                 {card.previewType === "link" ?  <span
                   >
                    {card.title}
                  </span> : 
                <span>{card.title}</span> }
                <span
                  style={{ color: "#0070f3", cursor: "pointer" }}
                  onClick={() => setSelectedItem(card)}
                >
                  Description
                </span>
              </div>
            
            </div>
          ))}
        </div>

        {selectedItem && (
          <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>{selectedItem.title}</h2>
              <p>{selectedItem.description}</p>
              <button className="close-btn" onClick={() => setSelectedItem(null)}>Close</button>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }
        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 0 15px rgba(0,0,0,0.3);
          text-align: center;
        }
        .close-btn {
          margin-top: 1rem;
          background: #0070f3;
          color: white;
          border: none;
          padding: 0.5rem 1.2rem;
          border-radius: 6px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
