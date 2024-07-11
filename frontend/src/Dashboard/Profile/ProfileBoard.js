import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Avatar,
  List,
  Paper,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import EmailHistoryItem from './EmailHistoryItem';
import { getHistoryEmail } from '../../services/api';
import { useAlert } from '../../components/AlertError';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';

const StyledContainer = styled(Container)({
  marginTop: '32px',
});

const ProfileCard = styled(Paper)({
  padding: '32px',
  textAlign: 'center',
});

const ProfileAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  margin: 'auto',
  marginBottom: '16px',
});

const HistoryCard = styled(Paper)({
  padding: '32px',
});

const StyledList = styled(List)({
  maxHeight: 400,
  overflowY: 'auto',
});

const LargeIconButton = styled(IconButton)({
  position: 'absolute',
  top: '50px',
  left: '80px',
  border: '1px solid #999',
  '@media (max-width: 640px)': {
    top: '30px',
    left: '30px',
  },
});

const ProfileBoard = () => {
  const [username, setUsername] = useState('John Doe');
  const [profilePic, setProfilePic] = useState(null);
  const [history, setHistory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await getHistoryEmail();
      if (!res.error) {
        setHistory(res); // Assuming res is the array of history email items
      } else {
        showAlert('Failed to fetch history email:', 'tomato');
      }
    }
    fetchData();
  }, []);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteHistory = (index) => {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);
  };

  const handleOpenReport = (e, item) => {
    e.stopPropagation();
    console.log(item);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = () => {
    setIsEditing(false);
    // Implement your update logic here
  };

  const handleClose = () => {
    navigate('/dashboard/main');
  };

  return (
    <StyledContainer maxWidth="md">
      <LargeIconButton onClick={handleClose}>
        <CloseIcon fontSize="large" />
      </LargeIconButton>
      <Typography
        variant="h4"
        gutterBottom
        style={{
          textAlign: 'center',
          marginTop: '50px',
          marginBottom: '30px',
        }}
      >
        User Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <ProfileCard elevation={4}>
            <Typography variant="h6" gutterBottom>
              Profile
            </Typography>
            <ProfileAvatar src={profilePic} alt="Profile Picture" />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="profile-pic-upload"
              type="file"
              onChange={handleProfilePicChange}
            />
            <label htmlFor="profile-pic-upload">
              <IconButton color="primary" component="span">
                <AddAPhotoIcon />
              </IconButton>
            </label>
            {isEditing ? (
              <TextField
                label="Username"
                value={username}
                onChange={handleUsernameChange}
                fullWidth
                margin="normal"
              />
            ) : (
              <Typography variant="body1" gutterBottom>
                {username}
              </Typography>
            )}
            <div>
              {isEditing ? (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<SaveIcon />}
                  onClick={handleUpdate}
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={toggleEditMode}
                >
                  Edit
                </Button>
              )}
            </div>
          </ProfileCard>
        </Grid>
        <Grid item xs={12} md={8}>
          <HistoryCard elevation={4}>
            <Typography variant="h6" gutterBottom>
              User History
            </Typography>
            <StyledList>
              {history.map((item, index) => (
                <div key={index}>
                  <EmailHistoryItem
                    handleOpenReport={handleOpenReport}
                    item={item}
                    handleDeleteHistory={handleDeleteHistory}
                    index={index}
                  />
                </div>
              ))}
            </StyledList>
          </HistoryCard>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default ProfileBoard;
