// pages/index.js
import Header from "./Header";
import About from "./About";
import Skills from "./Skills";
import Gigs from "./Gigs";
import Portfolio from "./Portfolio";
import Reviews from "./Reviews";

import "./Styles.css";
import ContactCard from "./ContactCard";

export default function Profile() {
  return (
    <div className="main-container">
      <div className="left-content">
        <div className="header-sec">
        <Header />
        <ContactCard/>
        </div>
        <About />
        
        <Skills />
        <Gigs />
        <Portfolio />
        <Reviews />
      </div>

    </div>
  );
}