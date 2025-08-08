'use client';
import React from 'react';

const CapitalizeFirstWord = ({ children }) => {
  const capitalize = (text) => {
    if (!text || typeof text !== 'string') return '';
    const [firstWord, ...rest] = text.toLowerCase().split(' ');
    return [firstWord.charAt(0).toUpperCase() + firstWord.slice(1), ...rest].join(' ');
  };

  return <>{capitalize(children)}</>;
};

export default CapitalizeFirstWord;
