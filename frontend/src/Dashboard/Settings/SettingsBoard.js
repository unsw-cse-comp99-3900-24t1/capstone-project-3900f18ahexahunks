import React, { useState } from 'react';
import { styled, keyframes } from '@mui/system';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useUserStore from '../../zustand/useUserStore';
import { useNavigate } from 'react-router-dom';

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
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleEditClick = () => {
    navigate(`/profile/${user._id}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log('User deleted');
    setOpen(false);
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
          <strong>GLN:</strong> {user.gln}
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </SettingsContainer>
  );
};

export default SettingsBoard;
