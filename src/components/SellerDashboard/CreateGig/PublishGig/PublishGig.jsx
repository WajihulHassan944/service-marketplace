"use client";

import { baseUrl } from "@/const";
import React, { useState } from "react";
import "./PublishGig.css";
import { useRouter, useSearchParams } from "next/navigation";

const PublishGig = ({ onBack, gigData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
const router = useRouter();
 const searchParams = useSearchParams();
  const gigId = searchParams.get("gigId");
  const isEdit = searchParams.get("edit") === "true";

const handlePublish = async () => {
  
  setLoading(true);
  setError("");
  setSuccess(false);

    try {
      const formData = new FormData();

      // Basic text fields
      formData.append("userId", gigData.userId);
      formData.append("gigTitle", gigData.gigTitle);
      formData.append("category", gigData.category);
      formData.append("subcategory", gigData.subcategory);
      formData.append("searchTag", gigData.searchTag);
      formData.append("gigDescription", gigData.gigDescription);
      formData.append("hourlyRate", gigData.hourlyRate.toString());

      // JSON fields
     formData.append(
  "positiveKeywords",
  JSON.stringify(
    gigData.positiveKeywords
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k.length > 0)
  )
);

      formData.append("videoIframes", JSON.stringify(gigData.videoIframes));

      // Packages (as a single JSON string)
      const formattedPackages = {
        basic: {
          packageName: gigData.packages.basic.name,
          description: gigData.packages.basic.description,
          price: gigData.packages.basic.price,
          deliveryTime: gigData.packages.basic.deliveryTime,
          revisions: gigData.packages.basic.revisions,
          numberOfPages: gigData.packages.basic.pages,
          afterProjectSupport: gigData.packages.basic.afterProjectSupport,
        },
        standard: {
          packageName: gigData.packages.standard.name,
          description: gigData.packages.standard.description,
          price: gigData.packages.standard.price,
          deliveryTime: gigData.packages.standard.deliveryTime,
          revisions: gigData.packages.standard.revisions,
          numberOfPages: gigData.packages.standard.pages,
          afterProjectSupport: gigData.packages.standard.afterProjectSupport,
        },
        premium: {
          packageName: gigData.packages.premium.name,
          description: gigData.packages.premium.description,
          price: gigData.packages.premium.price,
          deliveryTime: gigData.packages.premium.deliveryTime,
          revisions: gigData.packages.premium.revisions,
          numberOfPages: gigData.packages.premium.pages,
          afterProjectSupport: gigData.packages.premium.afterProjectSupport,
        },
      };

      formData.append("packages", JSON.stringify(formattedPackages));

      // Images
      gigData.images.forEach((imageObj) => {
  formData.append("gigImages", imageObj.file); // ✅ this is the actual File
});

      // PDF
      if (gigData.pdf) {
        formData.append("gigPdf", gigData.pdf);
      }

      // Debug FormData
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: [File] ${value.name}`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      const endpoint = isEdit
      ? `${baseUrl}/gigs/update/${gigId}`
      : `${baseUrl}/gigs/create`;

    const method = isEdit ? "PUT" : "POST";

    const response = await fetch(endpoint, {
      method,
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to submit gig");
    }

    setSuccess(true);
    router.push("/seller/services");
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="publish-container">
  <div className="publish-content">
    <h2>{isEdit ? "Update your Gig" : "Almost there..."}</h2>
    <p>
      {isEdit
        ? "Make your final changes and update your Gig."
        : "Let's publish your Gig and get some buyers rolling in."}
    </p>

    {error && <p style={{ color: "red" }}>Error: {error}</p>}
    {success && (
      <p style={{ color: "green" }}>
        {isEdit ? "Gig updated successfully!" : "Gig published successfully!"}
      </p>
    )}

    <div className="btn-div">
      <button
        className="publish-btn"
        onClick={handlePublish}
        disabled={loading || success}
      >
        {loading
          ? isEdit
            ? "Updating..."
            : "Publishing..."
          : isEdit
          ? "Update Gig"
          : "Publish Gig"}
      </button>
      <button className="back-btn" onClick={onBack} disabled={loading}>
        Back
      </button>
    </div>
  </div>
</div>

      );
};

export default PublishGig;
