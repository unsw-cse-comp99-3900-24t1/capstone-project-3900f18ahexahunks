import React from 'react';
import parse from 'html-react-parser';

// This component is used for displaying HTML validation content
const HtmlValidationBoard = ({ htmlContent }) => {
  return (
    // Container div with a max height of 80vh
    <div style={{ maxHeight: '80vh' }}>
      {/* Conditionally render parsed HTML content or a loading message */}
      {htmlContent ? <div>{parse(htmlContent)}</div> : <p>Loading...</p>}
    </div>
  );
};

export default HtmlValidationBoard;
