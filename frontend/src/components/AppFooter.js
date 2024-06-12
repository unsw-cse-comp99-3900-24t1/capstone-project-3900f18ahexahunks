import React from 'react';
import CustomPrimaryButton from './CustomePrimaryButton';
import useCurrentUserStore from '../zustandStore/useCurrentUserStore';
import usePresentationListStore from '../zustandStore/usePresentationListStore';
import { useNavigate } from 'react-router-dom';

// AppFooter component providing a responsive footer with dynamic text sizing based on window width.
const AppFooter = () => {
  const nav = useNavigate();
  const { clearCurrentUser } = useCurrentUserStore();
  const { clearPresentations } = usePresentationListStore();

  const LogoutUser = () => {
    localStorage.clear();
    clearCurrentUser();
    clearPresentations();
    nav('/login');
  };

  return (
    <CustomPrimaryButton
      label={'Logout'}
      additionalStyle={{ width: '170px', height: '30px' }}
      onClick={LogoutUser}
      dataTestid={'logout-btn'}
    />
  );
};

export default AppFooter;
