'use client';

import Image from 'next/image';
import './PopularServices.css';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '@/redux/features/categorySlice';
import { useRouter } from 'next/navigation';

export default function PopularServices() {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const { categories, status } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

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
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const scrollLeft = () => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = window.innerWidth < 600 ? 150 : 300;
    el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScrollOrResize = () => updateArrowVisibility();

    updateArrowVisibility();

    el.addEventListener('scroll', handleScrollOrResize);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      el.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, []);

  const handleClick = (categoryName) => {
    router.push(`/services?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="popular-container">
      <h2 className="popular-title">Popular Categories</h2>
      <div className="popular-wrapper">
        <div className="popular-scroll-container">
          <div className="popular-scroll" ref={scrollRef}>
            {categories.map((category) => (
              <div
                className="service-card"
                key={category._id}
                onClick={() => handleClick(category.name)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-top">
                  <h3>{category.name}</h3>
                </div>
                <div className="card-bottom">
                  <Image
                    src={category.image}
                    alt={category.name}
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
