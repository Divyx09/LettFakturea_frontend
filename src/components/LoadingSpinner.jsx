import React from 'react';
import '../styles/components/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
