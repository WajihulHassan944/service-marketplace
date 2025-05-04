'use client';

import Image from 'next/image';
import { useRef } from 'react';
import './Card.css';

import { IoChevronBack, IoChevronForward } from "react-icons/io5";
const people = [
  {
    name: 'Emily Dubow',
    title: 'UX/UI Designer',
    expertIn: 'Design',
    role: 'Verified Expert',
    prevCompany: 'Samsung',
    image: '/assets/users/one.png',
    companyLogo: '/samsung.png',
  },
  {
    name: 'Anna D. Lukasiak',
    title: 'Project Manager',
    expertIn: 'Project Management',
    role: 'Verified Expert',
    prevCompany: 'Goldman Sachs',
    image: '/assets/users/two.png',
    companyLogo: '/goldman.png',
  },
  {
    name: 'Anna D. Lukasiak',
    title: 'Project Manager',
    expertIn: 'Project Management',
    role: 'Verified Expert',
    prevCompany: 'Goldman Sachs',
    image: '/assets/users/three.png',
    companyLogo: '/goldman.png',
  },
  {
    name: 'Anna D. Lukasiak',
    title: 'Project Manager',
    expertIn: 'Project Management',
    role: 'Verified Expert',
    prevCompany: 'Goldman Sachs',
    image: '/assets/users/four.png',
    companyLogo: '/goldman.png',
  },
  {
    name: 'Anna D. Lukasiak',
    title: 'Project Manager',
    expertIn: 'Project Management',
    role: 'Verified Expert',
    prevCompany: 'Goldman Sachs',
    image: '/assets/users/five.png',
    companyLogo: '/goldman.png',
  },
  {
    name: 'Anna D. Lukasiak',
    title: 'Project Manager',
    expertIn: 'Project Management',
    role: 'Verified Expert',
    prevCompany: 'Goldman Sachs',
    image: '/assets/users/one.png',
    companyLogo: '/goldman.png',
  },
];

export default function CardCarousel() {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
   
    <div className="carousel-container">
      <button className="arrowleft" onClick={scrollLeft}>
      <IoChevronBack />
      </button>

      <div className="carousel" ref={carouselRef}>
        {people.map((person, idx) => (
          <div key={idx} className="card">
            <div className="image-container">
              <Image
                src={person.image}
                alt={person.name}
                width={150}
                height={150}
                className="profile-image"
              />
            </div>
            <div className="details">
              <h3>{person.name}</h3>
              <p className="role">
                <span className="verified">✔ Verified Expert</span> in {person.expertIn}
              </p>
              <p className="title">{person.title}</p>
            
            </div>
          </div>
        ))}
      </div>

      <button className="arrowright" onClick={scrollRight}>
      <IoChevronForward />
      </button>
    </div>
  
  );
}
