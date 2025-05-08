import "./Styles.css";
export default function Header() {
    return (
      <div className="header-container">
        <img src="/assets/myimg.jpg" alt="Profile" className="profile-pic" />
        <div className="user-info">
          <h2>Wajih</h2>
          <p>@wajih2002</p>
          <p>Level 2 Seller</p>
          <p>Pakistan | English</p>
        </div>
      </div>
    );
  }