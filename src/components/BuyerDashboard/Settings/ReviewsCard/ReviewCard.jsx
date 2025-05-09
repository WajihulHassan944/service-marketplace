import Image from 'next/image';
import './reviewcard.css';
import Sidebar from '../Sidebar/Sidebar';
import { FaStar, FaRegStar } from 'react-icons/fa';

const reviews = [
  {
    username: 'Industry76',
    avatar: '/assets/myimg.jpg',
    badge: 'Repeat Client',
    country: '🇺🇸 United States',
    time: '2 weeks ago',
    rating: 5,
    comment: 'Phenomenal job! I could not be happier with this outcome.',
  },
  {
    username: 'Harry',
    avatar: '/assets/myimg.jpg',
    badge: 'Repeat Client',
    country: '🇺🇸 United States',
    time: '2 weeks ago',
    rating: 5,
    comment: 'Phenomenal job! I could not be happier with this outcome.',
  },
  {
    username: 'Angela U',
    avatar: '/assets/myimg.jpg',
    badge: 'Repeat Client',
    country: '🇺🇸 United States',
    time: '1 week ago',
    rating: 4,
    comment: 'Phenomenal job! I could not be happier with this outcome.',
  },
  {
    username: 'Zack lam',
    avatar: '/assets/myimg.jpg',
    badge: 'Repeat Client',
    country: '🇺🇸 United States',
    time: '3 weeks ago',
    rating: 3,
    comment: 'Phenomenal job! I could not be happier with this outcome.',
  },
];

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
  return (
    <div className="container">
      <Sidebar />

      <div className="review-card">
        <h2 className="review-count">Reviews</h2>
        {reviews.map((review, index) => (
          <div className="card" key={index}>
            <div className="user-info">
              <Image
                src={review.avatar}
                alt="User"
                width={40}
                height={40}
                className="avatar"
              />
              <div>
                <div className="username">{review.username}</div>
                <div className="badges">
                  <span className="badge">{review.badge}</span>
                  <span className="country">{review.country}</span>
                </div>
              </div>
            </div>
            <div className="meta">
              <div className="stars">{renderStars(review.rating)}</div>
              <span className="time">• {review.time}</span>
            </div>
            <p className="comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
