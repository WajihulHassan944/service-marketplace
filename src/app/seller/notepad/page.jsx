'use client';
import React, { useEffect, useState } from 'react';
import "./notepad.css";
import {
  FaRegStar,
  FaBars,
  FaRegCheckCircle,
  FaTrashAlt,
  FaCheck,
  FaRegEdit,
  FaRegClipboard
} from "react-icons/fa";

import { MdOutlinePending } from "react-icons/md";
import Breadcrumb from './Breadcrumb/Breadcrumb';
import Addnote from './Addnote/Addnote';
import { baseUrl } from '@/const';

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editNoteId, setEditNoteId] = useState(null);

  const fetchNotes = async () => {
    try {
      const res = await fetch(`${baseUrl}/notes/user`, {
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        setNotes(data.notes || []);
      }
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this note?")) return;
    try {
      const res = await fetch(`${baseUrl}/notes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setNotes(prev => prev.filter(note => note._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const toggleImportant = async (id) => {
    try {
      await fetch(`${baseUrl}/notes/toggle-important/${id}`, {
        method: "PATCH",
        credentials: "include",
      });
      fetchNotes();
    } catch (err) {
      console.error("Toggle important failed:", err);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await fetch(`${baseUrl}/notes/status/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: currentStatus === "completed" ? "pending" : "completed" }),
      });
      fetchNotes();
    } catch (err) {
      console.error("Toggle status failed:", err);
    }
  };

  const filteredNotes = notes.filter(note => {
    if (filter === "completed") return note.status === "completed";
    if (filter === "pending") return note.status === "pending";
    if (filter === "important") return note.isImportant;
    return true;
  });

  return (
    <div className="notepad-wrapper">
      <Breadcrumb />

      <div className="topbar">
        <div className="tabs">
          <button className={`tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}><FaBars /> All Notes</button>
          <button className={`tab ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}><FaRegCheckCircle /> Completed</button>
          <button className={`tab ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}><MdOutlinePending /> Pending</button>
          <button className={`tab ${filter === 'important' ? 'active' : ''}`} onClick={() => setFilter('important')}><FaRegStar /> Important</button>
        </div>

        <button className="add-notes" onClick={() => setShowModal(true)}>
                 <FaRegClipboard /> Add Notes
               </button>
                {showModal && (
                    <Addnote onSuccess={fetchNotes} noteId={editNoteId} onClose={()=>setShowModal(false)} />
                )}
      </div>

      <div className="notes-container">
        {filteredNotes.map((note) => (
          <div className="note-card" key={note._id}>
            <div className="note-stripe" style={{ backgroundColor: note.isImportant ? "#FFD54F" : "#3A5AFE" }} />
            <div className="note-content">
              <h4>{note.title}</h4>
              <p className="note-date">{new Date(note.date).toLocaleDateString()}</p>
              <p className="note-desc">{note.description}</p>
              <div className="note-actions">
                <div className='flexed-div'>
              <FaRegStar
  className={`icon ${note.isImportant ? 'important' : ''}`}
  onClick={() => toggleImportant(note._id)}
/>
    <FaTrashAlt
                    className="icon delete"
                    onClick={() => handleDelete(note._id)}
                  />
                 <FaRegEdit
  className="icon edit-icon"
  onClick={() => {
    setEditNoteId(note._id);
    setShowModal(true);
  }}
/>
 </div>
               {note.status === 'completed' ? (
  <MdOutlinePending
    className="icon tick"
    title="Mark as Completed"
    onClick={() => toggleStatus(note._id, note.status)}
  />
) : (
  
  <FaCheck
    className="icon tick done"
    title="Mark as Pending"
    onClick={() => toggleStatus(note._id, note.status)}
  />
)}

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
