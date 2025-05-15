'use client';

import React, { useState } from 'react';
import './DescriptionEditor.css';

const DescriptionEditor = ({ onNext, onBack }) => {
  const [charCount, setCharCount] = useState(0);

  const handleContentChange = (e) => {
    setCharCount(e.target.innerText.length);
  };

  return (
    <div className="main-div">
      <div className="desc-container">
        <h3>Description</h3>
        <hr />
        <label htmlFor="gig-desc" className="desc-label">
          Briefly Describe Your Gig
        </label>

        <div className="editor-toolbar">
          <button type="button" title="Bold"><b>B</b></button>
          <button type="button" title="Italic"><i>I</i></button>
          <button type="button" title="Underline"><u>U</u></button>
          <button type="button" title="Bullet List">•</button>
          <button type="button" title="Number List">1.</button>
        </div>

        <div
          className="editor-box"
          contentEditable
          id="gig-desc"
          placeholder="Type your gig description here..."
          onInput={handleContentChange}
        ></div>

        <div className="char-count">{charCount}/1200 Characters</div>

<div className='hourlyRateTaker'>
  <label className="desc-label">
          Hourly Rate?
        </label>
        <input type='text' placeholder='$20' /><span>$ / hr</span>

</div>

      </div>

      <div className="submit-container">
        <button className="back-btn" onClick={onBack}>Back</button>
        <button className="submit-btn" onClick={onNext}>Save & Continue</button>
      </div>
  
    </div>
  );
};

export default DescriptionEditor;
