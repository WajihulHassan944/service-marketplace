import "./Styles.css";
import moment from "moment";

export default function About({ seller }) {
  if (!seller) return null;

  const details = seller.sellerDetails || {};

  return (
    <div className="about-container">
      <div className="about-grid">
        <div className="about-row">
          <p className="label">From</p>
          <p className="value">{seller.country || "None"}</p>
        </div>
        <div className="about-row">
          <p className="label">Member since</p>
          <p className="value">
            {seller.createdAt
              ? moment(seller.createdAt).format("MMM YYYY")
              : "None"}
          </p>
        </div>
        <div className="about-row">
  <p className="label">Orders Completed</p>
  <p className="value">{details.analytics.ordersCompletedCount ?? "None"}</p>
</div>

        <div className="about-row">
  <p className="label">Last delivery</p>
  <p className="value">
    {details.analytics.lastDelivery
      ? new Date(details.analytics.lastDelivery).toLocaleString(undefined, {
          dateStyle: 'medium',
          timeStyle: 'short',
        })
      : "None"}
  </p>
</div>

        <div className="about-row full-width">
          <p className="label">Languages</p>
          <p className="value">
            {Array.isArray(details.languages)
              ? details.languages.join(", ")
              : details.languages || "None"}
          </p>
        </div>
      </div>

      <hr />

      <div className="about-description">
        <h3>About Me</h3>
        <p>{details.description || "No description added yet."}</p>
      </div>
    </div>
  );
}
