// pages/index.js seller's
import Header from "./Header";
import About from "./About";
import Skills from "./Skills";
import Gigs from "./Gigs";
import Portfolio from "./Portfolio";
import Reviews from "./Reviews";

import "./Styles.css";
import ContactCard from "./ContactCard";

export default function Profile({ sellerData }) {
  
  return (
   <div className="main-container">
      <div className="left-content">
        <div className="header-sec">
          <Header seller={sellerData.user} />
          <ContactCard seller={sellerData.user} />
        </div>
        <About description={sellerData.user.sellerDetails.description} />
        <Skills skills={sellerData.user.sellerDetails.skills} />
        <Gigs gigs={sellerData.gigs} />
        <Portfolio portfolios={sellerData.portfolios} id={sellerData.user._id} name={sellerData.user.firstName} />
        <Reviews sellerReviews={sellerData.sellerReviews} />
      </div>
    </div>
  );
}