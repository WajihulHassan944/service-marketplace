import Image from "next/image";

export default function Reviews() {
  return (
    <div className="reviews-container">
      <h3>36 Reviews</h3>

      <div className="review-card">
        <div className="review-top">
          <Image
            src="/assets/myimg.jpg"
            alt="Reviewer"
            width={50}
            height={50}
            className="review-avatar"
          />
          <div className="reviewer-details">
            <div className="reviewer-name">
              <strong>Industry76</strong> <span className="badge">↻ Repeat Client</span>
            </div>
            <div className="reviewer-location">🇺🇸 United States</div>
          </div>
        </div>

        <div className="review-rating">
          <span>⭐⭐⭐⭐⭐</span>
          <span className="review-time">• 2 weeks ago</span>
        </div>

        <p className="review-text">
          Phenomenal job! I could not be happier with this outcome.
        </p>

        <div className="review-meta">
          <div className="meta-box">
            <strong>PKR28,200–PKR56,400</strong>
            <span>Price</span>
          </div>
          <div className="meta-box">
            <strong>3 days</strong>
            <span>Duration</span>
          </div>
          <div className="meta-box tag-box">
            <span>Web Application</span>
          </div>
        </div>

        <div className="review-helpful">
          Helpful? <button>👍 Yes</button> <button>👎 No</button>
        </div>
      </div>
      <button className="view-gig">View all reviews</button>
    </div>
  );
}
