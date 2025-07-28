'use client';
import { useEffect, useRef, useState } from 'react';
import { FaGlobe } from 'react-icons/fa';

const GTranslateWidget = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.__gtScriptInjected) return;
    window.__gtScriptInjected = true;

    const settingsScript = document.createElement('script');
    settingsScript.innerHTML = `
      window.gtranslateSettings = {
        default_language: "en",
        languages: ["en", "fr", "it", "es", "ja"],
        wrapper_selector: ".gtranslate_wrapper"
      };
    `;
    document.body.appendChild(settingsScript);

    const script = document.createElement('script');
    script.src = 'https://cdn.gtranslate.net/widgets/latest/dropdown.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(settingsScript);
    };
  }, []);

  // Hide dropdown on outside click or language change
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setDropdownVisible(false);
      }
    };

    const handleLanguageChange = (e) => {
      const target = e.target;
      if (target && target.classList.contains('gt_selector')) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('change', handleLanguageChange);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('change', handleLanguageChange);
    };
  }, []);

  // Toggle dropdown visibility and auto-open select
  const handleToggle = () => {
    const willBeVisible = !dropdownVisible;
    setDropdownVisible(willBeVisible);

    if (willBeVisible) {
      setTimeout(() => {
        const select = document.querySelector('.gt_selector');
        if (select) {
          select.focus();

          // Try to simulate dropdown open (may not work in all browsers)
          const event = new MouseEvent('mousedown', { bubbles: true });
          select.dispatchEvent(event);
        }
      }, 200);
    }
  };

  return (
    <div className="gtranslate-container" ref={containerRef}>
      <button className="globe-button" onClick={handleToggle}>
        <FaGlobe />
      </button>
      <div className={`gtranslate_wrapper ${dropdownVisible ? 'visible' : 'hidden'}`} />
    </div>
  );
};

export default GTranslateWidget;
