import "./Styles.css";
export default function Gigs() {
    const gigs = [
      {
        title: "I will be full stack web developer mern stack overstack",
        price: "PKR 4,387",
        image: "/assets/gigs/dummy.png",
      },
      {
        title: "I will be full stack web developer mern stack overstack",
        price: "PKR 4,387",
        image: "/assets/gigs/dummytwo.png",
      },
      {
        title: "I will be full stack web developer mern stack overstack",
        price: "PKR 4,387",
        image: "/assets/gigs/dummy.png",
      },
      {
        title: "I will be full stack web developer mern stack overstack",
        price: "PKR 4,387",
        image: "/assets/gigs/dummy.png",
      },
      
   
    ];
  
    return (
      <div className="gigs-container">
        <h3>My Gigs</h3>
        <div className="gigs-grid">
          {gigs.map((gig, idx) => (
            <div className="gig-card" key={idx}>
              <img src={gig.image} alt={gig.title} />
              <h4>{gig.title}</h4>
              <p>{gig.price}</p>
            </div>
          ))}
        </div>
        <button className="view-gig">View all (8)</button>
      </div>
    );
  }