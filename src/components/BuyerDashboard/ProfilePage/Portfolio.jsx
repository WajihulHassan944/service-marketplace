import Link from "next/link";
import "./Styles.css";

export default function Portfolio({ portfolios, id, name }) {
  if (!portfolios || portfolios.length === 0) {
    return (
      <div className="portfolio-container">
        <h3>Portfolio</h3>
        <p className="no-gig-message">No portfolio projects available.</p>
      </div>
    );
  }

  const featured = portfolios[0];
  const galleryItems = portfolios.slice(1, 4);

  const renderPreview = (item, className = "") => {
    if (item.previewType === "image") {
      return <img src={item.imageUrl} alt={item.title} className={className} />;
    }

    if (item.previewType === "link" || item.previewType === "iframe") {
      return (
        <a
          href={item.websiteLink || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`website-title-preview ${className}`}
        >
          <strong>{item.title}</strong>
        </a>
      );
    }

    return (
      <div className="no-preview">
        <p>No valid preview available</p>
      </div>
    );
  };

  return (
    <div className="portfolio-container">
      <h3>Portfolio</h3>

      <div className="portfolio-main">
        <div className="featured-project">
          {renderPreview(featured)}
          <div className="project-details">
            <h4>{featured.title}</h4>
            <p>{featured.description}</p>
            <span className="tag">
              {featured.previewType === "image"
                ? "Image Project"
                : "Website Link"}
            </span>
          </div>
        </div>

        <div className="project-gallery">
          {galleryItems.map((item, idx) => (
            <div key={idx} className="thumbnail-wrapper">
              {renderPreview(item, "thumbnail")}
            </div>
          ))}

          {portfolios.length > 1 && (
            <Link className="link" href={`/seller/portfolio?id=${id}&name=${name}`}>
              <div className="more-projects">
                +{portfolios.length - 1} Projects
              </div>
            </Link>
          )}
        </div>
      </div>

      <Link className="link" href={`/seller/portfolio?id=${id}&name=${name}`}>
        <button className="view-gig">View all projects</button>
      </Link>
    </div>
  );
}
