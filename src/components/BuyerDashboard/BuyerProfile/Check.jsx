import React from "react";
import { FaCheckCircle, FaWrench } from "react-icons/fa";

const ProfileChecklist = () => {
  return (
    <div className="checklist">
      <h2>👋 Let’s help freelancers get to know you</h2>
      <p>Get the most out of Todo by sharing more about yourself.</p>

      <ul className="checklist-items">
        <li className="completed">
          <FaCheckCircle color="green" /> Share how you plan to use Todo
        </li>
        <li>
          <FaWrench color="#999" /> Set your communication preferences <span>50%</span>
        </li>
      </ul>
    </div>
  );
};

export default ProfileChecklist;
