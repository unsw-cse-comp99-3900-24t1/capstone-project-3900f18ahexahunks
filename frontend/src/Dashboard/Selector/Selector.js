import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SelectorLogo from '../../components/SelectorLogo';
import MainSelectors from './MainSelectors';
import useValidatorStore from '../../zustand/useValidatorStore';
import useUserStore from '../../zustand/useUserStore';
import { googleLogout } from '@react-oauth/google';
import usePdfStore from '../../zustand/usePdfStore';

// One component that can be called to set all the
// selector settings on the main dashboard
const Selector = () => {
  const navigate = useNavigate();
  const clearValidatorData = useValidatorStore(
    (state) => state.clearValidatorData
  );
  const clearUser = useUserStore((state) => state.clearUser);
  const clearPdfData = usePdfStore((state) => state.clearPdfData);

  // Additional logout handler for user on the main dashboard (CLEANS EVERYTHING!)
  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    Cookies.remove('token', { path: '/' });
    localStorage.clear();
    clearValidatorData();
    clearPdfData();
    clearUser();
    navigate('/');
  };

  return (
    <div style={{ height: '80%' }}>
      <SelectorLogo link={'/dashboard/main'} />
      <MainSelectors handleLogout={handleLogout} />
    </div>
  );
};

export default Selector;
