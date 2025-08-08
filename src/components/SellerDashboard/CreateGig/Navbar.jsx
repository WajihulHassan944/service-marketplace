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
import GigFaqs from "./Faqs/GigFaqs";

const steps = ["Overview", "Pricing", "Description","Faqs", "Gallery", "Publish"];

const Navbar = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [gigData, setGigData] = useState(null);
 
  const user = useSelector((state) => state.user);
  const searchParams = useSearchParams();
  const edit = searchParams.get("edit");
  const gigId = searchParams.get("gigId");
useEffect(() => {
  const initializeGigData = async () => {
    if (edit === "true" && gigId) {
      try {
        const res = await fetch(`${baseUrl}/gigs/getGigById/${gigId}`);
        const data = await res.json();

        if (data.success && data.gig) {
          const g = data.gig;

          // List of known fields we expect in each package
          const knownPackageFields = [
            "packageName",
            "description",
            "price",
            "deliveryTime",
            "revisions",
            "afterProjectSupport"
          ];

          // Convert each package object, separating known and unknown keys
          const transformPackage = (pkg) => {
            const transformed = {
              known: {},
              dynamic: {}
            };
            for (const key in pkg) {
              const value = pkg[key];
              if (knownPackageFields.includes(key)) {
                transformed.known[key] = value;
              } else {
                transformed.dynamic[key] = value?.toString() ?? "";
              }
            }
            return transformed;
          };

          setGigData({
            userId: g.userId,
            offerPackages: true,
            gigTitle: g.gigTitle,
            category: g.category,
            subcategory: g.subcategory,
            subcategorychild:g.subcategorychild,
            searchTag: g.searchTag,
            imagesToDelete: [],
            positiveKeywords: Array.isArray(g.positiveKeywords)
              ? g.positiveKeywords.join(", ")
              : g.positiveKeywords || "",
            packages: {
              basic: transformPackage(g.packages?.basic || {}),
              standard: transformPackage(g.packages?.standard || {}),
              premium: transformPackage(g.packages?.premium || {}),
            },
            gigDescription: g.gigDescription,
            hourlyRate: g.hourlyRate?.toString() || "",
            images: g.images || [],
            videoIframes: g.videoIframes || [],
             faqs: g.faqs || [],
           pdf: {
  url: g.pdf?.url || "",
  public_id: g.pdf?.public_id || "",
},
 removePdf: false,
            _id: g._id,
            status: g.status,
          });
        }
      } catch (err) {
        console.error("Failed to fetch gig data:", err);
      }
    } else if (user?._id) {
      // New gig
      setGigData({
        userId: user._id,
        offerPackages: true,
        gigTitle: "",
        category: "",
        subcategory: "",
        subcategorychild: "",
        searchTag: "",
        positiveKeywords: "",
        packages: {
          basic: { known: {}, dynamic: {} },
          standard: { known: {}, dynamic: {} },
          premium: { known: {}, dynamic: {} },
        },
        gigDescription: "",
        hourlyRate: "",
        images: [],
        videoIframes: [],
        faqs:[],
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
    <GigFaqs
    key="gigFaqs"
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
