'use client';
import Image from 'next/image';
import './reviewcard.css';
import Sidebar from '../Sidebar/Sidebar';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const renderStars = (count) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <FaStar key={i} color="#f5c518" />
      ))}
      {[...Array(5 - count)].map((_, i) => (
        <FaRegStar key={i} color="#ccc" />
      ))}
    </>
  );
};

const ReviewCard = () => {
  const user = useSelector((state) => state.user);

  const isBuyer = user.currentDashboard === 'buyer';
  const reviews = isBuyer ? user.buyerReviews || [] : user.sellerReviews || [];

  return (
    <div className="container">
      <Sidebar />
      <div className="review-card">
        <h2 className="review-count">Reviews</h2>

        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet.</p>
        ) : (
          reviews.map((review, index) => {
            const reviewer = isBuyer
              ? review.reviewedGigSeller
              : review.reviewedGigBuyer;

            return (
              <div className="card-review-updated" key={index}>
                <div className="user-info">
                  <Image
                    src={reviewer?.profileUrl || '/assets/users/placeholder.png'}
                    alt="User"
                    width={40}
                    height={40}
                    className="avatar"
                  />
                  <div>
                    <div className="username">
                      {reviewer?.firstName || 'Unknown'} {reviewer?.lastName || ''}
                    </div>
                    <div className="badges">
                      <span className="badge">Repeat Client</span>
                      <span className="country">🇵🇰 {reviewer?.country || 'Unknown'}</span>
                    </div>
                  </div>
                </div>

                <div className="meta">
                  <div className="stars">
                    {renderStars(
                      isBuyer ? review.overallRating : review.rating
                    )}
                  </div>
                  <span className="time">• {review.timeAgo}</span>
                </div>

                <p className="comment">{review.review}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
