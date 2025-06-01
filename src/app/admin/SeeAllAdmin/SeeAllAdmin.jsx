"use client";
import React, { useEffect, useState } from "react";
import "./seealladmin.css";
import { baseUrl } from "@/const";

const SeeAllAdmin = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/users/admins`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch admins");

        const data = await res.json();
        if (data.success && Array.isArray(data.users)) {
          setMembers(data.users);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const toggleBlock = async (id, currentlyBlocked) => {
    try {
      const url = `${baseUrl}/users/${id}/${currentlyBlocked ? "unblock" : "block"}`;

      const res = await fetch(url, {
        method: "PUT",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update block status");

      setMembers((prev) =>
        prev.map((m) =>
          m._id === id ? { ...m, blocked: !currentlyBlocked } : m
        )
      );
    } catch (err) {
      alert("Error toggling block status: " + err.message);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      try {
        const res = await fetch(`${baseUrl}/users/admin/delete-user/${userId}`, {
          method: "DELETE",
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          setMembers((prev) => prev.filter((m) => m._id !== userId));
          alert(data.message || "Admin deleted successfully.");
        } else {
          alert(data.message || "Failed to delete admin.");
        }
      } catch (err) {
        alert("Error deleting admin: " + err.message);
      }
    }
  };

  if (loading) return <p>Loading admins...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="table-wrapper">
      <table className="team-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.length === 0 ? (
            <tr>
              <td colSpan={4}>No admins found.</td>
            </tr>
          ) : (
            members.map((member) => (
              <tr key={member._id}>
                <td className="name-cell">
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
                  <span className="name">
                    {member.firstName} {member.lastName}
                  </span>
                </td>
                <td>{member.email}</td>
                <td>{member.country || "N/A"}</td>
                <td>
                  <button
                    className={`action-btn ${member.blocked ? "unblock" : "block"}`}
                    onClick={() => toggleBlock(member._id, member.blocked)}
                  >
                    {member.blocked ? "Unblock" : "Block"}
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDelete(member._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SeeAllAdmin;
