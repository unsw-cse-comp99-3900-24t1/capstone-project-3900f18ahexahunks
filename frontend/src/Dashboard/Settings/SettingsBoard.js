import React, { useState } from 'react';
import { styled, keyframes } from '@mui/system';
import Button from '@mui/material/Button';
import useUserStore from '../../zustand/useUserStore';
import { useNavigate } from 'react-router-dom';
import DeleteModal from './DeleteModal';
import { deleteUserAccount } from '../../services/api';
import { useAlert } from '../../components/AlertError';
import { googleLogout } from '@react-oauth/google';
import Cookies from 'js-cookie';
import useValidatorStore from '../../zustand/useValidatorStore';
import usePdfStore from '../../zustand/usePdfStore';

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const popIn = keyframes`
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const SettingsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '80vh',
  width: '50vw',
  padding: '20px',
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  borderRadius: '16px',
  margin: '0 auto',
  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
  animation: `${fadeIn} 0.5s ease-out`,
});

const ProfilePicture = styled('img')({
  width: '140px',
  height: '140px',
  borderRadius: '50%',
  marginBottom: '20px',
  border: '4px solid #651FFF',
  objectFit: 'cover',
  objectPosition: 'center',
  animation: `${popIn} 0.5s ease-out`,
});

const UserInfo = styled('div')({
  textAlign: 'center',
  marginBottom: '20px',
  color: '#fff',
});

const UserField = styled('div')({
  marginBottom: '12px',
  fontSize: '18px',
  background: '#651FFF',
  padding: '10px',
  borderRadius: '8px',
  animation: `${fadeIn} 0.5s ease-out`,
});

const ButtonContainer = styled('div')({
  display: 'flex',
  gap: '10px',
  marginTop: '20px',
});

const DeleteButton = styled(Button)({
  backgroundColor: '#e74c3c',
  color: '#fff',
  marginTop: '20px',
  width: '180px',
  '&:hover': {
    backgroundColor: '#c0392b',
  },
  animation: `${fadeIn} 0.5s ease-out`,
});

const EditButton = styled(Button)({
  backgroundColor: '#3498db',
  color: '#fff',
  marginTop: '20px',
  width: '180px',
  '&:hover': {
    backgroundColor: '#2980b9',
  },
  animation: `${fadeIn} 0.5s ease-out`,
});

const SettingsBoard = () => {
  const { getUser } = useUserStore();
  const user = getUser();
  const { showAlert } = useAlert();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleEditClick = () => {
    navigate(`/profile/${user._id}`);
  };
  //
  const handleClose = () => {
    setOpen(false);
  };

  const clearValidatorData = useValidatorStore(
    (state) => state.clearValidatorData
  );
  const clearPdfData = usePdfStore((state) => state.clearPdfData);
  const clearUser = useUserStore((state) => state.clearUser);

  const handleConfirmDelete = async () => {
    console.log('User deleted');
    setOpen(false);
    const res = await deleteUserAccount({
      password,
      googleId: user.googleId,
      username,
      userId: user._id,
    });

    if (res.error) {
      showAlert(res.data.error, 'tomato');
    } else {
      googleLogout();
      localStorage.clear();
      Cookies.remove('token', { path: '/' });
      localStorage.clear();
      clearValidatorData();
      clearPdfData();
      clearUser();
      navigate('/');
    }
    // Add the logic to delete the user here
  };

  return (
    <SettingsContainer>
      <ProfilePicture src={user.googlePicture} alt="Profile" />
      <UserInfo>
        <UserField>
          <strong>Username:</strong> {user.username}
        </UserField>
        <UserField>
          <strong>Email:</strong> {user.email}
        </UserField>
        <UserField>
          <strong>GLN:</strong> {user.gln ? user.gln : 'Not set'}
        </UserField>
      </UserInfo>
      <ButtonContainer>
        <EditButton variant="contained" onClick={handleEditClick}>
          Edit Profile
        </EditButton>
        <DeleteButton variant="contained" onClick={handleDeleteClick}>
          Delete Account
        </DeleteButton>
      </ButtonContainer>

      <DeleteModal
        open={open}
        handleClose={handleClose}
        setPassword={setPassword}
        password={password}
        handleConfirmDelete={handleConfirmDelete}
        username={username}
        setUsername={setUsername}
      />
    </SettingsContainer>
  );
};

export default SettingsBoard;
