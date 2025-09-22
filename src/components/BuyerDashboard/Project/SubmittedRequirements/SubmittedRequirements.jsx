'use client';
import React, { useEffect, useRef } from "react";
import "./SubmittedRequirements.css";
import { useSelector } from "react-redux";
import { baseUrl } from "@/const";
export default function SubmittedRequirements({ order , fetchOrder}) {
  const user = useSelector((state) => state.user);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!order || !user) return;

    // only trigger for seller and if requirementsReviewedAt is empty
    if (
      user.currentDashboard !== "seller" ||
      order.timeline?.requirementsReviewedAt
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      async (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          try {
            await fetch(
              `${baseUrl}/orders/requirements-reviewed/${order._id}`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
              }
            );
            console.log("✅ Requirements marked as reviewed");
            fetchOrder();
            observer.disconnect(); // stop observing after first trigger
          } catch (error) {
            console.error("❌ Failed to mark requirements reviewed:", error);
          }
        }
      },
      { threshold: 0.3 } // trigger when 30% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [order, user]);

  if (!order) return null;

  const requirementText = order.requirements;
  const uploadedFiles = Array.isArray(order.files) ? order.files : [];

  return (
    <div className="requirements-container" ref={sectionRef}>
      <div className="requirements-header">
        <span>Submitted Requirements</span>
        <span className="arrow">▾</span>
      </div>

      <div className="requirement">
        <p>
          <strong>Requirement:</strong>
          <br />
          {requirementText ? (
            <span>{requirementText}</span>
          ) : (
            <span style={{ color: "#999" }}>No requirements submitted.</span>
          )}
        </p>
      </div>

      <div className="requirement">
        <p>
          <strong>Attached File(s):</strong>
        </p>
        {uploadedFiles.length > 0 ? (
          uploadedFiles.map((file, i) => (
            <a
              key={file._id || i}
              href={file.url}
              className="file-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 Requirements File
            </a>
          ))
        ) : (
          <p style={{ color: "#999" }}>No files attached.</p>
        )}
      </div>
    </div>
  );
}
