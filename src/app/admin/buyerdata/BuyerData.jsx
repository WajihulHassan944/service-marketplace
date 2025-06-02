"use client";
import React, { useEffect, useState } from "react";
import "./buyerdata.css";
import { Toaster, toast } from 'react-hot-toast';
import { baseUrl } from '@/const';
const API_BASE = "https://backend-service-marketplace.vercel.app/api/users";

const BuyerData = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingUserId, setUpdatingUserId] = useState(null);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const res = await fetch(`${API_BASE}/buyers`, {
          method: "GET",
          credentials: "include", // sends cookies
        });

        if (!res.ok) throw new Error("Failed to fetch buyers");
        const data = await res.json();
        setMembers(data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyers();
  }, []);

  const toggleBlock = async (userId, currentlyBlocked) => {
    setUpdatingUserId(userId);
    try {
      const url = `${API_BASE}/${userId}/${currentlyBlocked ? "unblock" : "block"}`;

      const res = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to update block status");

      setMembers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, blocked: !currentlyBlocked } : user
        )
      );
    } catch (err) {
      toast.error("Error: " + err.message);
    } finally {
      setUpdatingUserId(null);
    }
  };

const handleDelete = async (userId) => {
  if (window.confirm("Are you sure you want to delete this buyer?")) {
    try {
      const response = await fetch(`${baseUrl}/users/admin/delete-user/${userId}`, {
        method: "DELETE",
        credentials: "include", // 👈 ensures cookies like auth tokens are sent
      });

      const data = await response.json();

      if (response.ok) {
        // Remove user from UI
        setMembers((prev) => prev.filter((user) => user._id !== userId));
        toast.success(data.message || "User deleted successfully.");
      } else {
     toast.error(data.message || "Failed to delete user.");
      }

    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("An error occurred. Please try again.");
    }
  }
};

  if (loading) return <p>Loading buyers...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="table-wrapper">
      <table className="team-table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>Verified</th>
            <th>Block</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id}>
              <td>
                {member.profileUrl ? (
                  <img
                    src={member.profileUrl}
                    alt={`${member.firstName} ${member.lastName}`}
                    className="buyer-avatar"
                  />
                ) : (
                  <div className="fallback-avatar">
                    {member.firstName?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
              </td>
              <td>{member.firstName} {member.lastName}</td>
              <td>{member.email}</td>
              <td>{member.country}</td>
              <td>{member.verified ? "Yes" : "No"}</td>
              <td>
                <button
                  className={`block-btn ${member.blocked ? "unblock" : "block"}`}
                  onClick={() => toggleBlock(member._id, member.blocked)}
                  disabled={updatingUserId === member._id}
                >
                  {updatingUserId === member._id
                    ? member.blocked
                      ? "Unblocking..."
                      : "Blocking..."
                    : member.blocked
                      ? "Unblock"
                      : "Block"}
                </button>
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(member._id)}
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

export default BuyerData;
