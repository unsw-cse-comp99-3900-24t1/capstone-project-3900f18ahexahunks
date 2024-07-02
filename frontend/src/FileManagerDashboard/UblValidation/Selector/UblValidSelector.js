import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import useValidatorStore from '../../../zustand/useValidatorStore';
import useUserStore from '../../../zustand/useUserStore';
import SelectorLogo from '../../../components/SelectorLogo';

const UblValidSelector = ({ id }) => {
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
      <SelectorLogo link={`/handle-files/validation-reports/ubl/${id}`} />
      {/* <MainSelectors handleLogout={handleLogout} /> */}
    </div>
  );
};
export default UblValidSelector;
