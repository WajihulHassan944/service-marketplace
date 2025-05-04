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
      <UpworkPromo />
    
<PopularServices />
      <div className='home-services-cards'>
        <h1 className="popular-title">Popular Services</h1>
        <GigCard />
      </div>
      <TalentPromo />
      <FindTalent />
      <EnterpriseSuite />
    </div>
  )
}

export default MainHome
