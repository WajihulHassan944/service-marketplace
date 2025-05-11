'use client';
import React from 'react';
import Image from 'next/image';

const Brands = () => {
  return (
    <section className="brands-section">
      <p className="brands-heading">TRUSTED BY LEADING BRANDS AND STARTUPS</p>
      <div className="brands-scroll-wrapper">
        <div className="brands-logos">
          <Image src="/assets/brands/kraft.png" alt="Kraft Heinz" width={120} height={50} />
          <div className="brand-with-link">
            <Image src="/assets/brands/motorola.png" alt="Bridgestone" width={120} height={50} />
            <a href="#">WATCH THE CASE STUDY</a>
          </div>
          <Image src="/assets/brands/doulingo.png" alt="Duolingo" width={120} height={50} />
          <Image src="/assets/brands/shopify.png" alt="Shopify" width={120} height={50} />
          <Image src="/assets/brands/calm.png" alt="Calm" width={120} height={50} />
          <div className="brand-with-link">
            <Image src="/assets/brands/zendesk.png" alt="USC" width={120} height={50} />
            <a href="#">WATCH THE CASE STUDY</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
