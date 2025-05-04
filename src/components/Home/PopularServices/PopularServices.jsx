"use client";

import Image from "next/image";
import "./PopularServices.css";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useRef, useState, useLayoutEffect } from "react";

const services = [
  { title: "Website Development", image: "/assets/categories/website-development.png" },
  { title: "Video Editing", image: "/assets/categories/video-editing.png" },
  { title: "Software Development", image: "/assets/categories/software-development.png" },
  { title: "SEO", image: "/assets/categories/seo.png" },
  { title: "App Development", image: "/assets/categories/architecture-design.png" }
];

export default function PopularServices() {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const updateArrowVisibility = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const scrollRight = () => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = window.innerWidth < 600 ? 150 : 300;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollLeft = () => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = window.innerWidth < 600 ? 150 : 300;
    el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScrollOrResize = () => updateArrowVisibility();

    updateArrowVisibility(); // Ensure buttons render correctly on initial load

    el.addEventListener("scroll", handleScrollOrResize);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      el.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, []);

  return (
    <div className="popular-container">
      <h2 className="popular-title">Popular Categories</h2>
      <div className="popular-wrapper">
        <div className="popular-scroll-container">
          <div className="popular-scroll" ref={scrollRef}>
            {services.map((service, index) => (
              <div className="service-card" key={index}>
                <div className="card-top">
                  <h3>{service.title}</h3>
                </div>
                <div className="card-bottom">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={100}
                    height={100}
                    className="service-image"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {showLeft && (
          <button
            className="arrow-button-unique left"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <IoChevronBack />
          </button>
        )}

        {showRight && (
          <button
            className="arrow-button-unique right"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <IoChevronForward />
          </button>
        )}
      </div>
    </div>
  );
}
