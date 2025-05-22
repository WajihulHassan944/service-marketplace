"use client";
import React, { useState } from "react";
import "./seealladmin.css";

const initialTeamMembers = [
  {
    name: "Emma Adams",
    email: "adams@mail.com",
    image: "/assets/myimg.jpg",
  },
  {
    name: "Olivia Allen",
    email: "allen@mail.com",
    image: "/assets/myimg.jpg",
  },
  {
    name: "Isabella Anderson",
    email: "anderson@mail.com",
    image: "/assets/myimg.jpg",
  },
  {
    name: "Amelia Armstrong",
    email: "armstrong@mail.com",
    image: "/assets/myimg.jpg",
  },
  {
    name: "Emily Atkinson",
    email: "atkinson@mail.com",
    image: "/assets/myimg.jpg",
  },
  {
    name: "Sofia Bailey",
    email: "bailey@mail.com",
    image: "/assets/myimg.jpg",
  },
  {
    name: "Victoria Sharma",
    email: "sharma@mail.com",
    image: "/assets/myimg.jpg",
  },
  {
    name: "Penelope Baker",
    email: "baker@mail.com",
    image: "/assets/myimg.jpg",
  },
];

const SeeAllAdmin = () => {
  const [members, setMembers] = useState(initialTeamMembers);

  const handleDelete = (index) => {
    const updated = [...members];
    updated.splice(index, 1);
    setMembers(updated);
  };

  return (
    <div className="table-wrapper">
      <table className="team-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td className="name-cell">
                <img src={member.image} alt={member.name} className="avatar" />
                <span className="name">{member.name}</span>
              </td>
              <td>{member.email}</td>
              <td>
                <button className="action-btn view">View</button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeeAllAdmin;
