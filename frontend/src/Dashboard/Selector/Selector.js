import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SelectorLogo from './SelectorLogo';
import MainSelectors from './MainSelectors';

const Selector = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove('token', { path: '/' });
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ height: '80%' }}>
      <SelectorLogo />
      <MainSelectors handleLogout={handleLogout} />
    </div>
  );
};

export default Selector;
