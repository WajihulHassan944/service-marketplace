"use client";

import React, { useState } from "react";
import {  FaTrash, FaEdit } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./GigFaqs.css";

const GigFaqs = ({ onNext, onBack, gigData, setGigData }) => {
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFaq((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateFaq = () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) return;

    setGigData((prev) => {
      const updatedFaqs = [...(prev.faqs || [])];
      if (editIndex !== null) {
        updatedFaqs[editIndex] = newFaq;
      } else {
        updatedFaqs.push(newFaq);
      }
      return { ...prev, faqs: updatedFaqs };
    });

    setNewFaq({ question: "", answer: "" });
    setEditIndex(null);
  };

  const handleDeleteFaq = (index) => {
    setGigData((prev) => {
      const updatedFaqs = [...(prev.faqs || [])];
      updatedFaqs.splice(index, 1);
      return { ...prev, faqs: updatedFaqs };
    });
  };

  const handleEditFaq = (index) => {
    setNewFaq(gigData.faqs[index]);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h3>Frequently Asked Questions (FAQs)</h3>
      <hr />

      {(!gigData.faqs || gigData.faqs.length === 0) && (
        <div className="no-faqs">No FAQs added yet.</div>
      )}

      {gigData.faqs &&
        gigData.faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div className="faq-header" onClick={() => toggleExpand(index)}>
              <div className="faqQuestion"><strong>Q:</strong> {faq.question}</div>
              {expandedIndex === index ? (
                <IoIosArrowUp className="arrow-icon" />
              ) : (
                <IoIosArrowDown className="arrow-icon" />
              )}
            </div>

            {expandedIndex === index && (
              <div className="faq-body">
                <p>
                  <strong>A:</strong> {faq.answer}
                </p>
                <div className="faq-actions">
                  <FaEdit
                    onClick={() => handleEditFaq(index)}
                    className="edit-icon"
                  />
                  <FaTrash
                    onClick={() => handleDeleteFaq(index)}
                    className="delete-icon"
                  />
                </div>
              </div>
            )}
          </div>
        ))}

      <div className="faq-form">
        <input
          type="text"
          name="question"
          placeholder="Enter a question"
          value={newFaq.question}
          onChange={handleInputChange}
        />
        <textarea
          name="answer"
          placeholder="Enter an answer"
          value={newFaq.answer}
          onChange={handleInputChange}
          rows={3}
        />
      
      </div>

     <div className="form-actions">
  <div className="left-actions">
    <button className="back-btn add-faq-btn" onClick={handleAddOrUpdateFaq}>
      {editIndex !== null ? (
        "Update FAQ"
      ) : (
        <>
          Add FAQ
        </>
      )}
    </button>

    <button className="back-btn" onClick={onBack}>
      Back
    </button>
  </div>

  <button className="submit-btn" onClick={onNext}>
    Next
  </button>
</div>

    </div>
  );
};

export default GigFaqs;
