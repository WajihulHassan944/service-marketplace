import Link from "next/link";
import "./Styles.css";

const portfolioItems = [
  {
    image: "/assets/portfolio/one.png",
    title: "Construction website",
    description: "It's a portfolio construction website.",
    tag: "Website Development",
  },
  {
    image: "/assets/gigs/dummytwo.png",
    title: "E-commerce Platform",
  },
  {
    image: "/assets/portfolio/two.png",
    title: "Portfolio Landing Page",
  },
  {
    image: "/assets/portfolio/three.png",
    title: "Marketing Agency",
  },
  // Add more items as needed
];

export default function Portfolio() {
  const featured = portfolioItems[0];
  const galleryItems = portfolioItems.slice(1, 4); // only 3 shown thumbnails

  return (
    <div className="portfolio-container">
      <h3>Portfolio</h3>
      <div className="portfolio-main">
        <div className="featured-project">
          <img src={featured.image} alt={featured.title} />
          <div className="project-details">
            <h4>{featured.title}</h4>
            <p>{featured.description}</p>
            <span className="tag">{featured.tag}</span>
          </div>
        </div>
        <div className="project-gallery">
          {galleryItems.map((item, idx) => (
            <img
              key={idx}
              src={item.image}
              alt={item.title}
              className="thumbnail"
            />
          ))}
         <Link className="link" href="/seller/portfolio"> <div className="more-projects">+{portfolioItems.length - 1} Projects</div></Link>
        </div>
      </div>
   <Link className="link" href="/seller/portfolio">  <button className="view-gig">View all projects</button></Link>
      
      
   
    </div>
  );
}
