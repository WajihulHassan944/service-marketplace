'use client';
import { useEffect } from 'react';

const GTranslateWidget = () => {
  useEffect(() => {
    // Inject GTranslate settings
    window.gtranslateSettings = {
      default_language: 'en',
      languages: ['en', 'fr', 'it', 'es', 'ja'],
      wrapper_selector: '.gtranslate_wrapper',
      switcher_horizontal_position: 'right',
    };

    // Create and append the GTranslate script
    const script = document.createElement('script');
    script.src = 'https://cdn.gtranslate.net/widgets/latest/float.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Optional cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="gtranslate_wrapper"
      style={{
        position: 'fixed',
        bottom: 10,
        right: 10,
        zIndex: 999,
      }}
    />
  );
};

export default GTranslateWidget;
