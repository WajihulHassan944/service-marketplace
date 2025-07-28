'use client';

import React, { useEffect, useState } from 'react';
import './MyClients.css';
import Sidebar from '../Sidebar/Sidebar';
import { baseUrl } from '@/const';
import toast from 'react-hot-toast';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch(`${baseUrl}/clients`, {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch clients');
        const data = await res.json();
        setClients(data.clients || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleDeleteClient = async (clientId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this client?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${baseUrl}/clients/${clientId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete client');

      // Remove from local state
      setClients((prev) => prev.filter((client) => client._id !== clientId));
      toast.success('Client deleted successfully!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="client-list-page">
      <Sidebar />
      <div className="client-list-container">
        <h2 className="client-list-heading">My Clients</h2>
        {loading ? (
          <p className="status-message">Loading...</p>
        ) : error ? (
          <p className="status-message error">{error}</p>
        ) : clients.length === 0 ? (
          <p className="status-message">No clients found.</p>
        ) : (
          <div className="client-cards-wrapper">
            {clients.map((client) => (
              <div className="client-card" key={client._id}>
                <img
                  src={client.profileUrl}
                  alt={client.name}
                  className="client-image"
                />
                <h3>{client.name}</h3>
                <p className="client-country">{client.country}</p>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteClient(client._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientList;
