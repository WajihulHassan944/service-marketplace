import React from "react";
import { FaCheckCircle, FaWrench } from "react-icons/fa";

const ProfileChecklist = () => {
  return (
    <div className="checklist">
      <h2>👋 Get to know this buyer</h2>
      <p>This buyer is new—here’s what we know so far.</p>

      <ul className="checklist-items">
        <li className="completed">
          <FaCheckCircle color="green" /> Shared how they plan to use the platform
        </li>
      
      </ul>
    </div>
  );
};

export default ProfileChecklist;
