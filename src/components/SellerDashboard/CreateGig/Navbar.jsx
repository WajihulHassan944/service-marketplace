"use client";

import React, { useState, useEffect } from "react";
import "./navbar.css";
import { baseUrl } from "@/const";
import GigForm from "./GigForm/GigForm";
import ScopePricing from "./ScopePricing/ScopePricing";
import DescriptionEditor from "./DescriptionEditor/DescriptionEditor";
import GigGallery from "./GigGallery/GigGallery";
import PublishGig from "./PublishGig/PublishGig";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

const steps = ["Overview", "Pricing", "Description", "Gallery", "Publish"];

const Navbar = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [gigData, setGigData] = useState(null);
  const user = useSelector((state) => state.user);
  const searchParams = useSearchParams();
  const edit = searchParams.get("edit");
  const gigId = searchParams.get("gigId");

  useEffect(() => {
    const initializeGigData = async () => {
      // If editing an existing gig
      if (edit === "true" && gigId) {
        try {
          const res = await fetch(
            `${baseUrl}/gigs/getGigById/${gigId}`
          );
          const data = await res.json();
          if (data.success && data.gig) {
            const g = data.gig;
            setGigData({
              userId: g.userId,
              gigTitle: g.gigTitle,
              category: g.category,
              subcategory: g.subcategory,
              searchTag: g.searchTag,
          positiveKeywords: Array.isArray(g.positiveKeywords)
    ? g.positiveKeywords.join(", ")
    : g.positiveKeywords || "",
              packages: {
                basic: {
                  name: g.packages.basic.packageName,
                  description: g.packages.basic.description,
                  price: g.packages.basic.price,
                  deliveryTime: g.packages.basic.deliveryTime,
                  revisions: g.packages.basic.revisions,
                  pages: g.packages.basic.numberOfPages,
                  afterProjectSupport: g.packages.basic.afterProjectSupport,
                },
                standard: {
                  name: g.packages.standard.packageName,
                  description: g.packages.standard.description,
                  price: g.packages.standard.price,
                  deliveryTime: g.packages.standard.deliveryTime,
                  revisions: g.packages.standard.revisions,
                  pages: g.packages.standard.numberOfPages,
                  afterProjectSupport: g.packages.standard.afterProjectSupport,
                },
                premium: {
                  name: g.packages.premium.packageName,
                  description: g.packages.premium.description,
                  price: g.packages.premium.price,
                  deliveryTime: g.packages.premium.deliveryTime,
                  revisions: g.packages.premium.revisions,
                  pages: g.packages.premium.numberOfPages,
                  afterProjectSupport: g.packages.premium.afterProjectSupport,
                },
              },
              gigDescription: g.gigDescription,
              hourlyRate: g.hourlyRate,
              images: g.images || [],
              videoIframes: g.videoIframes || [],
              pdf: g.pdf || "",
              _id: g._id, // optional if needed later
              status: g.status,
            });
          }
        } catch (err) {
          console.error("Failed to fetch gig data:", err);
        }
      } else if (user?._id) {
        // New gig creation
        setGigData({
          userId: user._id,
          gigTitle: "",
          category: "",
          subcategory: "",
          searchTag: "",
          positiveKeywords: "",
          packages: {
            basic: {
              name: "",
              description: "",
              price: 0,
              deliveryTime: 0,
              revisions: 0,
              pages: 1,
              afterProjectSupport: false,
            },
            standard: {
              name: "",
              description: "",
              price: 0,
              deliveryTime: 0,
              revisions: 0,
              pages: 1,
              afterProjectSupport: false,
            },
            premium: {
              name: "",
              description: "",
              price: 0,
              deliveryTime: 0,
              revisions: 0,
              pages: 1,
              afterProjectSupport: false,
            },
          },
          gigDescription: "",
          hourlyRate: 0,
          images: [],
          videoIframes: [],
          pdf: "",
        });
      }
    };

    initializeGigData();
  }, [user, edit, gigId]);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => {
        const nextStep = prev + 1;
        window.scrollTo({ top: 0, behavior: "smooth" });
        return nextStep;
      });
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => {
        const previousStep = prev - 1;
        window.scrollTo({ top: 0, behavior: "smooth" });
        return previousStep;
      });
    }
  };

  if (!gigData) return <div>Loading gig data...</div>;

  const stepComponents = [
    <GigForm
      key="gigform"
      onNext={handleNext}
      gigData={gigData}
      setGigData={setGigData}
    />,
    <ScopePricing
      key="scopepricing"
      onNext={handleNext}
      onBack={handleBack}
      gigData={gigData}
      setGigData={setGigData}
    />,
    <DescriptionEditor
      key="descriptioneditor"
      onNext={handleNext}
      onBack={handleBack}
      gigData={gigData}
      setGigData={setGigData}
    />,
    <GigGallery
      key="giggallery"
      onNext={handleNext}
      onBack={handleBack}
      gigData={gigData}
      setGigData={setGigData}
    />,
    <PublishGig key="publishgig" onBack={handleBack} gigData={gigData} />,
  ];

  return (
    <div className="creation-gig-wrapper">
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
