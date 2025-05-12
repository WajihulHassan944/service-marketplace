import React from 'react'
import "./Home.css";
import Brands from './Brands';
import UpworkPromo from './UpworkPromo';
import TalentPromo from './TalentPromo';
import GigCard from '../Gigs/GigCard';
import HeroSection from './HeroSection';
import PopularServices from './PopularServices/PopularServices';
import CardCarousel from './CardCarousel/CardCarousel';
import FindTalent from './Talent/FindTalent';
import EnterpriseSuite from './Enterprise/EnterpriseSuite';
const MainHome = () => {
  return (
    <div>
    <HeroSection />
      <Brands />
      <CardCarousel />
   {/*    <UpworkPromo /> */}
    
<PopularServices />
      <div className='home-services-cards'>
        <h1 className="popular-title">Popular Services</h1>
        <div className='popular-services-homeoage-wrap'>
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


             <GigCard
           data={{
             image: '/assets/gigs/dummythree.png',
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
             image: '/assets/gigs/dummyfour.png',
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
    {/*   <TalentPromo />
      <FindTalent />
      <EnterpriseSuite /> */}
    </div>
  )
}

export default MainHome
