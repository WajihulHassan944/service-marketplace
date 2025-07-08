"use client";
import React, { useEffect, useState } from "react";
import "./sellerdata.css";
import "../buyerdata/buyerdata.css";
import { baseUrl } from "@/const";
import { Toaster, toast } from 'react-hot-toast';

const SellersData = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({}); // { [userId]: 'approve' | 'block' }

  const fetchSellers = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${baseUrl}/users/sellers`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch sellers");

      const data = await res.json();
      if (data.success && Array.isArray(data.users)) {
        setMembers(data.users.filter(user => !user.role?.includes("superadmin")));
      } else {
        throw new Error("Invalid data format");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const toggleBlock = async (id, currentlyBlocked) => {
    setActionLoading(prev => ({ ...prev, [id]: "block" }));
    try {
      const url = `${baseUrl}/users/${id}/${currentlyBlocked ? "unblock" : "block"}`;

      const res = await fetch(url, {
        method: "PUT",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update block status");

      toast.success(`User ${currentlyBlocked ? "unblocked" : "blocked"} successfully.`);
      fetchSellers(); // refetch after update
    } catch (err) {
      toast.error("Error toggling block status: " + err.message);
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: null }));
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this seller?")) {
      try {
        const res = await fetch(`${baseUrl}/users/admin/delete-user/${userId}`, {
          method: "DELETE",
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          setMembers((prev) => prev.filter((m) => m._id !== userId));
          toast.success(data.message || "Seller deleted successfully.");
        } else {
          toast.error(data.message || "Failed to delete seller.");
        }
      } catch (err) {
        toast.error("Error deleting seller: " + err.message);
      }
    }
  };

  const handleApprove = async (id) => {
    setActionLoading(prev => ({ ...prev, [id]: "approve" }));
    try {
      const res = await fetch(`${baseUrl}/users/verify/${id}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to approve seller");

      toast.success("Seller approved successfully!");
      fetchSellers(); // refetch after update
    } catch (err) {
      toast.error("Error approving seller: " + err.message);
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: null }));
    }
  };

  if (loading) return <p>Loading sellers...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="table-wrapper">
      <Toaster />
      <table className="team-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>Actions</th>
            <th>Block</th>
          </tr>
        </thead>
        <tbody>
          {members.length === 0 ? (
            <tr>
              <td colSpan={5}>No sellers found.</td>
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
                  <div>
                    <p className="name">
                      {member.firstName} {member.lastName}
                    </p>
                    <p className="role">Seller</p>
                  </div>
                </td>
                <td>{member.email}</td>
                <td>{member.country || "N/A"}</td>
                <td>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(member._id)}
                    >
                      Delete
                    </button>
                    <button
                      className={`approve-btn ${member.sellerStatus ? "approved" : "approve"}`}
                      onClick={() => handleApprove(member._id)}
                      disabled={member.sellerStatus || actionLoading[member._id] === "approve"}
                    >
                      {actionLoading[member._id] === "approve" ? (
                        <span className="spinner" />
                      ) : member.sellerStatus ? "Approved" : "Approve"}
                    </button>
                  </div>
                </td>
                <td>
                  <button
                    className={`block-btn ${member.blocked ? "unblock" : "block"}`}
                    onClick={() => toggleBlock(member._id, member.blocked)}
                    disabled={actionLoading[member._id] === "block"}
                  >
                    {actionLoading[member._id] === "block" ? (
                      <span className="spinner" />
                    ) : member.blocked ? "Unblock" : "Block"}
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

export default SellersData;
