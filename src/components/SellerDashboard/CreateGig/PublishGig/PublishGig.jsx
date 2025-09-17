'use client';

import { baseUrl } from '@/const';
import React, { useState } from 'react';
import './PublishGig.css';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
const PublishGig = ({ onBack, gigData }) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const gigId = searchParams.get('gigId');
  const isEdit = searchParams.get('edit') === 'true';
const [draftMode, setDraftMode] = useState(false);

  const handlePublish = async (isDraft = false) => {
   setLoading(isDraft ? "draft" : "publish");
    setError('');
    setSuccess(false);
setDraftMode(isDraft);
    try {
      const formData = new FormData();

      // Append basic fields
      formData.append('gigTitle', gigData.gigTitle);
      formData.append('category', gigData.category);
      formData.append('subcategory', gigData.subcategory);
      formData.append('searchTag', gigData.searchTag);
      formData.append('gigDescription', gigData.gigDescription);
      formData.append('offerPackages', gigData.offerPackages);
      formData.append('hourlyRate', gigData.hourlyRate.toString());
      formData.append('subcategorychild', gigData.subcategorychild);
      formData.append("isDraft", isDraft ? "true" : "false");
      // Process positiveKeywords
      formData.append(
        'positiveKeywords',
        JSON.stringify(
          gigData.positiveKeywords
            .split(',')
            .map((k) => k.trim())
            .filter((k) => k.length > 0)
        )
      );

      // Process videoIframes
      formData.append('videoIframes', JSON.stringify(gigData.videoIframes || []));
      formData.append('faqs', JSON.stringify(gigData.faqs || []));

      // Prepare formattedPackages
      const formattedPackages = {};
      const packageKeys = gigData.offerPackages
        ? ['basic', 'standard', 'premium']
        : ['standard'];

      for (let key of packageKeys) {
        const pkg = gigData.packages[key];
        formattedPackages[key] = {};

        // Known fields
        for (let k in pkg.known) {
          formattedPackages[key][k] = pkg.known[k];
        }

        // Dynamic fields
        for (let dyn in pkg.dynamic || {}) {
          formattedPackages[key][dyn] = pkg.dynamic[dyn];
        }
      }

      formData.append('packages', JSON.stringify(formattedPackages));

  // Handle images
if (gigData.images && gigData.images.length > 0) {
  gigData.images.forEach((imageObj) => {
    if (imageObj.file) {
      formData.append('gigImages', imageObj.file);
    }
  });
}

// Handle deleted images during edit
if (isEdit && gigData.imagesToDelete?.length > 0) {
  formData.append("imagesToRemove", JSON.stringify(gigData.imagesToDelete));
}


  // Handle PDF
if (gigData.pdf?.file) {
  // User uploaded a new PDF   subcategorychild
  formData.append("gigPdf", gigData.pdf.file);
} else if (gigData.removePdf) {
  // User chose to remove the existing PDF
  formData.append("removePdf", "true");
}
// If user didn't upload or remove, do nothing (keep existing PDF)


      // Debug log all FormData contents
      console.log('%c📦 Final FormData before submission:', 'color: green');
      for (let pair of formData.entries()) {
        const isFile = pair[1] instanceof File;
        console.log(`${pair[0]}:`, isFile ? `[File: ${pair[1].name}]` : pair[1]);
      }

      // Send request
      const endpoint = isEdit
        ? `${baseUrl}/gigs/update/${gigId}`
        : `${baseUrl}/gigs/create`;
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to submit gig');
      }

      setSuccess(true);
       if (isEdit) {
        toast.success(
          isDraft
            ? "Gig saved as draft successfully!"
            : "Gig updated successfully!"
        );
      } else {
        toast.success(
          isDraft
            ? "Gig created as draft successfully!"
            : "Gig published successfully!"
        );
      }
      router.push('/seller/services');
      } catch (err) {
      console.error('❌ Publish error:', err);

      let msg = err.message || "Something went wrong";

      if (msg.includes("gigTitle")) {
        msg = "Please enter a title for your gig.";
      } else if (msg.includes("category")) {
        msg = "Please select a category for your gig.";
      } else if (msg.includes("subcategory")) {
        msg = "Please select a subcategory.";
      } else if (msg.includes("subcategorychild")) {
        msg = "Please select a child subcategory.";
      } else if (msg.includes("gigDescription")) {
        msg = "Please provide a detailed description for your gig.";
      } else if (msg.includes("images")) {
        msg = "You must upload at least one image (max 3).";
      } else if (msg.includes("userId")) {
        msg = "Authentication error. Please log in again.";
      } else {
        // fallback: clean generic mongoose error message
        try {
          const parsed = JSON.parse(msg);
          msg = parsed.message || "Something went wrong while submitting your gig.";
        } catch {
          msg = msg.replace("Gig validation failed:", "Validation error:").trim();
        }
      }

      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="publish-container">
      <div className="publish-content">
       <div> <h2>{isEdit ? 'Update your Gig' : 'Almost there...'}</h2>
        <p>
          {isEdit
            ? 'Make your final changes and update your Gig.'
            : "Let's publish your Gig and get some buyers rolling in."}
        </p>
</div>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
       {success && (
  <p style={{ color: 'green' }}>
    {isEdit
      ? draftMode
        ? 'Gig saved as draft successfully!'
        : 'Gig updated successfully!'
      : draftMode
        ? 'Gig created as draft successfully!'
        : 'Gig published successfully!'}
  </p>
)}


               <div className="form-actions">
          <div className="left-actions">
            <button className="back-btn" onClick={onBack} disabled={loading}>
              Back
            </button>
          <button
  className="back-btn"
  onClick={() => handlePublish(true)}
  disabled={loading === "draft" || success}
>
  {loading === "draft" ? <span className="loader"></span> : "Save as Draft"}
</button>
          </div>

       <button
  className="submit-btn"
  onClick={() => handlePublish(false)}
  disabled={loading === "publish" || success}
>
  {loading === "publish" ? (
    <span className="loaderPublishGig"></span>
  ) : isEdit ? (
    "Update Gig"
  ) : (
    "Publish Gig"
  )}
</button>
        </div>

      </div>
    </div>
  );
};

export default PublishGig;
