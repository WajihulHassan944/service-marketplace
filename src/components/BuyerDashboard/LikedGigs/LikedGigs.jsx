import React from 'react'
import "./LikedGigs.css";
import GigCard from '@/components/Gigs/GigCard';
const LikedGigs = () => {
  return (
    <div className='liked-services-container'>
    <h1 className='liked-head'>Liked Services</h1>
      <div className='results-liked'>
        <span>2 results</span>
      </div>

        <div className='liked-services-wrap'>
            <GigCard
  data={{
    image: '/assets/gigs/dummytwo.png',
    avatar: '/assets/gigs/avatar.png',
    sellerName: 'Jane Doe',
    badge: 'Top Rated',
    title: 'I will convert figma to react nextjs with responsive tailwind CSS',
    rating: 4.8,
    reviews: 20,
    price: 'PKR 25,000',
    offersVideo: true,
  }}
/>

              <GigCard
  data={{
    image: '/assets/gigs/dummy.png',
    avatar: '/assets/gigs/avatar.png',
    sellerName: 'Jane Doe',
    badge: 'Top Rated',
    title: 'I will convert figma to react nextjs with responsive tailwind CSS',
    rating: 4.8,
    reviews: 20,
    price: 'PKR 25,000',
    offersVideo: true,
  }}
/>
  
        
        </div>   
    </div>
  )
}

export default LikedGigs
