import "./Styles.css";
export default function Header({seller}) {
    return (
      <div className="header-container">
        <img src={seller.profileUrl} alt="Profile" className="profile-pic" />
        <div className="user-info">
          <h2>{seller.firstName} {seller.lastName}</h2>
          <p>{seller.userName}</p>
          <p>{seller.sellerDetails.level}</p>
          <p>{seller.country} | English</p>
        </div>
      </div>
    );
  }