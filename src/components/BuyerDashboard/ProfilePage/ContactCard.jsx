import Image from 'next/image';
import { FaRegHeart, FaPaperPlane } from 'react-icons/fa';

export default function ContactCard() {
  return (
    <div className="contact-card">
      <div className="card-header">
        <div className="user">
          <Image
            src="/assets/myimg.jpg" 
            alt="User profile"
            width={40}
            height={40}
            className="user-avatar"
          />
          <div className="user-info">
            <strong>Wajih</strong>
            <p>Offline • 09:28 AM local time</p>
          </div>
        </div>
        <div className="card-actions">
          <button className="btn-outline">More about me</button>
          <button className="btn-icon"><FaRegHeart /></button>
        </div>
      </div>

      <button className="btn-contact">
        <FaPaperPlane style={{ marginRight: '8px' }} />
        Contact me
      </button>

      <p className="response-time">Average response time: 1 hour</p>
    </div>
  );
}
