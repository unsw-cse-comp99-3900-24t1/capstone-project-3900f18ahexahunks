import React from 'react';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: windowWidth <= 768 ? '10px 0' : '0px 0',
    textAlign: 'center',
    width: '100%',
    bottom: '0',
    fontSize: windowWidth <= 768 ? '14px' : '16px',
  };

  const footerContentStyle = {
    display: 'flex',
    flexDirection: windowWidth <= 768 ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  };

  const footerNavStyle = {
    display: 'flex',
    gap: '10px',
    flexDirection: windowWidth <= 768 ? 'column' : 'row',
  };

  const footerLinkStyle = {
    color: '#fff',
    textDecoration: 'none',
    margin: windowWidth <= 768 ? '5px 0' : '0',
  };

  return (
    <footer style={footerStyle}>
      <div style={footerContentStyle}>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
        <nav style={footerNavStyle}>
          <a href="/about" style={footerLinkStyle}>
            About
          </a>
          <a href="/contact" style={footerLinkStyle}>
            Contact
          </a>
          <a href="/privacy" style={footerLinkStyle}>
            Privacy Policy
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
