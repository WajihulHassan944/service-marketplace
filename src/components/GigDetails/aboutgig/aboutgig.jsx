import "./aboutgig.css";
import moment from "moment";

export default function AboutSec({ seller, sellerAnalytics }) {
  if (!seller) return null;
console.log("seller d: ",sellerAnalytics);
  const details = seller.sellerDetails || {};

  return (
    <div className="aboutSection-container">
      <div className="aboutSection-grid">
        <div className="aboutSection-row">
          <p className="aboutSection-label">From</p>
          <p className="aboutSection-value">{seller.country || "None"}</p>
        </div>

        <div className="aboutSection-row">
          <p className="aboutSection-label">Member since</p>
          <p className="aboutSection-value">
            {seller.createdAt
              ? moment(seller.createdAt).format("MMM YYYY")
              : "None"}
          </p>
        </div>

        <div className="aboutSection-row">
          <p className="aboutSection-label">Orders Completed</p>
          <p className="aboutSection-value">
            {sellerAnalytics?.ordersCompletedCount ?? "None"}
          </p>
        </div>

       <div className="aboutSection-row">
  <p className="aboutSection-label">Last delivery</p>
  <p className="aboutSection-value">
    {seller.sellerAnalytics?.lastDelivery
      ? new Date(seller.sellerAnalytics.lastDelivery).toLocaleString(undefined, {
          dateStyle: 'medium',
          timeStyle: 'short',
        })
      : "None"}
  </p>
</div>


        <div className="aboutSection-row aboutSection-fullWidth">
          <p className="aboutSection-label">Languages</p>
          <p className="aboutSection-value">
            {Array.isArray(details.languages)
              ? details.languages.join(", ")
              : details.languages || "None"}
          </p>
        </div>
      </div>

      <hr className="aboutSection-divider" />

      <div className="aboutSection-description">
        <h3>About Me</h3>
        <p>{details.description || "No description added yet."}</p>
      </div>
    </div>
  );
}
