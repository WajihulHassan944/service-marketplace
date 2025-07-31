import React, { useState } from "react";
import { FiX, FiPaperclip } from "react-icons/fi";
import "./SubmitWorkPopup.css";
import { baseUrl } from "@/const";
import { toast } from "react-hot-toast";

export default function SubmitWorkPopup({ onClose, orderId , onSubmitSuccess }) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const MAX_FILE_SIZE_MB = 20;

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const sizeMB = selected.size / (1024 * 1024);
    if (sizeMB > MAX_FILE_SIZE_MB) {
      toast.error("File exceeds the 20MB limit.");
      return;
    }

    setFile(selected);
  };

  const handleSubmit = async () => {
    if (!message.trim() || !file) {
      toast.error("Please enter a message and attach a valid file.");
      return;
    }

    const formData = new FormData();
    formData.append("message", message);
    formData.append("file", file);

    try {
      setSubmitting(true);

      const response = await fetch(`${baseUrl}/orders/deliver/${orderId}`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit work.");
      }

      toast.success("Work submitted successfully!");
       if (onSubmitSuccess) {
      onSubmitSuccess(); 
    }

      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const isFormValid = message.trim() && file;

  return (
    <div className="swp-overlay">
      <div className="swp-modal">
        <div className="swp-header">
          <h2 className="swp-title">Submit work</h2>
          <button className="swp-close-btn" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <label className="swp-label">Message to Client</label>
        <textarea
          maxLength={500}
          className="swp-textarea"
          placeholder="Let them know about the work you're submitting"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="swp-char-count">{500 - message.length}/500</div>

        <div className="swp-upload-section">
          <label className="swp-attach">
            <FiPaperclip size={18} />
            <span>Attach file</span>
            <input type="file" hidden onChange={handleFileChange} />
          </label>
          <span className="swp-max-size">Max file size: 20 MB</span>
          {file && <div className="swp-file-name">{file.name}</div>}
        </div>

        <div className="swp-footer-buttons">
          <button className="swp-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="swp-submit"
            onClick={handleSubmit}
            disabled={!isFormValid || submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
