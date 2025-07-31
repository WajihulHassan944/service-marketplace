'use client';
import Image from 'next/image';
import { FaRegHeart, FaPaperPlane } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function ContactCard({ seller }) {
  const user = useSelector((state) => state.user);
  const router = useRouter();

  // Map country to timezone (simplified)
const countryTimezoneMap = {
  'United States': 'America/New_York',
  'Canada': 'America/Toronto',
  'United Kingdom': 'Europe/London',
  'Germany': 'Europe/Berlin',
  'France': 'Europe/Paris',
  'Italy': 'Europe/Rome',
  'Spain': 'Europe/Madrid',
  'India': 'Asia/Kolkata',
  'Pakistan': 'Asia/Karachi',
  'Bangladesh': 'Asia/Dhaka',
  'United Arab Emirates': 'Asia/Dubai',
  'Saudi Arabia': 'Asia/Riyadh',
  'China': 'Asia/Shanghai',
  'Japan': 'Asia/Tokyo',
  'South Korea': 'Asia/Seoul',
  'Malaysia': 'Asia/Kuala_Lumpur',
  'Australia': 'Australia/Sydney',
  'Brazil': 'America/Sao_Paulo',
  'Mexico': 'America/Mexico_City',
  'Russia': 'Europe/Moscow',
  'South Africa': 'Africa/Johannesburg',
  'Indonesia': 'Asia/Jakarta',
  'Nigeria': 'Africa/Lagos',
  'Argentina': 'America/Argentina/Buenos_Aires',
};


  const getLocalTime = (country) => {
    try {
      const timezone = countryTimezoneMap[country] || 'UTC';
      const date = new Date().toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      return date;
    } catch {
      return 'Unknown';
    }
  };

  const handleContact = () => {
    if (user?._id) {
      router.push(`/messages?receiverId=${seller._id}`);
    } else {
      router.push('/login?redirectedFromSellerProfile=true');
    }
  };

  return (
    <div className="contact-card">
      <div className="card-header">
        <div className="user">
          <Image
            src={seller.profileUrl || '/assets/myimg.jpg'}
            alt="User profile"
            width={40}
            height={40}
            className="user-avatar"
          />
          <div className="user-info" style={{textTransform:'capitalize'}}>
            <strong>{seller.firstName} {seller.lastName}</strong>
            <p>{getLocalTime(seller.country)} local time</p>
          </div>
        </div>
        <div className="card-actions">
          <button className="btn-icon"><FaRegHeart /></button>
        </div>
      </div>

      <button className="btn-contact" onClick={handleContact} disabled={!user?._id}>
        <FaPaperPlane style={{ marginRight: '8px' }} />
        Contact me
      </button>
    </div>
  );
}
