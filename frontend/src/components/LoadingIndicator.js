import React from 'react';
import './LoadingIndicator.css'; // This will contain the CSS for the spinner

const LoadingIndicator = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-ball"></div>
    </div>
  );
};

export default LoadingIndicator;
