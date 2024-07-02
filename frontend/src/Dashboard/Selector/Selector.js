import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SelectorLogo from './SelectorLogo';
import MainSelectors from './MainSelectors';
import useValidatorStore from '../../zustand/useValidatorStore';
import useUserStore from '../../zustand/useUserStore';

const Selector = () => {
  const navigate = useNavigate();
  const clearValidatorData = useValidatorStore(
    (state) => state.clearValidatorData
  );
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove('token', { path: '/' });
    localStorage.clear();
    clearValidatorData();
    clearUser();
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
