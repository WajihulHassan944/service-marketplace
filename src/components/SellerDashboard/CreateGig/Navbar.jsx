"use client";

import React, { useState } from 'react';
import './navbar.css';
import GigForm from './GigForm/GigForm';
import ScopePricing from './ScopePricing/ScopePricing';
import DescriptionEditor from './DescriptionEditor/DescriptionEditor';
import GigGallery from './GigGallery/GigGallery';
import PublishGig from './PublishGig/PublishGig';

const steps = ['Overview', 'Pricing', 'Description', 'Gallery', 'Publish'];

const Navbar = () => {
  const [activeStep, setActiveStep] = useState(0);
const handleNext = () => {
  if (activeStep < steps.length - 1) {
    setActiveStep((prev) => {
      const nextStep = prev + 1;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return nextStep;
    });
  }
};

const handleBack = () => {
  if (activeStep > 0) {
    setActiveStep((prev) => {
      const previousStep = prev - 1;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return previousStep;
    });
  }
};

  const stepComponents = [
    <GigForm onNext={handleNext} />,
    <ScopePricing onNext={handleNext} onBack={handleBack} />,
    <DescriptionEditor onNext={handleNext} onBack={handleBack} />,
    <GigGallery onNext={handleNext} onBack={handleBack} />,
    <PublishGig onBack={handleBack} />
  ];

  return (
    <div className='creation-gig-wrapper'>
      <nav className="create-gig-navbar">
        <ul className="create-gig-navbar-steps">
          {steps.map((step, index) => {
            let className = "create-gig-step";
            if (index < activeStep) className += " done";
            else if (index === activeStep) className += " active";

            return (
              <li
                key={index}
                className={className}
                onClick={() => setActiveStep(index)}
              >
                <span className="create-gig-step-number">{index + 1}</span>
                <span className="create-gig-step-name">{step}</span>
              </li>
            );
          })}
        </ul>
      </nav>

      <main className="create-gig-main-container">
        {stepComponents[activeStep]}
      </main>
    </div>
  );
};

export default Navbar;
