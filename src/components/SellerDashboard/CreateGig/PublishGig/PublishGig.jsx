'use client';

import { baseUrl } from '@/const';
import React, { useState } from 'react';
import './PublishGig.css';
import { useRouter, useSearchParams } from 'next/navigation';

const PublishGig = ({ onBack, gigData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const gigId = searchParams.get('gigId');
  const isEdit = searchParams.get('edit') === 'true';

  const handlePublish = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const formData = new FormData();

      // Append basic fields
      formData.append('userId', gigData.userId);
      formData.append('gigTitle', gigData.gigTitle);
      formData.append('category', gigData.category);
      formData.append('subcategory', gigData.subcategory);
      formData.append('searchTag', gigData.searchTag);
      formData.append('gigDescription', gigData.gigDescription);
      formData.append('offerPackages', gigData.offerPackages);
      formData.append('hourlyRate', gigData.hourlyRate.toString());

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
  // User uploaded a new PDF
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
      router.push('/seller/services');
    } catch (err) {
      console.error('❌ Publish error:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="publish-container">
      <div className="publish-content">
        <h2>{isEdit ? 'Update your Gig' : 'Almost there...'}</h2>
        <p>
          {isEdit
            ? 'Make your final changes and update your Gig.'
            : "Let's publish your Gig and get some buyers rolling in."}
        </p>

        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {success && (
          <p style={{ color: 'green' }}>
            {isEdit ? 'Gig updated successfully!' : 'Gig published successfully!'}
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
                ? <span className="loader"></span>
                : <span className="loader"></span>
              : isEdit
              ? 'Update Gig'
              : 'Publish Gig'}
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
