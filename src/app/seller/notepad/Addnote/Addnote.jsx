'use client';
import React, { useEffect, useState } from 'react';
import "./Addnote.css";
import { IoMdClose } from "react-icons/io";
import { baseUrl } from '@/const';
import toast from 'react-hot-toast';

const Addnote = ({ noteId, onSuccess, onClose }) => {
  console.log(noteId);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    const fetchNote = async () => {
      if (noteId) {
        try {
          const res = await fetch(`${baseUrl}/notes/${noteId}`, {
            credentials: "include"
          });
          const data = await res.json();
          if (data.success) {
            setTitle(data.note.title);
            setDescription(data.note.description);
            }
        } catch (err) {
          console.error("Error fetching note:", err);
        }
      }
    };

    fetchNote();
  }, [noteId]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const method = noteId ? 'PUT' : 'POST';
      const endpoint = noteId ? `${baseUrl}/notes/${noteId}` : `${baseUrl}/notes/create`;

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();
      if (data.success) {
        onSuccess?.(); // Optional callback to refetch or close modal
       onClose();
        setTitle('');
        setDescription('');
      } else {
        toast.error("Failed to save note.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
       
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>{noteId ? "Update Note" : "Add Note"}</h3>
              <button className="close-btn" onClick={onClose}>
                <IoMdClose />
              </button>
            </div>

            <div className="modal-body">
              <label>Note Title</label>
              <input
                type="text"
                placeholder="Title"
                className="modal-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label>Note Description</label>
              <textarea
                placeholder="Description"
                className="modal-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button className="discard-btn" onClick={onClose}>Discard</button>
              <button className="add-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Saving...' : noteId ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
    
    </div>
  );
};

export default Addnote;
