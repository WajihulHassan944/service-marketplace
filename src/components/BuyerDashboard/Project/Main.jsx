import React from "react";
import ProjectTimeline from "./ProjectTimeline/ProjectTimeline";
import OrderDetails from "./OrdersDetails/OrdersDetails";
import RecentFiles from "./RecentFiles/RecentFiles";
import "./Main.css"; // Custom styles here
import SubmittedRequirements from "./SubmittedRequirements/SubmittedRequirements";

export default function Main() {
  return (
    <div className="main-container">
      <div className="top-grid">
        <div className="left-column">
          <ProjectTimeline />
          <RecentFiles />
        </div>
        <div className="right-column">
          <OrderDetails />
          <SubmittedRequirements />
        </div>
      </div>
  
    </div>
  );
}
